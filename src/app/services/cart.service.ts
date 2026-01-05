import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartLine, CartUpdateKey } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartSubject = new BehaviorSubject<CartLine[]>([]);
  cart$: Observable<CartLine[]> = this.cartSubject.asObservable();

  add(product: Product, qty: number = 1): void {
    const lines = this.cartSubject.getValue();
    const existing = lines.find(l => l.product.id === product.id && l.product.type === product.type);

    let next: CartLine[];
    if (existing) {
      next = lines.map(l =>
        l.product.id === product.id && l.product.type === product.type
          ? { ...l, qty: l.qty + qty }
          : l
      );
    } else {
      next = [...lines, { product, qty }];
    }
    this.cartSubject.next(next);
  }

  remove(key: CartUpdateKey): void {
    const next = this.cartSubject
      .getValue()
      .filter(l => !(l.product.id === key.id && l.product.type === key.type));
    this.cartSubject.next(next);
  }

  clear(): void {
    this.cartSubject.next([]);
  }

  updateQty(key: CartUpdateKey, qty: number): void {
    const next = this.cartSubject.getValue().map(l => {
      if (l.product.id !== key.id || l.product.type !== key.type) return l;
      return { ...l, qty: Math.max(1, qty) };
    });
    this.cartSubject.next(next);
  }
}
