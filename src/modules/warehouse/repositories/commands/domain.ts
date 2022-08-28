import Warehouse, { StockCommandModel } from "./command_model"
import { insert, insertNewStock, updateStock } from './command'
import { findByName } from '../queries/query'
import { findBySku as findProductBySku } from '../../../product/repositories/queries/query'
import WarehouseCommandModel from "./command_model"
import ProductCommandModel from "../../../product/repositories/commands/command_model"

export const add = async (params: {
  name: string,
  stock_limit?: number,
}): Promise<void> => {

  // find existing warehouse name
  const existing = await findByName(params.name)

  if (existing.length > 0) {
    console.log(`Warehouse with name "${params.name}" is exists`)
    return
  }

  return insert(Warehouse.generate({ name: params.name, stock_limit: params.stock_limit, stocks: [] }))
}

export const stock = async (params: {
  warehouse_name: string;
  sku: string;
  qty: number;
}) => {

  const findProduct = await findProductBySku(params.sku)
  if (findProduct.length == 0) {
    console.log(`Product with sku "${params.sku}" not found`)
    return
  }

  const findWarehouse = await findByName(params.warehouse_name)
  if (findWarehouse.length == 0) {
    console.log(`Warehouse with name "${params.warehouse_name}" not found`)
    return
  }

  const selectedStock = findWarehouse?.[0]?.stocks?.find((s: { [k: string]: any }) => s?.product?.sku == params.sku)
  const totalCurrentStock: number = findWarehouse?.[0]?.stocks?.map?.((d: { [k: string]: any }) => d.qty)?.reduce?.((a: number, b: number) => a + b, 0)

  if (!selectedStock) {
    return insertNewStock(WarehouseCommandModel.generate(findWarehouse?.[0]), new StockCommandModel({ product: ProductCommandModel.generate(findProduct[0]), qty: params.qty }))
  }

  if (totalCurrentStock >= findWarehouse?.[0]?.stock_limit && findWarehouse?.[0]?.stock_limit != null) {
    console.log('Warehouse stock limit is fulfilled')
    return
  }

  let qtyToAdd
  if (totalCurrentStock + params.qty >= findWarehouse?.[0]?.stock_limit && findWarehouse?.[0]?.stock_limit != null) {
    qtyToAdd = findWarehouse?.[0]?.stock_limit - totalCurrentStock
  }
  else {
    qtyToAdd = params.qty
  }

  return updateStock({ warehouse_name: params.warehouse_name, sku: params.sku, qty: selectedStock?.qty + qtyToAdd })
}

export const unstock = async (params: {
  warehouse_name: string;
  sku: string;
  qty: number;
}) => {

  const findProduct = await findProductBySku(params.sku)
  if (findProduct.length == 0) {
    console.log(`Product with sku "${params.sku}" not found`)
    return
  }

  const findWarehouse = await findByName(params.warehouse_name)
  if (findWarehouse.length == 0) {
    console.log(`Warehouse with name "${params.warehouse_name}" not found`)
    return
  }

  const selectedStock = findWarehouse?.[0]?.stocks?.find((s: { [k: string]: any }) => s?.product?.sku == params.sku)
  const totalCurrentStock: number = findWarehouse?.[0]?.stocks?.map?.((d: { [k: string]: any }) => d.qty)?.reduce?.((a: number, b: number) => a + b, 0)

  if (!selectedStock) {
    console.log('SKU not available on this Warehouse')
    return
  }

  if (selectedStock.qty <= 0) {
    console.log('Stock is empty')
    return
  }

  if (totalCurrentStock <= 0) {
    console.log('Warehouse stock is empty')
    return
  }

  let qtyToSubtract
  if (selectedStock?.qty - params.qty <= 0) {
    qtyToSubtract = selectedStock?.qty
  }
  else {
    qtyToSubtract = params.qty
  }

  return updateStock({ warehouse_name: params.warehouse_name, sku: params.sku, qty: selectedStock?.qty - qtyToSubtract })
}
