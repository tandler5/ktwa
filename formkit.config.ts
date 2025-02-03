import {defineFormKitConfig, createInput} from '@formkit/vue'

import {
  FormkitTextInputOptions,
  FormkitPasswordInputOptions,
} from '@/utils/formkit/inputsConfigurations'

const FormkitTextInput = defineAsyncComponent(
  () => import('@/components/formkit/FormkitTextInput.vue')
)

const FormkitPasswordInput = defineAsyncComponent(
  () => import('@/components/formkit/FormkitPasswordInput.vue')
)

const FormkitSubmitButton = defineAsyncComponent(
  () => import('@/components/formkit/FormkitSubmitButton.vue')
)

export default defineFormKitConfig({
  inputs: {
    input: createInput(FormkitTextInput, FormkitTextInputOptions),
    password: createInput(FormkitPasswordInput, FormkitPasswordInputOptions),
    submit: createInput(FormkitSubmitButton),
  },
})
