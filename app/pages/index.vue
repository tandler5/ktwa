<template>
  <div class="flex flex-wrap gap-8 max-h-full h-0 flex-grow">
    <Card
      v-for="(panel, index) in pannels"
      :key="index"
      class="h-max w-full md:w-max">
      <template #title>
        <NuxtLink :to="panel.to">{{ panel.label }}</NuxtLink>
      </template>
      <template #content>
        <Chart
          :type="panel.type"
          :data="panel.data"
          :height="300"
          :options="chartOptions"
          class="w-full h-max" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import {USER_DATA_KEY} from '~/contants'
  import type {User} from '~/types/User'

  definePageMeta({name: 'dashboard', title: 'Nástěnka'})

  const user = useState<User>(USER_DATA_KEY)

  const chartOptions = shallowRef({
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: '#334155',
        },
      },
    },
  })

  const {data: orders} = useFetch('/api/orders')

  const productsData = shallowRef({
    labels: ['Skladem', 'Malé množství', 'Vyprodáno'],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: ['#dcfce7', '#ffedd5', '#fee2e2'],
        hoverBackgroundColor: ['#15803d', '#c2410c', '#b91c1c'],
      },
    ],
  })

  const months = computed(() => {
    const formatter = new Intl.DateTimeFormat('cs-CZ', {month: 'long'})
    const monthNames = []
    for (let i = 0; i < 12; i++) {
      const datum = new Date(2023, i, 1) // Vytvoříme datum pro každý měsíc
      const name = formatter.format(datum)
      monthNames.push({name: `${name[0]?.toUpperCase()}${name.slice(1, name.length)}`, number: i}) // Přidáme formátovaný měsíc do pole
    }
    return monthNames
  })

  const ordersData = computed(() => ({
    labels: months.value.map((m) => m.name),
    datasets: [
      {
        label: 'Počet objednávek',
        data: months.value.map((m) => {
          return orders.value?.data?.filter((order) => {
            const orderDate = new Date(order.date)
            return m.number === orderDate.getMonth()
          }, 0)?.length
        }),
        backgroundColor: ['#db1d0b'],
      },
    ],
  }))

  const pannels = computed(() => [
    {
      label: 'Produkty',
      type: 'pie',
      to: {name: 'products-list'},
      data: productsData.value,
    },
    ...(['administrator', 'supervisor'].includes(user.value?.role)
      ? [
          {
            type: 'bar',
            label: 'Objednávky',
            to: {name: 'orders'},
            data: ordersData.value,
          },
        ]
      : []),
  ])
</script>
