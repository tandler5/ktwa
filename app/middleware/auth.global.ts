import {USER_DATA_KEY, USER_TOKEN_KEY} from '@/contants'
export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.path.includes('/api')) {
    const authToken = useCookie(USER_TOKEN_KEY)
    const user = useState(USER_DATA_KEY)
    if (!authToken.value && !to.meta.public) {
      return navigateTo({name: 'login'})
    } else if (authToken.value && to.name === 'login') {
      return navigateTo({name: 'dashboard'})
    }
    if (import.meta.client) {
      const userData = localStorage.getItem(USER_DATA_KEY)
      user.value = JSON.parse(userData)
    }
  }
})
