import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoQuetzal',
})
export class FormatoQuetzalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
