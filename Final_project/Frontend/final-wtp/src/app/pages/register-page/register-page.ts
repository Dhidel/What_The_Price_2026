import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  userData: User = {
    name: '',
    plan: 'basic',
    contrasena: ''
  };

  constructor(private router: Router, private userService: UserService) {}

onSubmit(): void {
  console.log('entró al submit');
  console.log('userData:', this.userData);

  if (!this.userData.name || !this.userData.plan || !this.userData.contrasena) {
    alert('Por favor, llena todos los campos');
    return;
  }

  console.log('antes del POST');

  this.userService.createUser(this.userData).subscribe({
    next: (res: User) => {
      console.log('Usuario creado con éxito', res);
      alert('¡Registro exitoso!');
      this.router.navigate(['/login']);
    },
    error: (err: any) => {
      console.error('Error al registrar:', err);
      console.error('error body:', err?.error);
      alert('Hubo un error al crear la cuenta.');
    }
  });

  this.userService.createUser(this.userData).subscribe({
  next: (res: User) => {
    this.userService.setUser(res);
    alert('¡Registro exitoso!');
    this.router.navigate(['/profile']);
  },
  error: (err: any) => {
    console.error('Error al registrar:', err);
    alert('Hubo un error al crear la cuenta.');
  }
});
}

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}