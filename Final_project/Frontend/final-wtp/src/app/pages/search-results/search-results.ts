import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../services/product';
import { SearchNavbar } from '../../../components/search-navbar/search-navbar';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SearchNavbar, RouterLink],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {

  products: Product[] = [];
  cargando = false;
  error = '';
  searchTerm = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['name'] || '';
      this.cargarProductos(this.searchTerm);
    });
  }

  cargarProductos(name?: string): void {
    this.cargando = true;
    this.productService.getProducts(name).subscribe({
      next: (data) => {
        this.products = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'No se pudo conectar al servidor';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }
}
