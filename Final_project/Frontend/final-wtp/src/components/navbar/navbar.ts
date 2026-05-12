import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { UserService, User } from '../../app/services/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  isMenuOpen = false; //Menú por defecto apagado
  showAboutText = false; //Texto por defecto apagado

  currentUser: User | null = null;
  private routerSub?: Subscription; 

  constructor(
    private router: Router,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {} //Inyecciones

  ngOnInit(): void {
    this.refreshUser();

    if (isPlatformBrowser(this.platformId)) { // Evita que truene cuando algunas herramientas del navegador no esten en el servidor
      this.routerSub = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd)) //Tuberia donde se filtran los datos
        .subscribe(() => {
          this.refreshUser();//Carga usuarios aunque cambie de ruta 
          this.closeAllMenus(); //Cierra los menús
        });
    }
  }

  ngOnDestroy(): void {
    if (this.routerSub){
      this,this.routerSub.unsubscribe()
    } //Sirve para desactivar los componentes caundo se sale de ellos
  }

  refreshUser(): void {
    this.currentUser = this.userService.getUserLocal(); //Actualiza el estado del navbar
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen; //Muestra el menú
  }

  closeAllMenus(): void {
    this.isMenuOpen = false; //Cierra el menú
    this.showAboutText = false; //Cierra el texto
  }

  navigate(path: string): void {
    this.router.navigate([path]); //Para navegar 
    this.closeAllMenus();
  }

  toggleAbout(): void {
    this.showAboutText = !this.showAboutText; //Muestra el contenido de "Sobre nosotros"
  }

  logout(): void {
    this.userService.logout();
    this.currentUser = null;
    this.closeAllMenus();
    this.router.navigate(['/']);  //Borra el usuario 
  }

  contactWhatsApp(): void { //Hace funcionar el servicio al cliente redirigiendolo al whatsapp
    const msg = encodeURIComponent('Hola, necesito asistencia técnica en WTP'); //Mensaje predefinido
    window.open(`https://wa.me/50254308032?text=${msg}`, '_blank'); //Link con el número de la persona (Sofía, en este caso)
    this.closeAllMenus(); 
  }
}