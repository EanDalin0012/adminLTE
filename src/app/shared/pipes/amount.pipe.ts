import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountPipe'
})
export class AmountFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
