import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  plan: string;
  contrasena: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3004/users';
  private loginUrl = 'http://localhost:3004/login'; //Se definen las rutas

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object //Inyección
  ) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`); //Llamar un usuario específico
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl); //LLama a todos los usuarios
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user); //Usa el post para crear un usuario
  }

  login(name: string, contrasena: string): Observable<User> {
    return this.http.post<User>(this.loginUrl, { name, contrasena }); //Valida los usuarios para el log in
  }

  updateUser(id: number, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, data);  //Patch para actualizar datos (Falta implementar en el perfil)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); //Delete para borrar usuario (Falata implementar
  }

  setUser(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user)); //Guarda el usuario logueado
    }
  }

  getUserLocal(): User | null {
    if (!isPlatformBrowser(this.platformId)) { //Lee el usuario guardado
      return null;
    }

    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user'); //Borra el usuario guardado
    }
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) { //Define si hay usuario guardado 
      return false;
    }
    return !!localStorage.getItem('user');
  }
}