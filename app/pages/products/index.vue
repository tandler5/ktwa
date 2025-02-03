<template>
  <div class="card">
    <Dialog
      v-model:visible="visible"
      modal
      header="Přidat produkt"
      :style="{width: '25rem'}">
      <ProductsForm
        @close="visible = false"
        @add="addProduct" />
    </Dialog>
    <DataTable
      :value="products?.data"
      tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-end gap-2">
          <Button
            icon="pi pi- far fa-plus text-white"
            rounded
            raised
            @click="visible = true" />
        </div>
      </template>
      <Column class="w-24 !text-end">
        <template #body="{data}">
          <NuxtLink
            v-if="data.id"
            :to="{name: 'products-id', params: {id: data.id}}">
            <Button
              icon="fas fa-search"
              severity="secondary"
              rounded />
          </NuxtLink>
        </template>
      </Column>
      <Column header="Obrázek">
        <template #body="slotProps">
          <img
            v-if="slotProps.data.image"
            :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="w-24 rounded" />
          <div
            v-else
            class="h-[64px] bg-slate-300 w-24 rounded flex items-center text-white justify-center">
            <i class="fas fa-camera text-xl" />
          </div>
        </template>
      </Column>
      <Column
        field="price"
        header="Cena">
        <template #body="{data}">
          {{ formatCurrency(data.price) }}
        </template>
      </Column>
      <Column
        field="category"
        header="Kategorie"></Column>
      <Column
        field="rating"
        header="Hodnocení">
        <template #body="slotProps">
          <Rating
            :modelValue="slotProps.data.rating"
            readonly />
        </template>
      </Column>
      <Column header="Stav">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.inventoryStatus"
            :severity="getSeverity(slotProps.data)" />
        </template>
      </Column>
      <template #footer>
        Celkem nalezeno {{ products ? products.data.length : 0 }} produktů.
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
  import type {Product} from '@/types/Product'

  definePageMeta({name: 'products-list', title: 'Produkty'})

  const visible = shallowRef(false)

  const {data: products} = useFetch('/api/products')

  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case 'SKLADEM':
        return 'success'

      case 'MALÉ MNOŽSTVÍ':
        return 'warn'

      case 'VYPRODÁNO':
        return 'danger'

      default:
        return undefined
    }
  }
  const addProduct = (product: Product) => {
    products.value!.data = [product, ...products.value!.data]
    visible.value = false
  }
</script>
