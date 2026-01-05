export interface Bike {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: number;
  discountPercent?: number;
}
