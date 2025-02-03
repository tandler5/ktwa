<template>
  <div class="card">
    <DataTable
      :value="orders?.data"
      tableStyle="min-width: 50rem">
      <Column
        field="id"
        header="ID" />
      <Column
        field="date"
        header="Datum">
        <template #body="{data}"> {{ data.date ? toNaturalDateTime(data.date) : '' }} </template>
      </Column>
      <Column
        field="items"
        header="Položky">
        <template #body="{data}">
          <div class="flex flex-col gap-1">
            <span
              v-for="(item, index) in data.items"
              :key="index">
              <span class="font-bold">{{ item.count }}x </span>{{ item.name }}
            </span>
          </div>
        </template>
      </Column>
      <Column
        field="customer.phone"
        header="Telefon zákazníka" />
      <Column
        field="customer.email"
        header="Email zákazníka" />
      <Column header="Stav">
        <template #body="{data}">
          <Tag
            :pt="{label: {class: 'first-letter:uppercase'}}"
            :value="data.status"
            :severity="getSeverity(data)" />
        </template>
      </Column>
      <template #footer> Celkem nalezeno {{ orders ? orders.length : 0 }} objednávek. </template>
    </DataTable>
  </div>
</template>

<script setup>
  definePageMeta({name: 'orders', title: 'Objednávky'})

  const {data: orders} = useFetch('/api/orders')

  const getSeverity = (order) => {
    switch (order.status) {
      case 'dokončeno':
        return 'success'

      case 'odesláno':
        return 'info'

      case 'čeká na platbu':
        return 'warn'

      default:
        return null
    }
  }
</script>
