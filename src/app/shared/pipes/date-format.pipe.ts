import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../services/formatter.service';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(private dateFormatService: FormatterService) {

  }
  transform(value: string): any {
    return this.dateFormatService.formateDate(value);
  }

}
