import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Bike } from '../../models/bike.model';

@Component({
  selector: 'app-bike-card',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './bike-card.component.html',
  styleUrls: ['./bike-card.component.css'],
})
export class BikeCardComponent {
  @Input() bike!: Bike;
  @Input() finalPrice!: number;

  @Output() addToCart = new EventEmitter<Bike>(); 
  @Output() openDetails = new EventEmitter<number>(); 

  onAddClick(): void {
    this.addToCart.emit(this.bike);
  }

  onOpen(): void {
    this.openDetails.emit(this.bike.id);
  }
}
