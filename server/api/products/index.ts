import products from '@@/server/data/products.json'
export default defineEventHandler(async () => {
  return {
    data: products,
  }
})
