import users from '@@/server/data/users.json'
import {sha1} from 'js-sha1'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const authToken = event.headers.get('authorization')

  const [id, token] = authToken!.split('|')
  if (!id || !token) {
    createError({statusCode: 422})
  }

  const user = users.find(
    (u) => u.id === Number(id) && sha1(u.password!) === token && u.role === 'administrator'
  )

  if (!user) {
    createError({statusCode: 403})
  }
  const newUser = users.find((u) => u.id === body.userId)!
  return {
    data: {
      user: {...newUser, password: undefined},
      token: `${newUser.id}|${sha1(newUser.password!)}`,
    },
  }
})
