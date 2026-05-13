import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // ActivatedRoute permite leer los query params de la URL
import { ProductService, Product } from '../../../services/product'; // servicio que llama al backend
import { SearchNavbar } from '../../../components/search-navbar/search-navbar';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SearchNavbar, RouterLink],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {

  products: Product[] = []; // lista de productos que se muestran en pantalla
  cargando = false;          // controla si se muestra un indicador de carga
  error = '';                // mensaje de error si la petición falla
  searchTerm = '';           // término de búsqueda tomado de la URL

  constructor(
    private productService: ProductService, // inyecta el servicio de productos
    private route: ActivatedRoute,          // inyecta el acceso a la ruta activa
    private cdr: ChangeDetectorRef          // fuerza la detección de cambios manualmente cuando es necesario
  ) {}

  ngOnInit(): void {
    // se suscribe a los query params, si el usuario cambia el ?name= en la URL, esto vuelve a correr
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['name'] || ''; // extrae ?name= o deja vacío
      this.cargarProductos(this.searchTerm);  // pone la búsqueda con el término obtenido
    });
  }

  cargarProductos(name?: string): void {
    this.cargando = true; // activa el estado de carga antes de la petición
    this.productService.getProducts(name).subscribe({
      next: (data) => {
        this.products = data;       // guarda los productos recibidos del backend
        this.cargando = false;      // desactiva el estado de carga
        this.cdr.detectChanges();   // notifica a Angular que actualice la vista
      },
      error: (err) => {
        this.error = 'No se pudo conectar al servidor'; // muestra mensaje de error en la vista
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err); // imprime el error real en consola para debugging
      }
    });
  }
}
