import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offers-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offers-section.html',
  styleUrl: './offers-section.css',
})
export class OffersSection implements OnInit {

  currentIndex = 0;

  banners = [
    {
      img: 'images/iphone.png',
      title: 'iPhone 17 pro max',
      subtitle: 'El mejor teléfono del año',
      descripcion: 'Oferta de verano'
    },
    {
      img: 'images/macbook.png',
      title: 'Macbook Pro',
      subtitle: 'Potencia sin límites',
      descripcion: 'Descuento exclusivo'
    },
    {
      img: 'images/airfryer.png',
      title: 'Air Fryer',
      subtitle: 'Tecnología para tu hogar',
      descripcion: 'Ahorra energía'
    },
    {
      img: 'images/televisor.png',
      title: 'Smart TV 4K',
      subtitle: 'Cine en casa',
      descripcion: 'Calidad ultra HD'
    }
  ];

// Para que se vaya moviendo cada 4 segundos (aún tengo dudas de como implementarlo)
  ngOnInit() {
    setInterval(() => {
      this.next();
    }, 4000);
  }

// Actualiza el indice en donde cada oferta está
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }

// Ayuda a los botones a saber a donde deben ir
  goTo(index: number) {
    this.currentIndex = index;
  }
}