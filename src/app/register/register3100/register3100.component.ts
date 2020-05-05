import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { FormatterService } from '../../shared/services/formatter.service';
import { FormaterInputService } from '../../shared/services/formater-input.service';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { CompanyRequest } from 'src/app/shared/class-tr/classtr-req-company';
import { Utils } from 'src/app/shared/utils/utils.static';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';

@Component({
  selector: 'app-register3100',
  templateUrl: './register3100.component.html',
  styleUrls: ['./register3100.component.css']
})
export class Register3100Component implements OnInit {

  modal;
  @ViewChild('inputCompayName', {static: true}) inputCompayName: ElementRef;
  @ViewChild('inputContact', {static: true}) inputContact: ElementRef;
  @ViewChild('inputEmail', {static: true}) inputEmail: ElementRef;
  @ViewChild('inputAddress', {static: true}) inputAddress: ElementRef;
  errorCname: string;
  errorEmail: string;
  errorContact: string;

  // tslint:disable-next-line:member-ordering
  cName: string;
  cContact: string;
  contact: string;
  cEmail: string;
  cAddress: string;
  cDescription: string;
  translateTxt: any;
  constructor(
    private serverService: ServerService,
    private modalService: ModalService,
    private formatterService: FormatterService,
    private translate: TranslateService,
    private formaterInputService: FormaterInputService
  ) { }

  ngOnInit() {
    console.log('modal', this.modal);
    this.translate.get('Home2100').subscribe((res) => {
      this.translateTxt = res;
      console.log(res);
    });
    setTimeout(() => {
      this.inputCompayName.nativeElement.focus();
    }, 100);
  }

  ionViewWillEnter() {

  }

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }


  keyupContact(event) {
    // console.log(event);
    const data = this.formaterInputService.formatPhoneNumber(event);
    this.contact = data.value;
    // if (event) {
    //   const data = this.formatterService.formatePhoneNumber(event.target.value);
    //   event.target.value = data.text;
    //   this.contact       = data.value;
    // }
  }

  keyupEmail() {
    if ( !this.cEmail || this.cEmail && this.cEmail === '') {
      this.errorEmail = 'error_show';
    } else {
      this.errorEmail = '';
    }
  }

  SAVE() {

      if ( this.isValid() === true) {
        const trReq             = new CompanyRequest();
        const userInfo          = Utils.getUserInfo();
        console.log(userInfo);
        trReq.body.name         = this.cName;
        trReq.body.contact      = this.contact;
        trReq.body.email        = this.cEmail;
        trReq.body.address      = this.cAddress;
        trReq.body.description  = this.cDescription;
        trReq.body.createBy     = userInfo.id;
        trReq.body.createDate   = '';
        trReq.body.modifyBy     = userInfo.id;
        trReq.body.modifyDate   = '';
        console.log(trReq);
        const api = '/api/company_access/save';
        this.serverService.HTTPRequest(api, trReq).then(resp => {
          console.log(resp);
          const response = resp as ResponseData;
          if ( this.serverService.checkResponse(response.header) === true) {
            this.modal.close( {close: BTN_ROLES.SAVE});
          }
        });
      }
  }

  keyup(val: string) {
    console.log(this.formatterService.isValid(this.cEmail, 'EMAIL'));
  }

  onClickBntCross(str: string) {
    switch (str) {
      case 'name' :
        this.cName = undefined;
        break;
      case 'contact' :
        this.cContact = undefined;
        break;
      case 'email' :
        this.cEmail = undefined;
        break;
      case 'address' :
        this.cAddress = undefined;
        break;
      case 'descr' :
        this.cDescription = undefined;
        break;
    }
  }

  onKeyupContact(val: string) {
    const data = this.formatterService.formatePhoneNumber(this.cContact);
    this.cContact = data.text;
    this.contact = data.value;
  }

   isValid(): boolean {
    if ( !this.cName || this.cName && this.cName.trim() === '') {
      this.alertMessage(this.translateTxt.MESSAGE_ERROR.REQUIRE_COMPANY_NAME).then(async res => {
        this.inputCompayName.nativeElement.focus();
        return await res;
      });
    } else if ( !this.contact || this.contact && this.contact.trim() === '') {
       this.alertMessage(this.translateTxt.MESSAGE_ERROR.REQUIRE_CONTACT).then( async res => {
        this.inputContact.nativeElement.focus();
        return await res;
      });
    } else if ( !this.cEmail || this.cEmail && this.cEmail.trim() === '') {
       this.alertMessage(this.translateTxt.MESSAGE_ERROR.REQUIRE_EMAIL).then( async res => {
        this.inputEmail.nativeElement.focus();
        return await res;
      });
    } else if ( this.formatterService.isValid(this.contact, 'PHONE_NUM') === false) {
      this.alertMessage(this.translateTxt.MESSAGE_ERROR.IN_VALID_PHONE_NUMBER).then( async res => {
        this.inputContact.nativeElement.focus();
        return await res;
     });
   } else if ( this.formatterService.isValid(this.cEmail, 'EMAIL') === false) {
    this.alertMessage(this.translate.instant('COMMON.MESSAGE.INVALID_EMAIL')).then( async res => {
      this.inputEmail.nativeElement.focus();
      return await res;
    });
   } else {
      return true;
    }
    return;
  }

  alertMessage(msg: string): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.modalService.alert({
        content: msg,
        btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
        modalClass: [],
        callback: rest => {
          resolve(false);
        }
      });
    });
  }

}
