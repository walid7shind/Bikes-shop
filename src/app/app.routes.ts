import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BikesListComponent } from './pages/bikes-list/bikes-list.component';
import { BikeDetailComponent } from './pages/bike-details/bike-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AccessoriesListComponent } from './pages/accessories-list/accessories-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CatalogComponent } from './pages/catalog/catalog.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'catalog', pathMatch: 'full' },
	{ path: 'catalog', component: CatalogComponent },
	{ path: 'bikes', redirectTo: 'catalog' },
	{ path: 'accessories', redirectTo: 'catalog' },
	{ path: 'bikes/:id', component: BikeDetailComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'checkout', component: CheckoutComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: '**', redirectTo: 'catalog' },
];
