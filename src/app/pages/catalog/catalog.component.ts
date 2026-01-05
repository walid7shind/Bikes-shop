import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Product } from '../../models/product.model';
import { BikeService } from '../../services/bike.service';
import { AccessoryService } from '../../services/accessory.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  loading = true;
  errorMessage = '';
  private retried = false;

  filterType: 'all' | 'bike' | 'accessory' = 'all';
  maxPrice?: number;
  searchName = '';

  constructor(
    private bikeService: BikeService,
    private accessoryService: AccessoryService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin([
      this.bikeService.retrieveBikes(),
      this.accessoryService.retrieveAccessories(),
    ])
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: ([bikes, accessories]) => {
          const combined = [...bikes, ...accessories];

          if (combined.length === 0 && !this.retried) {
            // Hacky auto-retry to mitigate first-load empty SSR/hydration edge cases.
            this.retried = true;
            this.loadProducts();
            return;
          }

          this.products = combined;
          this.applyFilters();
        },
        error: err => {
          console.error('Failed to load catalog', err);
          this.errorMessage = 'Unable to load catalog. Please retry.';
        },
      });
  }

  applyFilters(): void {
    const nameQuery = this.searchName.trim().toLowerCase();
    const max = this.maxPrice ?? Number.POSITIVE_INFINITY;

    this.filtered = this.products
      .filter(p => (this.filterType === 'all' ? true : p.type === this.filterType))
      .filter(p => p.price <= max)
      .filter(p => (!nameQuery ? true : p.name.toLowerCase().includes(nameQuery)));
  }

  onFiltersChange(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.filterType = 'all';
    this.maxPrice = undefined;
    this.searchName = '';
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartService.add(product, 1);
  }
}
