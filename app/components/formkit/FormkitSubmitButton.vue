<template>
  <Button type="submit">
    <component :is="context.slots.default" />
  </Button>
</template>
<script setup lang="ts">
  import type {FormKitFrameworkContext} from '@formkit/core'

  defineProps<{context: FormKitFrameworkContext}>()
</script>
