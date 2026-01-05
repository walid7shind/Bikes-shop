import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Bike } from '../../models/bike.model';
import { BikeService } from '../../services/bike.service';
import { CartService } from '../../services/cart.service';
import { BikeCardComponent } from '../../components/bike-card/bike-card.component';
 
@Component({
  selector: 'app-bikes-list',
  standalone: true,
  imports: [NgFor, NgIf, BikeCardComponent],
  templateUrl: './bikes-list.component.html',
})
export class BikesListComponent implements OnInit {
  bikes: Bike[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private bikeService: BikeService,
    private cartService: CartService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.loadBikes();
  }

  private loadBikes(): void {
    this.errorMessage = '';
    this.loading = true;

    this.bikeService
      .retrieveBikes()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: bikes => (this.bikes = bikes),
        error: err => {
          console.error('Failed to load bikes catalog', err);
          this.errorMessage = 'Cannot load bikes right now. Check server/JSON availability and retry.';
        },
      });
  }

  retry(): void {
    this.loadBikes();
  }

  finalPrice(b: Bike): number {
    return this.bikeService.finalPrice(b);
  }

  onAddToCart(bike: Bike): void {
    this.cartService.add(bike, 1);
  }

  onOpenDetails(id: number): void {
    this.router.navigate(['/bikes', id]);
  }
}
