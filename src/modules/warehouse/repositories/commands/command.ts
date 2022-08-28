import fs from 'fs'
import path from 'path'
import Warehouse, { StockCommandModel } from "./command_model"

const fileName = (path.resolve(__dirname + '../../../../../../data/warehouses.json'))
const file = require(fileName) as { [k: string]: any }[]

export const insert = async (model: Warehouse): Promise<void> => {

  file.push({
    name: model.name,
    stock_limit: model.stock_limit,
    stocks: model.stocks ?? [],
  })

  fs.writeFileSync(fileName, JSON.stringify(file, null, 2))
}

export const updateStock = async (params: { warehouse_name: string, sku: string, qty: number }): Promise<void> => {

  // console.log('params --->', params)

  file.forEach(d => {
    if (d.name == params.warehouse_name) {
      d.stocks.map((stock: { [k: string]: any }) => {
        if (stock.product.sku == params.sku) {
          stock.qty = params.qty
        }
      })
    }
  })

  fs.writeFileSync(fileName, JSON.stringify(file, null, 2))
}

export const insertNewStock = async (warehouse: Warehouse, stock: StockCommandModel): Promise<void> => {

  file.forEach(d => {
    if (d.name == warehouse.name) {
      (d.stocks as any[]).push({
        product: {
          sku: stock.product.sku,
          name: stock.product.name,
        },
        qty: stock.qty,
      })
    }
  })

  fs.writeFileSync(fileName, JSON.stringify(file, null, 2))
}
