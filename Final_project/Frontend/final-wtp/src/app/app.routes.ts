import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SearchResults } from './pages/search-results/search-results';
import { ProductsPage } from './pages/products-page/products-page';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'search', component: SearchResults},
    { path: 'product', component: ProductsPage },
];
