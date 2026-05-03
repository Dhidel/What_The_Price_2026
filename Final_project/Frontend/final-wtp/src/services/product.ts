import { Injectable } from '@angular/core';

// HttpClient es lo que se usa para hacer peticiones HTTP (GET, POST, DELETE, etc.)
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// Interfaz que define cómo se ve un producto
export interface Product {
  _id?: string;       // id de MongoDB, opcional porque no existe hasta que se guarda (el ? significa opcional)
  name: string;       // nombre del producto, obligatorio
  category: string;   // categoría, obligatorio
  imageUrl?: string;  // imagen, opcional
  prices: {           // array de precios por tienda
    store: string;    // nombre de la tienda
    price: number;    // precio en esa tienda
    url?: string;     // link al producto, opcional
  }[];
}

// providedIn: 'root' = este servicio es un singleton, una sola instancia para toda la app
@Injectable({ providedIn: 'root' })
export class ProductService {

  // URL base del backend: apunta a la API local
  private apiUrl = 'http://localhost:3000/api/products';

  // Inyecta HttpClient para poder usarlo en los métodos
  constructor(private http: HttpClient) {}

  // GET /api/products (obtiene todos los productos)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // POST /api/products (crea un producto nuevo)
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // DELETE /api/products/:id (elimina un producto por su id)
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 