<template>
  <div class="grid grid-cols-2 flex-grow gap-5">
    <div class="h-1/2">
      <img
        :src="`https://primefaces.org/cdn/primevue/images/product/${product?.data?.image}`"
        class="w-full" />
    </div>
    <div>
      <h1 class="font-bold text-3xl text-slate-700">
        {{ product?.data.name }}
      </h1>
      <span class="font-bold">
        {{ product ? formatCurrency(product.data!.price!) : '' }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({name: 'products-id', title: 'Detail produktu'})
  const {
    params: {id},
  } = useRoute()

  const {data: product} = useFetch(`/api/products/${id}`)
</script>
