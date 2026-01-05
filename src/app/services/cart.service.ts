import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bike } from '../models/bike.model';
import { CartLine } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartSubject = new BehaviorSubject<CartLine[]>([]);
  cart$: Observable<CartLine[]> = this.cartSubject.asObservable();

  add(bike: Bike, qty: number = 1): void {
    const lines = this.cartSubject.getValue();
    const existing = lines.find(l => l.bike.id === bike.id);

    let next: CartLine[];
    if (existing) {
      next = lines.map(l => l.bike.id === bike.id ? { ...l, qty: l.qty + qty } : l);
    } else {
      next = [...lines, { bike, qty }];
    }
    this.cartSubject.next(next);
  }

  remove(bikeId: number): void {
    const next = this.cartSubject.getValue().filter(l => l.bike.id !== bikeId);
    this.cartSubject.next(next);
  }

  clear(): void {
    this.cartSubject.next([]);
  }

  updateQty(bikeId: number, qty: number): void {
    const next = this.cartSubject.getValue().map(l => {
      if (l.bike.id !== bikeId) return l;
      return { ...l, qty: Math.max(1, qty) };
    });
    this.cartSubject.next(next);
  }
}
