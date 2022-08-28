import Product from "./command_model"
import { insert } from './command'
import { findBySku } from '../queries/query'

export const add = async (params: {
  name: string,
  sku: string,
}): Promise<void> => {

  // find existing sku
  const existing = await findBySku(params.sku)
  
  if (existing.length > 0) {
    console.log(`Product with sku "${params.sku}" is exists`)
    return
  }

  return insert(Product.generate({ name: params.name, sku: params.sku }))
}
