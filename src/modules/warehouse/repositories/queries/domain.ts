import Warehouse from "./query_model"
import { getAll } from './query'

export const getList = async (): Promise<Warehouse[]> => {

  const rawData: any[] = await getAll()

  return rawData.map(p => {
    return Warehouse.generate(p)
  })
}
