import { add } from '../repositories/commands/domain'
import { getList } from '../repositories/queries/domain'
import { validateCreate } from '../utils/validator'

export const getListProducts = () => {
  getList().then(list => {
    list.forEach(p => {
      console.log(p.name + ' ' + p.sku)
    })
  })
}

export const addProduct = (name: string, sku: string) => {

  // input validation
  const validationResult = validateCreate({ name, sku })
  if (validationResult.error) {
    console.log(validationResult.error.message)
    return
  }

  add({ name, sku }).catch(err => {
    console.error(err)
  })
}
