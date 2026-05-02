import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-search-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './search-navbar.html',
  styleUrl: './search-navbar.css',
})
export class SearchNavbar {
  
  // Indice para las otras funciones, está en falso porque de base no se inicia el menú
  isMenuOpen = false;
  showAboutText = false; // Indice para aparecer el mensaje

  // Se inyecta una dependencia
  constructor(private router: Router) {}

  // Se niega el indice para que abra el menú
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Función para la navegación
  navigate(path: string) {
    this.router.navigate([path]);
    this.toggleMenu();
  }

  // Muestra nuestro mensaje al apachar el botón 
  toggleAbout() {
    this.showAboutText = !this.showAboutText;
  }
  contactWhatsApp() {
    const msg = encodeURIComponent("Hola, necesito asistencia técnica en WTP");
    window.open(`https://wa.me/50254308032?text=${msg}`, '_blank');
    this.toggleMenu();
  }
}

