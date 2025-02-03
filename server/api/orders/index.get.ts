import orders from '@@/server/data/orders.json'
export default defineEventHandler(async () => {
  return {
    data: orders,
  }
})
