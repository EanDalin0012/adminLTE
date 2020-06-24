import { Component, OnInit } from '@angular/core';
import { MainCategoryRequest } from 'src/app/shared/class-tr/classtr-req-main-category';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { Utils } from 'src/app/shared/utils/utils.static';
import { ServerService } from 'src/app/shared/services/server.service';
import { MainCategory } from 'src/app/shared/class/class-main-category';
import { IsValidModelService } from 'src/app/shared/services/is-valid.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-register1200',
  templateUrl: './register1200.component.html',
  styleUrls: ['./register1200.component.css']
})
export class Register1200Component implements OnInit {

  id: number;
  mainCategoryName: string;
  description: string;
  modal;
  mainCategory: MainCategory;
  translateTxt: any;
  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.translate.get('Home7100').subscribe((res) => {
      this.translateTxt = res;
     });
    this.setDataEdit();
  }

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  btnUpdate() {

    if (this.isValid() === true) {
      const userInfo              = Utils.getUserInfo();
      const trReq                 = new MainCategoryRequest();
      trReq.body.id               = this.id;
      trReq.body.mainCategoryName = this.mainCategoryName;
      trReq.body.description      = this.description;
      trReq.body.createBy         = userInfo.id;
      trReq.body.modifyBy         = userInfo.id;

      const api = '/api/main_category/update';

      this.serverService.HTTPRequest(api, trReq).then( response => {
          if ( response.body.returnYN === 'Y') {
            this.modal.close( {close: BTN_ROLES.EDIT});
          }
      });
    }

  }


  setDataEdit() {
    if (this.modal) {
      this.id = this.modal.message.id;
      this.mainCategoryName = this.modal.message.mainCategoryName;
      this.description      = this.modal.message.description;
    }

  }

  onClickBtnMainCategoryName() {
    this.mainCategoryName = undefined;
  }

  onClickBtndescription() {
    this.description = undefined;
  }

  private isValid(): boolean {
    if (!this.mainCategoryName || this.mainCategoryName && this.mainCategoryName.trim() === ''
        || this.mainCategoryName && this.mainCategoryName === null) {
        const bool = this.modalService.messageAlert(this.translateTxt.MESSAGE_ERROR.MAIN_CATEGORY_REQUEIRED);
        return bool;
    } else {
      return true;
    }
    return;
  }

}
