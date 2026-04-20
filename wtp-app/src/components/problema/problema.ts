// Se importa Component para definir el componente
// Se importa AfterViewInit para ejecutar código después de que el HTML cargue
// Se importa PLATFORM_ID e Inject para detectar si estamos en el navegador o servidor
import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

// Se importa isPlatformBrowser para verificar si el código corre en el navegador
import { isPlatformBrowser } from '@angular/common';

// Decorador que define el componente: su selector, HTML y CSS
@Component({
  selector: 'app-problema',
  imports: [],
  templateUrl: './problema.html',
  styleUrl: './problema.css',
})

// Clase del componente
export class Problema implements AfterViewInit {

  // Se inyecta el PLATFORM_ID para saber si estamos en el navegador o en el servidor
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Se ejecuta automáticamente cuando el HTML termina de renderizar
  ngAfterViewInit(): void {

    // Solo se ejecuta si estamos en el navegador (no en el servidor)
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.activarContadores();
      }, 100);
    }
  }

  // Busca todos los elementos con clase "stat-number" y atributo "data-count-to"
  private activarContadores(): void {

    // Selecciona todos los divs de números animados del HTML
    const numeros = document.querySelectorAll('.stat-number[data-count-to]');

    // Si no se encontró ningún elemento, la función termina
    if (!numeros || numeros.length === 0) return;

    // Detecta cuando cada número entra en la pantalla del usuario
    const observador = new IntersectionObserver((elementos) => {
      elementos.forEach(elemento => {

        // Solo se anima si el elemento es visible en pantalla
        if (elemento.isIntersecting) {
          this.contarHasta(elemento.target as HTMLElement);

          // Se deja de observar para que no se anime dos veces
          observador.unobserve(elemento.target);
        }
      });
    }, { threshold: 0.3 }); // Se activa cuando el 30% del elemento es visible

    // Se registra cada número para ser observado
    numeros.forEach(numero => observador.observe(numero));
  }

  // Anima un número desde 0 hasta su valor final
  private contarHasta(el: HTMLElement): void {

    // Se lee el número final desde el atributo data-count-to del HTML
    const meta = parseInt(el.getAttribute('data-count-to') || '0', 10);

    // Se lee el sufijo desde data-suffix (ej: "%", " días", " min")
    const extra = el.getAttribute('data-suffix') || '';

    // Duración total de la animación: 2 segundos
    const duracion = 2000;

    // Se guarda el momento exacto en que empieza la animación
    const inicio = performance.now();

    // Función de suavizado: sube rápido al inicio y desacelera al final
    const suavizar = (t: number) => 1 - Math.pow(1 - t, 3);

    // Función que actualiza el número en cada frame del navegador
    const actualizar = (ahora: number) => {

      // Tiempo transcurrido desde que empezó
      const pasado = ahora - inicio;

      // Progreso entre 0 y 1
      const progreso = Math.min(pasado / duracion, 1);

      // Número actual con suavizado
      const actual = Math.round(suavizar(progreso) * meta);

      // Se muestra el número actualizado en pantalla
      el.textContent = actual + extra;

      // Si no terminó, se pide otro frame
      if (progreso < 1) {
        requestAnimationFrame(actualizar);
      } else {
        // Al terminar se asegura el número exacto final
        el.textContent = meta + extra;
      }
    };

    // Se inicia la animación
    requestAnimationFrame(actualizar);
  }
}