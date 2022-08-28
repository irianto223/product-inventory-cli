import Warehouse from "./query_model"
import { getAll, findByName } from './query'

export const getList = async (): Promise<Warehouse[]> => {

  const rawData: any[] = await getAll()

  return rawData.map(p => {
    return Warehouse.generate(p)
  })
}

export const getOneByName = async (warehouse_name: string): Promise<Warehouse> => {
  const rawData: any[] = await findByName(warehouse_name)
  if (rawData.length == 0) {
    throw new Error('Warehouse not found')
  }
  return Warehouse.generate(rawData[0])
}
