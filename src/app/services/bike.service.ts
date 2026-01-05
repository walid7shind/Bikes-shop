import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bike } from '../models/bike.model';

type BikeApi = {
  name: string;
  category: string;
  description: string;
  price: number;
};

@Injectable({ providedIn: 'root' })
export class BikeService {
  private readonly bikesUrl = '/assets/bikes.json';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}

  retrieveBikes(): Observable<Bike[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }
    return this.http.get<{ bikes: BikeApi[] }>(this.bikesUrl).pipe(
      map(payload =>
        (payload?.bikes ?? []).map((b, idx) => ({
          id: idx + 1,
          name: b.name,
          price: b.price,
          category: b.category,
          description: b.description,
          type: 'bike' as const,
        }))
      ),
    );
  }

  getBikeById(id: number): Observable<Bike | undefined> {
    return this.retrieveBikes().pipe(
      map(bikes => bikes.find(b => b.id === id))
    );
  }

  searchByMaxPrice(max: number): Observable<Bike[]> {
    return this.retrieveBikes().pipe(
      map(bikes => bikes.filter(b => this.finalPrice(b) <= max))
    );
  }

  finalPrice(b: Bike): number {
    const d = b.discountPercent ?? 0;
    return Math.round((b.price * (1 - d / 100)) * 100) / 100;
  }
}
