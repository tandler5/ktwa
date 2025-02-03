<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-700">
      {{ user?.data!.firstName }} {{ user?.data!.lastName }}
    </h1>
    <div class="grid grid-cols-2 gap-y-1 w-max mt-5">
      <span>Email:</span>
      <span>{{ user?.data!.email }}</span>
      <span>Telefon:</span>
      <span>{{ user?.data!.phone }}</span>
      <span>Adresa:</span>
      <span class="flex gap-2">
        <img
          alt="flag"
          :src="`https://flagpedia.net/data/flags/h48/${ user?.data!.country.code}.webp`"
          style="width: 24px" />
        {{ user?.data!.address }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({name: 'users-id', title: 'Detail uživatele'})
  const {
    params: {id},
  } = useRoute()

  const {data: user} = useFetch(`/api/users/${id}`)
</script>
