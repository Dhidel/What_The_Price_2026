import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  constructor(private router: Router) {}

  goToSearch() {
    this.router.navigate(['/search']); //Navega entre rutas
  }

}
