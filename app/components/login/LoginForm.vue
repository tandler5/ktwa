<template>
  <FormKit
    type="form"
    :actions="false"
    class="ma max-w-1/2"
    form-class="flex flex-col gap-4 w-full bg-white px-8 py-8 rounded-md shadow-md max-w-[60dvw]"
    @submit="onFormSubmit">
    <div class="flex flex-col gap-1">
      <h2 class="font-bold text-2xl text-slate-700 text-center mb-2">Přihlášení</h2>
      <FormKit
        name="email"
        type="input" />
      <FormKit
        name="password"
        type="password" />
      <FormKit
        type="submit"
        inner-class="*:w-full"
        >Přihlásit se</FormKit
      >
    </div>
  </FormKit>
</template>

<script setup lang="ts">
  import type {FormKitNode} from '@formkit/core'
  import {useApi} from '~/composables/api'
  import {USER_DATA_KEY} from '~/contants'
  import type {LoginData, LoginForm} from '~/types/forms/LoginForm'

  const {post} = useApi()
  const onFormSubmit = async (values: LoginForm, node: FormKitNode) => {
    const {email, password} = values
    try {
      const res = await post<LoginData>('/login', {
        email,
        password,
      })
      if (res.data.token) {
        const authToken = useCookie('auth-token')
        authToken.value = res.data.token
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.data.user))
        navigateTo({name: 'dashboard'})
      }
    } catch (e) {
      node.setErrors('Nesprávné přihlašovací údaje')
    }
  }
</script>
