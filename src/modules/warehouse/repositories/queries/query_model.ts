import Product from "../../../product/repositories/queries/query_model";

class WarehouseQueryModel {

  private _name: string;
  private _stock_limit: number | null;
  private _stocks: StockQueryModel[];

  constructor(params: {
    name: string;
    stock_limit: number | null;
    stocks?: StockQueryModel[];
  }) {
    this._name = params.name
    this._stock_limit = params.stock_limit
    this._stocks = params.stocks ?? []
  }

  get name(): string {
    return this._name
  }

  get stock_limit(): number | null {
    return this._stock_limit
  }

  get stocks(): StockQueryModel[] {
    return this._stocks
  }

  static generate(raw: { [k: string]: any }): WarehouseQueryModel {
    if (!raw.name) throw new Error('need warehouse name')
    return new WarehouseQueryModel({ name: raw.name, stock_limit: raw?.stock_limit ?? null, stocks: raw.stocks ?? [] })
  }
}

class StockQueryModel {

  private _product: Product;
  private _qty: number;

  constructor(params: {
    product: Product;
    qty: number;
  }) {
    this._product = params.product
    this._qty = params.qty
  }

  get product(): Product {
    return this._product
  }

  get qty(): number {
    return this._qty
  }

  static generate(raw: { [k: string]: any }): StockQueryModel {
    if (!raw.qty) throw new Error('need qty @StockQueryModel=>generate')
    if (!raw.product) throw new Error('need product data @StockQueryModel=>generate')
    if (!raw?.product?.name) throw new Error('need product\'s name data @StockQueryModel=>generate')
    if (!raw?.product?.sku) throw new Error('need product\'s sku data @StockQueryModel=>generate')
    return new StockQueryModel({ product: new Product({ name: raw?.product?.name, sku: raw?.product?.sku }), qty: raw?.qty })
  }
}

export default WarehouseQueryModel
