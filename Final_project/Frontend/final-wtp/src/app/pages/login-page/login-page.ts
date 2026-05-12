import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  userData = {
    name: '',
    password: '', //Variables para el log in
  };

  errorMessage = '';
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService // Inyector de dependencias
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.userData.name || !this.userData.password) {
      this.errorMessage = 'Por favor, llena todos los campos.';
      return;
    } //Mensaje de error

    this.loading = true;

    this.userService.login(this.userData.name, this.userData.password).subscribe({
      next: (user: User) => {
        this.userService.setUser(user);
        this.loading = false;
        this.router.navigate(['/profile']); //Valida el usuario
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Nombre o contraseña incorrectos.';
        console.error('Login error:', err);
      }, //Si no es valido el usuario tira un mensaje de error
    });
  }

  navigate(path: string): void {
    this.router.navigate([path]); //Navega entre rutas
  }
}