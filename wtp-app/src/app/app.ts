import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../components/navbar/navbar';
import { Hero } from '../components/hero/hero';
import { ComoFunciona } from '../components/como-funciona/como-funciona';
import { Problema } from '../components/problema/problema';
import { Mercado } from '../components/mercado/mercado';
import { ModeloNegocio } from '../components/modelo-negocio/modelo-negocio';
import { Tecnologias } from '../components/tecnologias/tecnologias';
import { Escalabilidad } from '../components/escalabilidad/escalabilidad';
import { Equipo } from '../components/equipo/equipo';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar,
    Hero,
    ComoFunciona,
    Problema,
    Mercado,
    ModeloNegocio,
    Tecnologias,
    Escalabilidad,
    Equipo,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('wtp-app');
}
