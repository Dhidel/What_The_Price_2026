import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoQuetzal', // Nombre con el que se usa en el HTML
  standalone: true
})
export class FormatoQuetzalPipe implements PipeTransform {

  // Recibe un número y devuelve un string con formato Q1,799
  transform(valor: number): string {
    return 'Q' + valor.toLocaleString('es-GT');
  }
}