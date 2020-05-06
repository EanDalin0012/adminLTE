import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from 'src/app/shared/Class/class-suplier';
import { TranslateService } from '@ngx-translate/core';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormatterService } from 'src/app/shared/services/formatter.service';
import { FormaterInputService } from 'src/app/shared/services/formater-input.service';
import { Utils } from 'src/app/shared/utils/utils.static';
import { SupplierRequest } from 'src/app/shared/class-tr/classtr-req-supplier';
import { SupplierResponse } from 'src/app/shared/class-tr/classtr-res-supplier';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';

@Component({
  selector: 'app-register4200',
  templateUrl: './register4200.component.html',
  styleUrls: ['./register4200.component.css']
})
export class Register4200Component implements OnInit {

  supplier: Supplier;
  // supplier info
  supName: string;
  supContact: string;
  supContactTwo: string;
  supContactTwoTrm: string;
  supContactTrm: string;
  supEmail: string;
  description: string;

  // modal
  modal;

  @ViewChild('supNameDir', {static: true}) supNameDir;
  @ViewChild('supContactDir', {static: true}) supContactDir;
  @ViewChild('supEmailDir', {static: true}) supEmailDir;
  constructor(
    private translate: TranslateService,
    private serverService: ServerService,
    private modalService: ModalService,
    private formatterService: FormatterService,
    private formateInput: FormaterInputService
  ) { }

  ngOnInit() {
    console.log('modal', this.modal.message);
    if (this.modal) {
      this.supplier = this.modal.message;
      this.setData(this.supplier);
    }
    setTimeout(() => {
      this.supNameDir.nativeElement.focus();
    }, 100);
  }

  close() {
    this.modal.close();
  }

  setData(supplier: Supplier) {
    this.supName          = supplier.supName;
    this.supContact       = supplier.supContact;
    this.supContactTrm    = this.formatterService.formatePhoneNumber(supplier.supContact).text;
    this.supContactTwo    = supplier.supContactTwo;
    this.supContactTwoTrm = this.formatterService.formatePhoneNumber(supplier.supContactTwo).text;
    this.supEmail         = supplier.supEmail;
    this.description      = supplier.description;
  }
  onClickBntCross(note: string) {
    if (note === 'supName') {
      this.supName = undefined;
    } else if (note === 'supContact') {
      this.supContactTrm = undefined;
      this.supContact    = undefined;
    } else if (note === 'supEmail') {
      this.supEmail = undefined;
    } else if (note === 'description') {
      this.description = undefined;
    } else if (note === 'supContactTwo') {
      this.supContactTwo    = undefined;
      this.supContactTwoTrm = undefined;
    }
  }

  inputContact(event) {
    this.supContact = this.formateInput.formatPhoneNumber(event).value;
  }

  inputContactTwo(event) {
    if (event) {
      event.target.value = event.target.value.replace(/\D/g, '');
    }
  }

  onClickSave() {
    this.postData();
  }

  postData() {
    if (this.isValid() === true) {
      const userInfo              = Utils.getUserInfo();
      const request               = new SupplierRequest();
      request.body.id             = this.supplier.id;
      request.body.supName        = this.supName;
      request.body.supContact     = this.supContact;
      request.body.supContactTwo  = this.supContactTwo;
      request.body.supEmail       = this.supEmail;
      request.body.description    = this.description;
      request.body.createBy       = userInfo.id;
      request.body.modifyBy       = userInfo.id;
      const api = '/res/supplier/update';
      console.log('request', request);
      this.serverService.HTTPRequest(api, request).then(response => {
        let res = new SupplierResponse();
        res = response;
        if (this.serverService.checkResponse(res.header)) {
          this.modal.close({close: BTN_ROLES.EDIT});
        }
      });
    }
  }

  isValid(): boolean {
    if (this.supName === '' || !this.supName) {
      const bool = this.modalService.messageAlert(this.translate.instant('Home11000.MESSAGE.SUP_NAME_NULL'));
      return bool;
    } else if (this.supContact === '' || !this.supContact) {
      const bool = this.modalService.messageAlert(this.translate.instant('Home11000.MESSAGE.SUP_CANTACT_NULL'));
      return bool;
    } else if (this.supEmail === '' || !this.supEmail) {
      const bool = this.modalService.messageAlert(this.translate.instant('Home11000.MESSAGE.SUP_EMAIL_NULL'));
      return bool;
    } else if (this.formatterService.isValid(this.supEmail, 'EMAIL') === false) {
      const bool = this.modalService.messageAlert(this.translate.instant('COMMON.MESSAGE.INVALID_EMAIL'));
      return bool;
    } else {
      return true;
    }
  }

}
