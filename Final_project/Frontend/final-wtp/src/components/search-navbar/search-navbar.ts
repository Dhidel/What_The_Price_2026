import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  isMenuOpen = false;
  showAboutText = false;
  currentUser: User | null = null;

  private routerSub?: Subscription;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.refreshUser();

    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.refreshUser();
      });
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

  navigate(path: string): void {
    this.router.navigate([path]);
    this.toggleMenu();
  }

  toggleAbout(): void {
    this.showAboutText = !this.showAboutText;
  }

  contactWhatsApp(): void {
    const msg = encodeURIComponent('Hola, necesito asistencia técnica en WTP');
    window.open(`https://wa.me/50254308032?text=${msg}`, '_blank');
    this.toggleMenu();
  }
}