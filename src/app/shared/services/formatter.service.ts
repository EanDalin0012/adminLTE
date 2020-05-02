import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils.static';
import { DatePipe } from '@angular/common';
import { DateFormat } from '../common/common.type';
export type FormatterMode = 'PHONE_NUM' |'EMAIL';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor(
    private datePipe: DatePipe
  ) {}

  private static dateRegExpListInstance: Map<DateFormat, RegExp>;
  private static get dateRegExpList(): Map<DateFormat, RegExp> {
      if (this.dateRegExpListInstance === undefined) {
          this.dateRegExpListInstance = new Map();
          this.dateRegExpListInstance.set('hhmm'          , /^([0-2]{1}\d{1})(\d{2})$/);
          this.dateRegExpListInstance.set('hhmmss'        , /^([0-2]{1}\d{1})(\d{2})(\d{2})$/);
          this.dateRegExpListInstance.set('hhmmssSSS'     , /^([0-2]{1}\d{1})(\d{2})(\d{2})(\d{3})$/);
          this.dateRegExpListInstance.set('yyyymmdd'      , /^([1-2]{1}\d{3})(\d{2})(\d{2})$/);
          this.dateRegExpListInstance.set('yyyy-mm-dd'    , /^([1-2]{1}\d{3})-(\d{2})-(\d{2})$/);
          this.dateRegExpListInstance.set('yyyymmddhhmm'  , /^([1-2]{1}\d{3})(\d{2})(\d{2})(\d{2})(\d{2})$/);
          this.dateRegExpListInstance.set('yyyymmddhhmmss', /^([1-2]{1}\d{3})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
          this.dateRegExpListInstance.set('yyyymmddhhmmssSSS', /^([1-2]{1}\d{3})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      }
      return this.dateRegExpListInstance;
  }

  formateDate(val: string): string {
    if ( Utils.getSecureStorage( 'langCode' ) === 'en' || Utils.getSecureStorage( 'langCode' ) === 'km' ) {
      const date = String(val.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1-$2-$3'));
      return this.datePipe.transform(date, 'dd/MMM/yyyy');
    }
    return String(val).replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1-$2-$3');
  }

  format(s: string, groups: number[], sep: string): string {
    let str = s.replace(/\D/g, '');
    let result = '';
    groups.some((group, index) => {
        result += str.substr(0, group);
        if (str.length > group && index < groups.length - 1) {
            result += sep;
            str = str.substr(group);
        } else {
            return true;
        }
    });
    // if (str[str.length - 1] === sep) {
    //     result += sep;
    // }
    return result;
  }

  isValid(str: string, mode: FormatterMode): boolean {
    let result: boolean;
    switch (mode) {
        case 'PHONE_NUM': result = /^([0]{1}\d{2})(\d{3})(\d{3,4})$/.test(str) || /^([0]{1}\d{2}) (\d{3}) (\d{3,4})$/.test(str); break;
        case 'EMAIL': result = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(str); break;
        default: result = false;
    }
    return result;
  }

  /**
   * Return a string as 000 000 0000 if str contains number 9/10digits, '0' other wise.
   * @param str string
   */
  formatePhoneNumber(str: string): FomatterData {
    if (str === '' || str === null || !str) {
      return  { text: '', value: '' };
    }

    if (str[0] !== '0' && str !== '') {
        str = '0' + str;
    }
    const text = this.format(str, [3, 3, 4], ' ');
    const value = text.replace(/\s/g, '');
    return { text, value };
  }

  formatAmount(s: string | number, digit: number): FomatterData {
    let value = String(s);
    if ( digit === 0 ) {
        return {
            text: this.formatNumber(this.toFixed(value, 0).text),
            value: +this.unformatNumber(this.toFixed(value, 0).text)
        };
    } else {
        const split = String(value).split('.');
        const afterDigit =  split[0];
        const beforDigit = split[1];
        if ( afterDigit) {
            const a = String(beforDigit).substr(0, digit);
            let zeroStr = '';
            if ( beforDigit === undefined ) {
                for ( let i = 0; i < digit; i++) {
                    zeroStr = zeroStr + '0';
                }
                return {
                    text: this.formatNumber(afterDigit) + '.' + zeroStr,
                    value: Number(this.unformatNumber(afterDigit)),
                };
            } else {
                const beforDigitLeng = String(beforDigit).length;
                let addZero = '';
                if ( beforDigitLeng < digit ) {
                    for ( let i = 0; i <  (digit - beforDigitLeng); i++ ) {
                        addZero = addZero + '0';
                    }
                }
                return {
                    text: this.formatNumber(afterDigit) + '.' + String(beforDigit).substr(0, digit) + addZero,
                    value: Number(this.unformatNumber(afterDigit) + '.' + String(beforDigit).substr(0, digit)),
                };
            }
        }
    }
  }

public unFormat(val: string): string {
    return val.replace(/\s/g, '');
}

  /**
   * @param value string | number
   * @param returnFormate  number
   */
  toFixed(value: string | number, returnFormate: number): FomatterData {
  const split = String(value).split('.');
  const b = split[0];
  const a = split[1];
  if (b) {
      if (returnFormate === 0) {
          return {
              text: b,
              value: b
          };
      } else {
          if (a === undefined) {
              return {
                  text: String(b + '.00'),
                  value: b
              };
          } else {
              return {
                  text: b + '' + a.substr(0, returnFormate),
                  value: b + '' + a.substr(0, returnFormate)
              };
          }
      }
  }
}


/**
 * @param n string
 */
private formatNumber(n: any) {
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

unformatNumber(num: any) {
  if (num !== undefined && num !== null) {
      return num.toString().replace(/[,\s]+/g, '');
  } else {
      return '';
  }
}

}

export interface FomatterData {
text: string;
value: any;
}

