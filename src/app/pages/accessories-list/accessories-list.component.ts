import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Accessory } from '../../models/accessory.model';
import { AccessoryService } from '../../services/accessory.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-accessories-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './accessories-list.component.html',
  styleUrls: ['./accessories-list.component.css'],
  
})
export class AccessoriesListComponent implements OnInit {
  accessories: Accessory[] = [];
  loading = true;

  constructor(
    private accessoryService: AccessoryService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Avoid marking loading false on SSR; the browser pass will fetch and update.
      return;
    }

    this.accessoryService
      .retrieveAccessories()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: items => {
          console.log('ACCESSORIES RECEIVED:', items);
          this.accessories = items;
        },
        error: err => console.error('Failed to load accessories catalog', err),
      });

  }

  onAddToCart(accessory: Accessory): void {
    this.cartService.add(accessory, 1);
  }
}
