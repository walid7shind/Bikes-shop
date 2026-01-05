import { Accessory } from './accessory.model';
import { Bike } from './bike.model';

export type Product = Bike | Accessory;

export type ProductType = Product['type'];
