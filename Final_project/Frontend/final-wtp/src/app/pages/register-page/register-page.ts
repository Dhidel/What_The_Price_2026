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
  // Objeto vinculado al formulario mediante ngModel
  userData: User = {
    name: '',
    plan: 'basic',
    gmail: '',
    password: ''
  };

  loading = false; // Para evitar múltiples clics

  constructor(private router: Router, private userService: UserService) {} //Se inyecta el servicio

  onSubmit(): void {
    console.log('entró al submit');
    console.log('userData:', this.userData); //Solo para poner en la consola para pruebas

    // Validación: El gmail ahora es mandatorio para que MongoDB no rechace la petición
    if (!this.userData.name || !this.userData.gmail || !this.userData.password) {
        alert('Por favor, llena todos los campos obligatorios.');
        return;
      } //Valida que se llenen los campos necesarios

    this.loading = true; // Bloqueamos el botón para evitar registros duplicados mientras el servidor responde

    console.log('antes del POST'); //Para pruebas en consolas

    // Llamada al servicio que conecta con tu API en Render
    this.userService.createUser(this.userData).subscribe({
      next: (res: User) => {
        console.log('Usuario creado con éxito', res);
        
        // Guardamos la sesión local para que el Navbar reconozca al nuevo usuario de inmediato
        this.userService.setUser(res); 
        
        alert('¡Registro exitoso!');
        this.loading = false;
        
        // Redirigimos al perfil para que vea sus datos recién creados (user_id y create_date)
        this.router.navigate(['/profile']); 
      }, //Cuando los datos son correctos

      error: (err: any) => {
        this.loading = false;
        console.error('Error al registrar:', err);
        console.error('error body:', err?.error);
        
        // Si el error es 400, probablemente el Gmail ya existe en Atlas (unique: true)
        if (err.status === 400) {
          alert('Error: El correo ya está registrado o los datos son inválidos.');
        } else {
          alert('Hubo un error al crear la cuenta. Revisa tu conexión.');
        }
      }
    }); //Cuando no se pudo crear la cuenta
  }
  
  navigate(path: string): void {
    this.router.navigate([path]); //Para navegar entre rutas
  }
}