import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../services/formatter.service';

@Pipe({
  name: 'amountFormat'
})
export class AmountFormatPipe implements PipeTransform {
  constructor(private formatService: FormatterService) {

  }
  transform(value: string, CurrencyCode: 'USD' | 'KHR'): string {
    if (!CurrencyCode || CurrencyCode === 'USD') {
      return this.formatService.toFixed(value, 2).text;
    }
    return this.formatService.toFixed(value, 0).text;
  }

}
