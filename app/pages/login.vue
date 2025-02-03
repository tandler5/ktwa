<template>
  <div class="flex justify-center items-center h-full">
    <LoginForm class="max-w-1/2" />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({name: 'login', layout: 'login', public: true})
</script>
