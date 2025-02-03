import users from '@@/server/data/users.json'
import {sha1} from 'js-sha1'

export default defineEventHandler(async (event) => {
  const authToken = event.headers.get('authorization')
  if (!authToken) {
    createError({statusCode: 401})
  }
  const [id, token] = authToken!.split('|')
  if (!id || !token) {
    createError({statusCode: 422})
  }

  const user = users.find((u) => u.id === Number(id) && sha1(u.password!) === token)

  if (!user) {
    createError({statusCode: 404})
  }

  return {
    data: user,
  }
})
