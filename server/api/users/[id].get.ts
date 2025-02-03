import users from '@@/server/data/orders.json'
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return {
    data: users.find((u) => u.id === Number(id)),
  }
})
