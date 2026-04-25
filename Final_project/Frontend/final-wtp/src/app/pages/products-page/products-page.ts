import { Component } from '@angular/core';
import { SearchNavbar } from '../../../components/search-navbar/search-navbar';
import { ProductDetail } from '../../../components/product-detail/product-detail';
import { ProductSpecs } from '../../../components/product-specs/product-specs';
import { ShoppingSection } from '../../../components/shopping-section/shopping-section';
import { SimilarProducts } from '../../../components/similar-products/similar-products';

@Component({
  standalone: true,
  selector: 'app-products-page',
  imports: [SearchNavbar, ProductDetail, ProductSpecs, ShoppingSection, SimilarProducts],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {

}
