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
    contrasena: '',
  };

  errorMessage = '';
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.userData.name || !this.userData.contrasena) {
      this.errorMessage = 'Por favor, llena todos los campos.';
      return;
    }

    this.loading = true;

    this.userService.login(this.userData.name, this.userData.contrasena).subscribe({
      next: (user: User) => {
        this.userService.setUser(user);
        this.loading = false;
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Nombre o contraseña incorrectos.';
      },
    });
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}