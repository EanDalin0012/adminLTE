import { Pipe, PipeTransform } from '@angular/core';
import { FormatterService } from '../services/formatter.service';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberPipe implements PipeTransform {

  constructor(private formatService: FormatterService) {

  }
  transform(value: string): any {
    return this.formatService.formatePhoneNumber(value).text;
  }

}
