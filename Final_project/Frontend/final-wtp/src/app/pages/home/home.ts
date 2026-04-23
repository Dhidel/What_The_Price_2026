import { Component } from '@angular/core';
import { Navbar } from '../../../components/navbar/navbar';
import { SearchBar } from '../../../components/search-bar/search-bar';
import { FilterSection } from '../../../components/filter-section/filter-section';
import { OffersSection } from '../../../components/offers-section/offers-section';
import { CategoriesSection } from '../../../components/categories-section/categories-section';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [Navbar, SearchBar, FilterSection, OffersSection, CategoriesSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
