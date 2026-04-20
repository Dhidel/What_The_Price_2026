import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common'; // ← agregás esto

@Component({
  selector: 'app-navbar',
  imports: [UpperCasePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
