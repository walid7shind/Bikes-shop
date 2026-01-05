import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  done = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', Validators.required],
      phone: [''],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    // simulate order creation
    this.cartService.clear();
    this.done = true;
  }

  back(): void {
    this.router.navigate(['/bikes']);
  }
}
