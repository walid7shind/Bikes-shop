import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bike } from '../models/bike.model';

@Injectable({ providedIn: 'root' })
export class BikeService {
  // In the course you had "retrieveProducts()": same idea here.
  retrieveBikes(): Observable<Bike[]> {
    // We keep it local to stay within slides scope (no backend required).
    return of(this.seedBikes());
  }

  getBikeById(id: number): Observable<Bike | undefined> {
    return this.retrieveBikes().pipe(
      map(bikes => bikes.find(b => b.id === id))
    );
  }

  // Example of "operator" usage (filter)
  searchByMaxPrice(max: number): Observable<Bike[]> {
    return this.retrieveBikes().pipe(
      map(bikes => bikes.filter(b => this.finalPrice(b) <= max))
    );
  }

  finalPrice(b: Bike): number {
    const d = b.discountPercent ?? 0;
    return Math.round((b.price * (1 - d / 100)) * 100) / 100;
  }

  private seedBikes(): Bike[] {
    return [
      { id: 1, name: 'Aero Road 300', price: 1200, category: 'Road', discountPercent: 10, inStock: 5, description: 'Fast road bike.' },
      { id: 2, name: 'Mountain Pro X', price: 1500, category: 'MTB', inStock: 3, description: 'Trail / enduro ready.' },
      { id: 3, name: 'City Comfort', price: 550, category: 'City', discountPercent: 5, inStock: 12, description: 'Daily commute bike.' },
      { id: 4, name: 'Gravel Explorer', price: 980, category: 'Gravel', inStock: 7, description: 'Mixed terrain bike.' },
      { id: 5, name: 'E-Bike Volt', price: 2200, category: 'Electric', inStock: 2, description: 'Electric assist bike.' },
    ];
  }
}
