import users from '@@/server/data/users.json'
import {sha1} from 'js-sha1'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = users.find((u) => u.email === body.email && u.password === body.password)
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  return {
    data: {
      user: {...user, password: undefined},
      token: `${user.id}|${sha1(user.password!)}`,
    },
  }
})
