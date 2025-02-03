<template>
  <Password
    fluid
    :model-value="context.value"
    :feedback="false"
    toggle-mask
    @update:model-value="onUpdate" />
</template>
<script setup lang="ts">
  import type {FormKitFrameworkContext} from '@formkit/core'

  const props = defineProps<{context: FormKitFrameworkContext}>()

  const onUpdate = (value: string) => {
    props.context.node.input(value)
  }
</script>
