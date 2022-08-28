class ProductCommandModel {

  private _name: string;
  private _sku: string;

  constructor(params: {
    name: string;
    sku: string;
  }) {
    this._name = params.name
    this._sku = params.sku
  }

  get name() {
    return this._name
  }

  get sku() {
    return this._sku
  }

  static generate(raw: { [k: string]: any }): ProductCommandModel {
    if (!raw.name) throw new Error('need product name')
    if (!raw.sku) throw new Error('need product sku')
    return new ProductCommandModel({ name: raw.name, sku: raw.sku })
  }
}

export default ProductCommandModel
