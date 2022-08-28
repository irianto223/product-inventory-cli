import path from 'path'

const pathWarehouse = (path.resolve(__dirname + '../../../../../../data/warehouses.json'))
const fileWarehouse = require(pathWarehouse) as { [k: string]: any }[]

export const getAll = async (): Promise<{ [k: string]: any }[]> => {
  return fileWarehouse
}

export const findByName = async (name: string): Promise<{ [k: string]: any }[]> => {
  return fileWarehouse.filter(d => d?.name == name)
}
