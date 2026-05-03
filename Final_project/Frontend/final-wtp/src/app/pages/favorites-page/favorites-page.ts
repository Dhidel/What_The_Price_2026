import { Component } from '@angular/core';
import { SearchNavbar } from '../../../components/search-navbar/search-navbar';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-favorites-page',
  imports: [SearchNavbar, CommonModule],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
})
export class FavoritesPage {

}
