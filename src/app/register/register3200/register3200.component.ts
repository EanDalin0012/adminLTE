import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { FormatterService } from 'src/app/shared/services/formatter.service';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { CompanyRequest } from 'src/app/shared/class-tr/classtr-req-company';
import { Utils } from 'src/app/shared/utils/utils.static';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';

@Component({
  selector: 'app-register3200',
  templateUrl: './register3200.component.html',
  styleUrls: ['./register3200.component.css']
})
export class Register3200Component implements OnInit {

  modal;
  errorCname: string;
  errorEmail: string;
  errorContact: string;

  cId: number;
  cName: string;
  cContact: string;
  cEmail: string;
  cAddress: string;
  cDescription: string;
  translateTxt: any;

  constructor(
    private serverService: ServerService,
    private modalService: ModalService,
    private formatterService: FormatterService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.setEditData();
    console.log('modal', this.modal);
    this.translate.get('Home2100').subscribe((res) => {
      this.translateTxt = res;
      console.log(res);
     });
  }
  ionViewWillEnter() {

  }
  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  keyupContact() {
    if ( !this.cContact || this.cContact && this.cName === '') {
      this.errorContact = 'error_show';
    } else {
      this.errorContact = '';
    }
  }

  keyupEmail() {
    if ( !this.cEmail || this.cEmail && this.cEmail === '') {
      this.errorEmail = 'error_show';
    } else {
      this.errorEmail = '';
    }
  }

  update() {
    if ( this.isValid() ) {
    const api               = '/api/company_access/update';
    const trReq             = new CompanyRequest();
    trReq.body.name         = this.cName;
    trReq.body.contact      = this.formatterService.unFormat(this.cContact);
    trReq.body.email        = this.cEmail;
    trReq.body.address      = this.cAddress;
    trReq.body.description  = this.cDescription;
    trReq.body.createBy     = Utils.getUserInfo().id;
    trReq.body.id           = this.cId;
    this.serverService.HTTPRequest(api, trReq ).then(res => {
      const response = res as  ResponseData;
      if ( this.serverService.checkResponse(response.header) === true) {
        this.modal.close( {close: BTN_ROLES.EDIT});
      }
    });
    }

  }

  KEYUPCNAME() {
    this.cName = '';
  }

  keyup(val: string) {
    this.isValid();
  }

  crossBtnClick(jqueryId: string, note: string) {

  }

  isValid(): boolean {
    if ( !this.cName || this.cName && this.cName.trim() === '') {
      const bool = this.modalService.messageAlert(this.translateTxt.MESSAGE_ERROR.REQUIRE_COMPANY_NAME);
      return bool;
    } else if ( !this.cContact || this.cContact && this.cContact.trim() === '') {
      const bool = this.modalService.messageAlert(this.translateTxt.MESSAGE_ERROR.REQUIRE_CONTACT);
      return bool;
    } else if ( !this.cEmail || this.cEmail && this.cEmail.trim() === '') {
      const bool = this.modalService.messageAlert(this.translateTxt.MESSAGE_ERROR.REQUIRE_EMAIL);
      return bool;
    } else if ( this.formatterService.isValid(this.cContact, 'PHONE_NUM') === false) {
      const bool = this.modalService.messageAlert(this.translateTxt.MESSAGE_ERROR.IN_VALID_PHONE_NUMBER);
      return bool;
   } else if ( this.formatterService.isValid(this.cEmail, 'EMAIL') === false) {
    const bool = this.modalService.messageAlert(this.translate.instant('COMMON.MESSAGE.INVALID_EMAIL'));
    return bool;
   } else {
      return true;
    }
  }

  setEditData() {
    if ( this.modal.message ) {
      this.cName        = this.modal.message.name;
      this.cContact     = this.formatterService.formatePhoneNumber(this.modal.message.contact).text;
      this.cEmail       = this.modal.message.email;
      this.cAddress     = this.modal.message.address;
      this.cDescription = this.modal.message.description;
      this.cId          = this.modal.message.id;
    }
  }

}
