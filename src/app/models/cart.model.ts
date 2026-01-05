import { Product, ProductType } from './product.model';

export interface CartLine {
  product: Product;
  qty: number;
}

export interface CartUpdateKey {
  id: number;
  type: ProductType;
}
