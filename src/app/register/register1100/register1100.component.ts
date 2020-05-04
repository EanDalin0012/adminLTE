import { Component, OnInit } from '@angular/core';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { MainCategoryRequest } from 'src/app/shared/class-tr/classtr-req-main-category';
import { Utils } from 'src/app/shared/utils/utils.static';
import { TranslateService } from '@ngx-translate/core';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MainCategory } from 'src/app/shared/class/class-main-category';

@Component({
  selector: 'app-register1100',
  templateUrl: './register1100.component.html',
  styleUrls: ['./register1100.component.css']
})
export class Register1100Component implements OnInit {

  modal;
  typeList: any[] = [];
  mainCategory: MainCategory;
  mainCategoryName: string;
  description: string;

  translateTxt: any;
  constructor(
    private translate: TranslateService,
    private serverService: ServerService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.translate.get('Home7100').subscribe((res) => {
      this.translateTxt = res;
     });
  }

  btnRegister() {
    if ( this.isValid() === true) {
      const userInfo                = Utils.getUserInfo();
      const trReq                   = new MainCategoryRequest();
      trReq.body.mainCategoryName   = this.mainCategoryName;
      trReq.body.description        = this.description;
      trReq.body.createBy           = userInfo.id;
      trReq.body.modifyBy           = userInfo.id;
      console.log(trReq);
      const api = '/api/main_category/save';
      this.serverService.HTTPRequest(api, trReq).then(rest => {
        if ( this.serverService.checkResponse(rest.header) === true) {
          this.modal.close( {close: BTN_ROLES.SAVE});
        }
      });
    }
}

private isValid(): boolean {
  if (!this.mainCategoryName || this.mainCategoryName && this.mainCategoryName.trim() === ''
      || this.mainCategoryName && this.mainCategoryName === null) {
    this.alertMessage(this.translateTxt.MESSAGE_ERROR.MAIN_CATEGORY_REQUEIRED).then(async res => {
     return await res;
    });
  } else {
    return true;
  }
  return;
}

alertMessage(msg: string): Promise<boolean> {
  // tslint:disable-next-line: no-shadowed-variable
  return new Promise((resolve) => {
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

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  onClickBtnMainCategoryName() {
      this.mainCategoryName = undefined;
  }

  onClickBtndescription() {
    this.description = undefined;
  }

}
