<template>
  <div class="flex items-center gap-4 mb-4">
    <label
      :for="nameInput"
      class="font-semibold w-24">
      Název
    </label>
    <InputText
      :id="nameInput"
      v-model="product.name"
      class="flex-auto"
      autocomplete="off" />
  </div>
  <div class="flex items-center gap-4 mb-8">
    <label
      :for="priceInput"
      class="font-semibold w-24">
      Cena
    </label>
    <InputNumber
      :input-id="priceInput"
      v-model="product.price"
      class="flex-auto"
      autocomplete="off" />
  </div>
  <div class="flex items-center gap-4 mb-8">
    <label class="font-semibold w-24"> Kategorie </label>
    <Select
      v-model="product.category"
      :options="categories"
      placeholder="Vyberte kategorii"
      class="flex-grow" />
  </div>
  <div class="flex items-center gap-4 mb-8">
    <label class="font-semibold w-24"> Stav </label>
    <Select
      v-model="product.inventoryStatus"
      :options="statuses"
      placeholder="Stav"
      class="flex-grow" />
  </div>
  <div class="flex justify-end gap-2">
    <Button
      type="button"
      label="Zrušit"
      severity="secondary"
      @click="$emit('close')"></Button>
    <Button
      type="button"
      label="Přidat"
      :disabled="disabledAdd"
      @click="onAdd"></Button>
  </div>
</template>
<script setup lang="ts">
  import type {Product} from '@/types/Product'
  const product = ref<Product>({
    name: undefined,
    category: undefined,
    inventoryStatus: undefined,
    price: undefined,
  })
  const nameInput = useId()
  const priceInput = useId()

  const emit = defineEmits(['close', 'add'])
  const onAdd = () => {
    emit('add', product.value)
  }
  const disabledAdd = computed(
    () =>
      !product.value.name ||
      !product.value.price ||
      !product.value.category ||
      !product.value.inventoryStatus
  )

  const categories: Product['category'][] = ['Příslušenství', 'Fitness', 'Oblečení', 'Elektronika']
  const statuses: Product['inventoryStatus'][] = ['SKLADEM', 'MALÉ MNOŽSTVÍ', 'VYPRODÁNO']
</script>
