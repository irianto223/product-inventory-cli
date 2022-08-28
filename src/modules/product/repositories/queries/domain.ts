import Product from "./query_model"
import { getAll } from './query'

export const getList = async (): Promise<Product[]> => {

  const allProducts: any[] = await getAll()

  return allProducts.map(p => {
    return Product.generate(p)
  })
}
