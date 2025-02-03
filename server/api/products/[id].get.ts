import products from '@@/server/data/products.json'
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return {
    data: products.find((p) => p.id === id),
  }
})
