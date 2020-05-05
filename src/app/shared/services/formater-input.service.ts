import { Injectable } from '@angular/core';
import { FormatterService } from './formatter.service';
import { EVENT_CODE, CURRENCY_CODE } from '../constants/common.const';

@Injectable({
  providedIn: 'root'
})
export class FormaterInputService {

  constructor(
    private formaterService: FormatterService
  ) { }

  private formatInputMoney(n: string) {
    return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  private unFormatInput(n: string) {
    return n.replace(/\D/g, '');
  }

  formateMoney(event, eventCode: EVENT_CODE, currency: CURRENCY_CODE) {
    if (event) {
      if (event.target.value === '') {
        return;
      } else {
        let returnVal = {
          text: '',
          value: 0
        };
        let selectionStart        = Number(event.target.selectionStart);
        const originalLengthInput = event.target.value.length;
        const decimalPosition     = event.target.value.indexOf('.');
        let leftSide  = event.target.value.substring(0, decimalPosition);
        let rightSide = event.target.value.substring(decimalPosition);
        if (eventCode === EVENT_CODE.INPUT) {
          if (decimalPosition === -1) {
            returnVal.text = this.formatInputMoney(event.target.value);
            returnVal.value = Number(this.unFormatInput(returnVal.text));
          } else {
            if (currency === CURRENCY_CODE.USD) {
              returnVal.text = this.formatInputMoney(leftSide) + '' + String(rightSide).substr(0, 3);
              returnVal.value = Number(this.unFormatInput(returnVal.text) + '' + String(rightSide).substr(0, 3));
            } else if (currency === CURRENCY_CODE.KHR) {
              returnVal.text = this.formatInputMoney(leftSide);
              returnVal.value = Number(this.unFormatInput(returnVal.text));
            }
          }
        } else if (eventCode === EVENT_CODE.FOCUS) {
          if (currency === CURRENCY_CODE.USD) {
              if (rightSide === '.00') {
                returnVal.text = this.formatInputMoney(leftSide);
                returnVal.value = Number(this.unFormatInput(returnVal.text));
              } else {
                let rightSideSubstr = String(rightSide).substr(0, 3);
                if (rightSideSubstr.substr(2, 3) === '0') {
                  rightSideSubstr = '.' + rightSideSubstr.substr(1, 1);
                }
                returnVal.text = this.formatInputMoney(leftSide) + '' + rightSideSubstr;
                returnVal.value = Number(this.unFormatInput(returnVal.text));
              }
          } else if (currency === CURRENCY_CODE.KHR) {
            returnVal.text = this.formatInputMoney(leftSide);
            returnVal.value = Number(this.unFormatInput(returnVal.text));
          }
        } else if (eventCode === EVENT_CODE.FOCUSOUT) {
          if (currency === CURRENCY_CODE.USD) {
            if (decimalPosition === -1) {
              returnVal.text = this.formatInputMoney(event.target.value) + '.00';
              returnVal.value = Number(this.unFormatInput(event.target.value));
            } else {
              let rightSideSubstr = String(rightSide).substr(0, 3);
              if (rightSideSubstr.substr(2, 3) === '') {
                rightSideSubstr = rightSideSubstr + '0';
              }
              returnVal.text = this.formatInputMoney(leftSide) + '' + String(rightSideSubstr);
              returnVal.value = Number(this.unFormatInput(returnVal.text) + '' + String(rightSideSubstr));
            }
          } else if (currency === CURRENCY_CODE.KHR) {
            returnVal.text = this.formatInputMoney(leftSide);
            returnVal.value = Number(this.unFormatInput(returnVal.text));
          }
        }
        event.target.value = returnVal.text;
        const updatedLength = event.target.value.length;
        selectionStart = updatedLength - originalLengthInput + selectionStart;
        event.target.selectionEnd = selectionStart;
      }
    }
  }

  formatPhoneNumber(event): {value: string} {
    const returnValue = {
      value: ''
    };
    if (event) {
      let selectionStart = Number(event.target.selectionStart);
      const data = this.formaterService.formatePhoneNumber(event.target.value);
      const originalLengthInput = event.target.value.length;
      if (data) {
        returnValue.value   = data.value;
        event.target.value  = data.text;
      }
      const updatedLength = event.target.value.length;
      selectionStart = updatedLength - originalLengthInput + selectionStart;
      event.target.selectionEnd = selectionStart;
    }
    return returnValue;
  }
}
