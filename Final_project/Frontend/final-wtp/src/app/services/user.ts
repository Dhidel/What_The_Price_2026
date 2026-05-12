import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  user_id?: number;
  name: string;
  plan: string;
  gmail: string;
  password: string;
  create_date?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://what-the-price-2026-9jx2.onrender.com/users';
  private loginUrl = 'https://what-the-price-2026-9jx2.onrender.com/login'; //Se definen las rutas

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object //Inyección
  ) {}

  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${user_id}`); //Llamar un usuario específico
  } 

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl); //LLama a todos los usuarios
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);  //Usa el post para crear un usuario
  }

  login(name: string, password: string): Observable<User> {
    return this.http.post<User>(this.loginUrl, { name, password }); //Valida los usuarios para el log in
  }

  updateUser(user_id: number, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${user_id}`, data); //Patch para actualizar datos (Falta implementar en el perfil)
  }

  deleteUser(user_id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${user_id}`); //Delete para borrar usuario (Falata implementar
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