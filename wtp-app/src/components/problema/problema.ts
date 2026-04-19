// Se importa Component para definir el componente
// Se importa AfterViewInit para ejecutar código después de que el HTML cargue
import { Component, AfterViewInit } from '@angular/core';

// Decorador que define el componente: su selector, HTML y CSS
@Component({
  selector: 'app-problema',       
  imports: [],                      
  templateUrl: './problema.html',   // Archivo HTML del componente
  styleUrl: './problema.css',       // Archivo CSS del componente
})

// Clase del componente, implementa AfterViewInit para usar ngAfterViewInit
export class Problema implements AfterViewInit {

  // Se ejecuta automáticamente cuando el HTML termina de renderizar
  ngAfterViewInit(): void {
    // Se espera 100ms para garantizar que el DOM esté completamente listo
    setTimeout(() => {
      this.activarContadores();
    }, 100);
  }

  // Busca todos los elementos con clase "stat-numero" y atributo "data-meta"
  // y los observa para iniciar la animación cuando sean visibles
  private activarContadores(): void {

    // Selecciona todos los divs de números animados del HTML
    const numeros = document.querySelectorAll('.stat-numero[data-meta]');

    // Si no se encontró ningún elemento, la función termina
    if (!numeros || numeros.length === 0) return;

    // IntersectionObserver detecta cuando un elemento entra al viewport (pantalla visible)
    const observador = new IntersectionObserver((elementos) => {
      elementos.forEach(elemento => {

        // Solo se anima si el elemento es visible en pantalla
        if (elemento.isIntersecting) {
          this.contarHasta(elemento.target as HTMLElement);

          // Se deja de observar el elemento para que no se anime dos veces
          observador.unobserve(elemento.target);
        }
      });
    }, { threshold: 0.3 }); // Se activa cuando el 30% del elemento es visible

    // Se registra cada número para ser observado
    numeros.forEach(numero => observador.observe(numero));
  }

  // Anima un número desde 0 hasta su valor final con efecto de desaceleración
  private contarHasta(el: HTMLElement): void {

    // Se lee el número final desde el atributo data-meta del HTML
    const meta = parseInt(el.getAttribute('data-meta') || '0', 10);

    // Se lee el sufijo desde data-extra (ej: "%", " días", " min")
    const extra = el.getAttribute('data-extra') || '';

    // Duración total de la animación: 2 segundos
    const duracion = 2000;

    // Se guarda el momento exacto en que empieza la animación
    const inicio = performance.now();

    // Función de suavizado: el número sube rápido al inicio y desacelera al final
    const suavizar = (t: number) => 1 - Math.pow(1 - t, 3);

    // Función que se llama en cada frame del navegador para actualizar el número
    const actualizar = (ahora: number) => {

      // Tiempo transcurrido desde que empezó la animación
      const pasado = ahora - inicio;

      // Progreso entre 0 y 1 (0 = inicio, 1 = final)
      const progreso = Math.min(pasado / duracion, 1);

      // Número actual calculado con el suavizado
      const actual = Math.round(suavizar(progreso) * meta);

      // Se actualiza el texto visible en pantalla
      el.textContent = actual + extra;

      // Si aún no terminó, se pide otro frame al navegador
      if (progreso < 1) {
        requestAnimationFrame(actualizar);
      } else {
        // Al terminar, se asegura que muestre el número exacto final
        el.textContent = meta + extra;
      }
    };

    // Se inicia el primer frame de la animación
    requestAnimationFrame(actualizar);
  }
}