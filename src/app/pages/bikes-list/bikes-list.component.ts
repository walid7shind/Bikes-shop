import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
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

  constructor(
    private bikeService: BikeService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bikeService.retrieveBikes().subscribe(bikes => {
      this.bikes = bikes;
      this.loading = false;
    });
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
