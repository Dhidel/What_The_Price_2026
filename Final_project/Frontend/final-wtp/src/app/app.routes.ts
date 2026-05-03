import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SearchResults } from './pages/search-results/search-results';
import { ProductsPage } from './pages/products-page/products-page';
import { FavoritesPage } from './pages/favorites-page/favorites-page';
import { Profile } from './pages/profile/profile';
import { RegisterPage } from './pages/register-page/register-page';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'search', component: SearchResults},
    { path: 'product', component: ProductsPage },
    { path: 'favorites-page', component: FavoritesPage},
    { path: 'profile', component: Profile},
    {path: 'register', component: RegisterPage},
    {path: 'login', component: LoginPage}
];
