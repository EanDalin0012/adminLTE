import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../services/formatter.service';

@Pipe({
  name: 'discountFormat'
})
export class DiscountFormatPipe implements PipeTransform {

  constructor(private formatService: FormatterService) {

  }
  transform(value: string): string {
    return this.formatService.toFixed(value, 2).text + ' %';
  }

}
