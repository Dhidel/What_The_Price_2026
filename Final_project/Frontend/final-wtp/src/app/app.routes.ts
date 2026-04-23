import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SearchResults } from './pages/search-results/search-results';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'search', component: SearchResults},
    { path: 'product/:id', component: ProductDetail },
];
