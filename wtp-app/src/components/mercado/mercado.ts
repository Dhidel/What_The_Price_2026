import { Component } from '@angular/core';
import { FormatoQuetzalPipe } from '../../pipes/formato-quetzal-pipe';

@Component({
  selector: 'app-mercado',
  imports: [FormatoQuetzalPipe], // agrega el pipe
  templateUrl: './mercado.html',
  styleUrl: './mercado.css',
})
export class Mercado {}