<template>
  <div class="card">
    <DataTable
      :value="users?.data"
      paginator
      :rows="10"
      v-model:filters="filters"
      dataKey="id"
      filterDisplay="row"
      :globalFilterFields="['country.name', 'firstName', 'lastName']">
      <template #empty>Nebyl nalezen žádný uživatel.</template>
      <Column class="w-12">
        <template #body="{data}">
          <div class="flex gap-2">
            <NuxtLink :to="{name: 'users-id', params: {id: data.id}}">
              <Button
                icon="fas fa-search"
                severity="secondary"
                rounded />
            </NuxtLink>
            <Button
              v-if="user?.role === 'administrator'"
              v-tooltip.bottom="`Přihlásit se za uživatele`"
              icon="fas fa-right-to-bracket"
              severity="secondary"
              rounded
              @click="loginAs(data.id)" />
          </div>
        </template>
      </Column>
      <Column
        field="avatar"
        header="Avatar">
        <template #body="{data}">
          <Avatar
            :label="
              data?.avatar ? undefined : `${data.firstName[0]}${data.firstName[1]}`.toUpperCase()
            "
            :image="data?.avatar"
            class="mr-2"
            shape="circle" />
        </template>
      </Column>
      <Column
        field="role"
        header="Role" />
      <Column
        field="firstName"
        header="Jméno"
        style="min-width: 12rem">
        <template #body="{data}">
          {{ data.firstName }}
        </template>
        <template #filter="{filterModel, filterCallback}">
          <InputText
            class="w-full"
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Vyhledat podle jména" />
        </template>
      </Column>
      <Column
        field="lastName"
        header="Příjmení"
        style="min-width: 12rem">
        <template #body="{data}">
          {{ data.lastName }}
        </template>
        <template #filter="{filterModel, filterCallback}">
          <InputText
            class="w-full"
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Vyhledat podle příjmení" />
        </template>
      </Column>
      <Column
        header="Země"
        filterField="country.name"
        style="min-width: 12rem">
        <template #body="{data}">
          <div class="flex items-center gap-2">
            <img
              alt="flag"
              :src="`https://flagpedia.net/data/flags/h48/${data.country.code}.webp`"
              style="width: 24px" />
            <span>{{ data.country.name }}</span>
          </div>
        </template>
        <template #filter="{filterModel, filterCallback}">
          <InputText
            class="w-full"
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Vyhledat podle země" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
  import {FilterMatchMode} from '@primevue/core/api'
  import {USER_DATA_KEY, USER_TOKEN_KEY} from '~/contants'
  import type {LoginData} from '~/types/forms/LoginForm'
  import type {User} from '~/types/User'

  definePageMeta({
    name: 'users-list',
    title: 'Uživatelé',
  })

  const {data: users} = useFetch('/api/users')
  const authToken = useCookie(USER_TOKEN_KEY)
  const user = useState<User>(USER_DATA_KEY)

  const loginAs = async (userId: number) => {
    const res = await $fetch<{data: LoginData}>('/api/loginAs', {
      method: 'POST',
      headers: {
        authorization: authToken.value!,
      },
      body: {
        userId,
      },
    })
    if (res.data.token) {
      const authToken = useCookie('auth-token')
      authToken.value = res.data.token
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.data.user))
      navigateTo({name: 'dashboard'})
    }
  }

  const filters = ref({
    firstName: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    lastName: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    'country.name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
  })
</script>
