import { add, stock as addStock, unstock as subtractStock } from '../repositories/commands/domain'
import { getList, getOneByName } from '../repositories/queries/domain'
import { validateCreate, validateDetail, validateStock } from '../utils/validator'

export const getListWarehouses = () => {
  getList().then(list => {
    list.forEach(w => {
      console.log(w.name)
    })
  })
}

export const addWarehouse = (name: string, stock_limit?: number) => {

  // input validation
  const validationResult = validateCreate({ name, stock_limit })
  if (validationResult.error) {
    console.log(validationResult.error.message)
    return
  }

  add({ name, stock_limit }).catch(err => {
    console.error(err)
  })
}

export const stock = (sku: string, warehouse_name: string, qty: number) => {

  // input validation
  const validationResult = validateStock({ sku, warehouse_name, qty })
  if (validationResult.error) {
    console.log(validationResult.error.message)
    return
  }

  addStock({ sku, warehouse_name, qty }).catch(err => {
    console.error(err)
  })
}

export const unstock = (sku: string, warehouse_name: string, qty: number) => {

  // input validation
  const validationResult = validateStock({ sku, warehouse_name, qty })
  if (validationResult.error) {
    console.log(validationResult.error.message)
    return
  }

  subtractStock({ sku, warehouse_name, qty }).catch(err => {
    console.error(err)
  })
}

export const getDetailWarehouse = (warehouse_name: string) => {

  // input validation
  const validationResult = validateDetail({ warehouse_name })
  if (validationResult.error) {
    console.log(validationResult.error.message)
    return
  }

  getOneByName(warehouse_name).then(warehouse => {
    console.table(warehouse.stocks.map(w => ({
      'ITEM NAME': w.product.name,
      'ITEM SKU': w.product.sku,
      'QTY': w.qty,
    })))
  }).catch(err => {
    console.log(err?.toString())
  })
}
