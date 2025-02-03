<template>
  <div class="flex flex-column h-full w-full gap-1">
    <div
      class="w-full h-full"
      :class="{
        'p-input-icon-left': context.icon,
        'p-input-icon-right': [context?.help || context.rightButton],
      }"
      :style="
        context?.help || context.rightButton ? 'position: relative;display:inline-block' : ''
      ">
      <i
        v-if="context.icon"
        :class="['fal', context.icon, 'z-2']" />

      <InputGroup>
        <InputGroupAddon v-if="context.leftAddon"> {{ context.leftAddon }} </InputGroupAddon>
        <InputText
          :id="context?.id"
          ref="textInput"
          class="w-full"
          v-bind="context.attrs"
          :data-test-id="context.attrs['data-test-id']"
          :class="[
            {'p-invalid': context?.state.dirty && !context?.state.valid},
            context?.attrs?.class,
          ]"
          :autofocus="context?.autoFocus"
          :type="context?.inputType"
          :disabled="context?.disabled"
          :placeholder="context.placeholder"
          :model-value="context?.value"
          @update:model-value="update"
          @blur="props.context.handlers.blur" />

        <InputGroupAddon v-if="context.rightAddon">
          {{ context.rightAddon }}
        </InputGroupAddon>
      </InputGroup>

      <span
        v-if="context.rightButton"
        class="h-full flex py-1 pr-1 absolute top-0 right-0 z-5">
        <Button
          :label="context.rightButton"
          :disabled="context.disabledRightButton"
          class="py-0 h-full"
          @click="context.node.emit('buttonClick', $event)" />
      </span>
      <span
        v-if="context.rightIcon"
        class="h-full flex py-1 pr-1 absolute top-0 right-0 z-5">
        <i
          class="far"
          :class="context.rightIcon"
          v-bind="context.rightIconParams"></i>
      </span>
    </div>
    <div v-if="context.node.store.checkDuplicate">
      <template
        v-if="context.duplicateLink || context.node.store.checkDuplicate.meta.customMessage">
        <span
          class="font-bold"
          :class="[context.node.store.checkDuplicate.blocking ? 'text-danger' : 'text-warning']"
          v-bind="context.node.store.checkDuplicate.meta.attrs"
          >{{
            context.node.store.checkDuplicate.meta.customMessage ?? 'Byly nalezeny možné shody'
          }}</span
        >
        <ul class="flex flex-column gap-1 mb-0 mt-1">
          <li
            v-for="{id: companyId, name} in context.node.store.checkDuplicate.meta.data"
            :key="companyId">
            <NuxtLink
              class="text-primary hover:underline"
              :to="{
                name: context.duplicateLink,
                params: {id: companyId},
              }"
              target="_blank">
              {{ name }}
            </NuxtLink>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import type {FormKitInputs} from '@formkit/inputs'
  type FormKitInputTextProps = {
    rightButton?: string
    rightIcon?: string
    rightAddon?: string
    leftAddon?: string
    disabledRightButton?: boolean
    disabledRightIcon?: boolean
    disabled?: boolean
    icon?: string
    inputType?: string
    placeholder?: string
    rightIconParams?: object
    autoFocus?: boolean
    duplicateLink?: string
  }

  declare module '@formkit/inputs' {
    interface FormKitInputProps<Props extends FormKitInputs<Props>> {
      input: {
        type: 'input'
        value?: string
      } & FormKitInputTextProps
    }
  }
</script>

<script setup lang="ts">
  import type {FormKitFrameworkContext} from '@formkit/core'

  const props = defineProps<{
    context: FormKitFrameworkContext<string> & FormKitInputTextProps
  }>()

  const textInput = ref()

  onMounted(() => {
    if (props.context?.autoFocus) {
      textInput.value?.$el?.focus()
    }
  })

  const update = async (value?: string) => {
    await props.context.node.input(value)
    props.context.node.emit('updateValue', value)
  }
</script>
