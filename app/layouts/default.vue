<template>
  <div class="bg-white w-screen h-screen flex flex-col overflow-x-hidden">
    <Menubar
      :model="items"
      class="rounded-none">
      <template #start>
        <img
          src="https://www.upce.cz/sites/default/files/themes/upce/logo.svg"
          class="w-full h-10" />
      </template>
      <template #item="{item}">
        <NuxtLink
          :to="item.to"
          class="flex items-center">
          <span>{{ item.label }}</span>
        </NuxtLink>
      </template>
      <template #end>
        <div class="h-max overflow-visible relative">
          <ClientOnly>
            <Button
              severity="secondary"
              class="shadow-sm"
              data-test-id="topBar-profile-trigger"
              type="button"
              @click="menuOpened = !menuOpened">
              <Avatar
                :label="
                  user?.avatar
                    ? undefined
                    : `${user.firstName?.[0]}${user.firstName?.[1]}`.toUpperCase()
                "
                :image="user?.avatar"
                class="mr-2"
                shape="circle" />
              <span class="inline-flex flex-col items-start">
                <span class="font-bold text-slate-700"
                  >{{ user?.firstName }} {{ user?.lastName }}</span
                >
                <span class="text-sm text-slate-700">{{ user.role }}</span>
              </span>
              <i class="fas fa-chevron-down text-sm ml-2 text-slate-700"></i>
            </Button>
            <Transition>
              <ul
                v-if="menuOpened"
                class="list-none shadow p-3 m-0 z-50 border-round bg-white shadow-2 absolute surface-overlay origin-top w-full sm:w-14rem right-0 top-auto min-w-max">
                <li>
                  <NuxtLink
                    :to="{name: 'self'}"
                    class="p-ripple flex justify-between items-center cursor-pointer p-2">
                    Profil
                  </NuxtLink>
                </li>
                <li
                  class="p-ripple flex justify-between items-center cursor-pointer p-2"
                  @click="logout">
                  <span>Odhlásit se</span>
                  <i class="fa-solid fa-right-from-bracket"></i>
                </li>
              </ul>
            </Transition>
          </ClientOnly>
        </div>
      </template>
    </Menubar>
    <main class="flex-grow flex flex-col">
      <h1 class="text-2xl font-bold w-full border-b px-4 py-2 text-slate-700">
        {{ route.meta.title }}
      </h1>
      <div class="p-4 flex flex-col flex-grow overflow-y-auto overflow-x-hidden">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
  import {USER_DATA_KEY, USER_TOKEN_KEY} from '@/contants'
  import type {User} from '@/types/User'

  const user = useState<User>('user')
  const route = useRoute()
  const menuOpened = shallowRef(false)

  const items = ref([
    {
      label: 'Nástěna',
      to: {name: 'dashboard'},
    },
    {
      label: 'Objednávky',
      to: {name: 'orders'},
    },
    {
      label: 'Produkty',
      to: {name: 'products-list'},
    },
    ...(user.value?.role === 'administrator'
      ? [
          {
            label: 'Uživatelé',
            to: {name: 'users-list'},
          },
        ]
      : []),
  ])

  const logout = () => {
    navigateTo({name: 'login'})
    const authToken = useCookie(USER_TOKEN_KEY)
    const user = useState(USER_DATA_KEY)
    authToken.value = null
    user.value = undefined
    localStorage.removeItem(USER_DATA_KEY)
  }
</script>
<style>
  .router-link-active {
    @apply font-bold;
  }
</style>
