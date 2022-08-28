import path from 'path'

const fileName = (path.resolve(__dirname + '../../../../../../data/products.json'))
const file = require(fileName) as { [k: string]: any }[]

export const getAll = async (): Promise<{ [k: string]: any }[]> => {
  return file
}

export const findBySku = async (sku: string): Promise<{ [k: string]: any }[]> => {
  return file.filter(d => d?.sku == sku)
}
