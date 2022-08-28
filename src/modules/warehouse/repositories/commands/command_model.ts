import Product from "../../../product/repositories/commands/command_model";

class WarehouseCommandModel {

  private _name: string;
  private _stock_limit: number | null;
  private _stocks: StockCommandModel[];

  constructor(params: {
    name: string;
    stock_limit: number | null;
    stocks?: StockCommandModel[];
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

  get stocks(): StockCommandModel[] {
    return this._stocks
  }

  static generate(raw: { [k: string]: any }): WarehouseCommandModel {
    if (!raw.name) throw new Error('need warehouse name')
    return new WarehouseCommandModel({ name: raw.name, stock_limit: raw?.stock_limit ?? null, stocks: raw.stocks ?? [] })
  }
}

export class StockCommandModel {

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

  static generate(raw: { [k: string]: any }): StockCommandModel {
    if (!raw.qty) throw new Error('need qty @StockCommandModel=>generate')
    if (!raw.product) throw new Error('need product data @StockCommandModel=>generate')
    if (!raw?.product?.name) throw new Error('need product\'s name data @StockCommandModel=>generate')
    if (!raw?.product?.sku) throw new Error('need product\'s sku data @StockCommandModel=>generate')
    return new StockCommandModel({ product: new Product({ name: raw?.product?.name, sku: raw?.product?.sku }), qty: raw?.qty })
  }
}

export default WarehouseCommandModel
