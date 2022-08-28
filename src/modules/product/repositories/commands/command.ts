import fs from 'fs'
import path from 'path'
import ProductCommandModel from "./command_model"

const fileName = (path.resolve(__dirname + '../../../../../../data/products.json'))
const file = require(fileName) as { [k: string]: any }[]

export const insert = async (model: ProductCommandModel): Promise<void> => {

  file.push({
    name: model.name,
    sku: model.sku,
  })

  fs.writeFileSync(fileName, JSON.stringify(file, null, 2))
}
