#!/usr/bin/env node

import repl from 'repl'
import { Context } from 'vm'
import { getListProducts, addProduct } from './modules/product/handlers/cli_handler'
import { addWarehouse, getListWarehouses, stock as addStock, unstock, getDetailWarehouse } from './modules/warehouse/handlers/cli_handler'

const inputHandler = (input: string, context: Context, file: string, cb: (err: Error | null, result: any) => void) => {
  
  const params = (input?.match?.(/(?:[^\s"]+|"[^"]*")+/g) as any[])?.map?.(d => d.replace?.(/["]+/g, ''))

  if (params?.[0] + ' ' + params?.[1] === 'ADD PRODUCT') {
    cb(null, addProduct(params?.[2], params?.[3]))
  }
  else if (params?.[0] + ' ' + params?.[1] === 'LIST PRODUCTS') {
    cb(null, getListProducts())
  }
  else if (params?.[0] + ' ' + params?.[1] === 'LIST WAREHOUSES') {
    cb(null, getListWarehouses())
  }
  else if (params?.[0] + ' ' + params?.[1] === 'LIST WAREHOUSE') {
    cb(null, getDetailWarehouse(params?.[2]))
  }
  else if (params?.[0] + ' ' + params?.[1] === 'ADD WAREHOUSE') {
    cb(null, addWarehouse(params?.[2], params?.[3] ? Number(params?.[3]) : undefined))
  }
  else if (params?.[0] === 'STOCK') {
    cb(null, addStock(params?.[1], params?.[2], Number(params?.[3])))
  }
  else if (params?.[0] === 'UNSTOCK') {
    cb(null, unstock(params?.[1], params?.[2], Number(params?.[3])))
  }
  else {
    cb(null, undefined)
  }
}

const replServer = repl.start({ prompt: '> ', eval: inputHandler })
// const replServer = repl.start({ prompt: '> ' })

// ADD PRODUCT "masdknasd aslkjnfas" 1234134
