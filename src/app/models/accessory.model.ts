export interface Accessory {
  id: number;
  name: string;
  description: string;
  price: number;
  type: 'accessory';
  inStock?: number;
}
