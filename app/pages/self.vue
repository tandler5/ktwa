<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-700">
      {{ user?.data?.firstName }} {{ user?.data?.lastName }}
    </h1>
    <div class="grid grid-cols-2 gap-y-1 w-max mt-5">
      <span>Email:</span>
      <span>{{ user?.data?.email }}</span>
      <span>Role:</span>
      <span>{{ user?.data?.phone }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {USER_TOKEN_KEY} from '@/contants'
  definePageMeta({title: 'Můj profil', name: 'self'})

  const authToken = useCookie(USER_TOKEN_KEY)

  const {data: user} = useFetch('/api/self', {
    headers: {
      authorization: authToken.value!,
    },
  })
</script>
