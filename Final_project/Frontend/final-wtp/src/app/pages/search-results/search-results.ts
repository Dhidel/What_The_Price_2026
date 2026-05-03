import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product';
import { SearchNavbar } from '../../../components/search-navbar/search-navbar';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SearchNavbar],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {

  products: Product[] = [];  // array donde se guardan los productos
  cargando = false;          // para mostrar un loading
  error = '';                // para mostrar errores

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudo conectar al servidor';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}