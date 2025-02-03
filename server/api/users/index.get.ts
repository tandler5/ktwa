import users from '@@/server/data/users.json'
import {User} from '~/types/User'
export default defineEventHandler(async (event) => {
  return {
    data: (users as User[]).map((u) => {
      const user = {...u}
      const authorization = event.headers.get('authorization')
      if (!authorization) {
        delete user.password
      }
      return user
    }),
  }
})
