import { Component } from '@angular/core';
import { SearchNavbar } from '../../../components/search-navbar/search-navbar';
import { ProductDetail as ProductDetailComponent } from '../../../components/product-detail/product-detail';
import { ProductSpecs } from '../../../components/product-specs/product-specs';
import { ShoppingSection } from '../../../components/shopping-section/shopping-section';
import { SimilarProducts } from '../../../components/similar-products/similar-products';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [SearchNavbar, ProductDetailComponent, ProductSpecs, ShoppingSection, SimilarProducts],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

}
