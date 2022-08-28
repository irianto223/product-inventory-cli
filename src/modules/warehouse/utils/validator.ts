import joi from 'joi'

export const validateCreate = (payload: { [k: string]: any }) => {

  const validSchema = joi.object({
    name: joi.string().required(),
    stock_limit: joi.number().optional(),
  }).label('create warehouse')

  return validSchema.validate(payload)
}

export const validateStock = (payload: { [k: string]: any }) => {

  const validSchema = joi.object({
    warehouse_name: joi.string().required(),
    sku: joi.string().required(),
    qty: joi.number().required(),
  }).label('stock')

  return validSchema.validate(payload)
}
