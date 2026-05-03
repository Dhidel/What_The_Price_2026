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
  isMenuOpen = false;
  showAboutText = false;

  currentUser: User | null = null;
  private routerSub?: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.refreshUser();

    if (isPlatformBrowser(this.platformId)) {
      this.routerSub = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.refreshUser();
        });
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  refreshUser(): void {
    this.currentUser = this.userService.getUserLocal();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeAllMenus(): void {
    this.isMenuOpen = false;
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    this.closeAllMenus();
  }

  toggleAbout(): void {
    this.showAboutText = !this.showAboutText;
  }

  logout(): void {
    this.userService.logout();
    this.currentUser = null;
    this.closeAllMenus();
    this.router.navigate(['/']);
  }

  contactWhatsApp(): void {
    const msg = encodeURIComponent('Hola, necesito asistencia técnica en WTP');
    window.open(`https://wa.me/50254308032?text=${msg}`, '_blank');
    this.closeAllMenus();
  }
}