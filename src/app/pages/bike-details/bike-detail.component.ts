import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Bike } from '../../models/bike.model';
import { BikeService } from '../../services/bike.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-bike-detail',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css'],
})
export class BikeDetailComponent implements OnInit {
  bike?: Bike;

  constructor(
    private route: ActivatedRoute,
    private bikeService: BikeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = Number(idStr);

    this.bikeService.getBikeById(id).subscribe(b => {
      this.bike = b;
    });
  }

  finalPrice(): number {
    if (!this.bike) return 0;
    return this.bikeService.finalPrice(this.bike);
  }

  add(): void {
    if (this.bike) this.cartService.add(this.bike, 1);
  }
}
