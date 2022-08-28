import joi from 'joi'

export const validateCreate = (payload: { [k: string]: any }) => {

  const validSchema = joi.object({
    name: joi.string().required(),
    sku: joi.string().required(),
  }).label('create product')

  return validSchema.validate(payload)
}
