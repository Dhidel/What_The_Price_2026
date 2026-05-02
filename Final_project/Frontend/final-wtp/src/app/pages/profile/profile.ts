import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importante para el routerLink en el HTML
import { SearchNavbar } from '../../../components/search-navbar/search-navbar';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [SearchNavbar, CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  // El estado de la sesión, se puede cambiar entre true o false si se quiere hacer preubas
  isLoggedIn: boolean = true; 

  // Datos del usuario
  userName: string = "Dhidel Jyssep Osorio Arévalo";
  userId: string = "19001234";
  userPhoto: string | ArrayBuffer | null = "images/person.png";  
  // Se pone estas 3 cosas por las 3 formas en la que puede venir una imagen


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // Esta función se ejecuta cuando el navegador termina de leer el archivo
      reader.onload = (e: any) => {
        this.userPhoto = e.target.result; // Actualiza la variable que está vinculada al [src] en el HTML
      };

      // Lee la imagen y la convierte en una URL Base64 para mostrarla en el navegador
      reader.readAsDataURL(file);
    }
  }
}