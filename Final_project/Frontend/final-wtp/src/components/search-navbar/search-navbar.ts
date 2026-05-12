import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core'; 
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import { filter, Subscription } from 'rxjs';
import { UserService, User } from '../../app/services/user';

@Component({
  standalone: true,
  selector: 'app-search-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './search-navbar.html',
  styleUrl: './search-navbar.css',
})
export class SearchNavbar implements OnInit, OnDestroy {
  isMenuOpen = false; //Menú por defecto apagado
  showAboutText = false; //Texto por defecto apagado
  currentUser: User | null = null;

  private routerSub?: Subscription;

  constructor(
    private router: Router,
    public userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object // 3. Inyecta el ID de plataforma
  ) {} //Inyecciones

  ngOnInit(): void {
    this.refreshUser();

    if (isPlatformBrowser(this.platformId)) {
      this.routerSub = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.refreshUser();
          this.isMenuOpen = false; // Cerramos el menú al navegar
        });
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe(); //Sirve para desactivar los componentes cuando no se usen
  }

  refreshUser(): void {
    this.currentUser = this.userService.getUserLocal(); //Actualiza el estado del menú
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; //Muestra el menú
  }

  navigate(path: string): void {
    this.router.navigate([path]); //Navega entre rutas
    this.toggleMenu();
  }

  toggleAbout(): void {
    this.showAboutText = !this.showAboutText; //Muestra el texto
  }

  contactWhatsApp(): void {
    if (isPlatformBrowser(this.platformId)) { //Protege la llamada a window
      const msg = encodeURIComponent('Hola, necesito asistencia técnica en WTP');
      window.open(`https://wa.me/50254308032?text=${msg}`, '_blank');
    }
    this.isMenuOpen = false;
  }
}