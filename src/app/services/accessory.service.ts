import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Accessory } from '../models/accessory.model';

type AccessoryApi = {
  name: string;
  description: string;
  price: number;
};

@Injectable({ providedIn: 'root' })
export class AccessoryService {
  private readonly accessoriesUrl = '/assets/accessories.json';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}

  retrieveAccessories(): Observable<Accessory[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }

    return this.http.get<AccessoryApi[]>(this.accessoriesUrl).pipe(
      map(payload =>
        (payload ?? []).map((a, idx) => ({
          id: idx + 100,
          name: a.name,
          description: a.description,
          price: a.price,
          type: 'accessory' as const,
        }))
      ),
    );
  }
}
