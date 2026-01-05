import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BikesListComponent } from './pages/bikes-list/bikes-list.component';
import { BikeDetailComponent } from './pages/bike-details/bike-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'bikes', component: BikesListComponent },
	{ path: 'bikes/:id', component: BikeDetailComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'checkout', component: CheckoutComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '**', redirectTo: '' },
];
