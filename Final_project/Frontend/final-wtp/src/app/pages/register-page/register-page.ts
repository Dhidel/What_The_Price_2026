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

  constructor(private router: Router, private userService: UserService) {} //Se inyecta el servicio

onSubmit(): void {
  console.log('entró al submit');
  console.log('userData:', this.userData); //Solo para poner en la consola para pruebas

  if (!this.userData.name || !this.userData.plan || !this.userData.contrasena) {
    alert('Por favor, llena todos los campos');
    return;
  } //Valida que se llenen los campos necesarios

  console.log('antes del POST'); //Para pruebas en consolas

  this.userService.createUser(this.userData).subscribe({
    next: (res: User) => {
      console.log('Usuario creado con éxito', res);
      alert('¡Registro exitoso!');
      this.router.navigate(['/login']);
    }, //Cuando los datos son correctos

    error: (err: any) => {
      console.error('Error al registrar:', err);
      console.error('error body:', err?.error);
      alert('Hubo un error al crear la cuenta.');
    }
  }); //Cuando no se pudo crear la cuenta

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
    this.router.navigate([path]); //Para navegar entre rutas
  }
}