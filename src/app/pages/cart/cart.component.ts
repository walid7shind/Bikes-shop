import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { BikeService } from '../../services/bike.service';
import { CartLine } from '../../models/cart.model';
import { ProductType } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  lines: CartLine[] = [];

  constructor(public cartService: CartService, private bikeService: BikeService) {
    this.cartService.cart$.subscribe(lines => {
      this.lines = lines;
    });
  }

  price(line: CartLine): number {
    if (line.product.type === 'bike') {
      return this.bikeService.finalPrice(line.product) * line.qty;
    }
    return line.product.price * line.qty;
  }

  total(): number {
    return this.lines.reduce((sum, l) => sum + this.price(l), 0);
  }

  remove(id: number, type: ProductType): void {
    this.cartService.remove({ id, type });
  }

  changeQty(id: number, type: ProductType, value: string): void {
    this.cartService.updateQty({ id, type }, Number(value));
  }
}
