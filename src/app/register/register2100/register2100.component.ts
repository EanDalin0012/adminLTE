import { Component, OnInit, ViewChild } from '@angular/core';
import { MainCategory } from 'src/app/shared/class/class-main-category';
import { ServerService } from 'src/app/shared/services/server.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { MainCategoryList } from 'src/app/shared/class-tr/classtr-main-category-list';
import { SubCategoryRequest } from 'src/app/shared/class-tr/classtr-req-sub-category';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';

@Component({
  selector: 'app-register2100',
  templateUrl: './register2100.component.html',
  styleUrls: ['./register2100.component.css']
})
export class Register2100Component implements OnInit {

  @ViewChild('subCate', {static: true}) subCate;
  modal;
  typeList: any[] = [];
  mainCategory: MainCategory;
  subCategoryName: string;
  description: string;
  translateTxt: any;
  mainCategoryList = new Array<MainCategory>();
  ngClassList: string;

  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.translate.get('Home8100').subscribe((res) => {
      this.translateTxt = res;
     });
    this.doRequestMainCategory();
  }

  close() {
    this.modalService.closeAllDialog();
    // this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  doRequestMainCategory() {
    const trReq = new ResponseData();
    const api = '/api/main_category/getList';
    this.serverService.HTTPRequest(api, trReq).then(rest => {
      const response = rest as MainCategoryList;
      if ( this.serverService.checkResponse(rest.header) === true) {
        this.mainCategoryList   = response.body;
      }
    });
  }

  selectionChange(value) {
    if (value) {
      this.mainCategory = value;
      this.ngClassList = 'active-input';
    } else {
      this.ngClassList = '';
    }
  }

  onClickRegister() {
    this.isValid().then( res => {
      if (res === true) {
        const trReq                = new SubCategoryRequest();
        trReq.body.mainCategoryId  = this.mainCategory.id;
        trReq.body.subCategoryName = this.subCategoryName;
        trReq.body.description     = this.description;
        const api = '/api/sub_category/save';
        this.serverService.HTTPRequest(api, trReq).then(rest => {
          const response = rest as ResponseData;
          if ( this.serverService.checkResponse(response.header) === true) {
            this.modal.close( {close: BTN_ROLES.SAVE});
          }
        });
      }
    });
  }

  onClickBtnSubCategory() {
    this.subCategoryName = undefined;
  }

  onClickBtnDescr() {
    this.description = undefined;
  }

  isValid(): Promise<boolean> {
    return new Promise( resolve => {
      const mainCategoryText = this.translateTxt.LABEL.MAIN_CATEGORY_ID;
      const subText = this.translateTxt.LABEL.SUB_CATEGORY_NAME;
      if (!this.mainCategory) {
        this.alertMessage(mainCategoryText, 'list').then( res => {
          resolve(false);
         });
      } else if (this.subCategoryName === undefined) {
        this.alertMessage(subText, 'subCat').then( res => {
         resolve(false);
        });
      } else {
        resolve(true);
      }
    });
  }

  alertMessage(msg: string, note: string): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.modalService.alert({
        content: msg,
        btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
        modalClass: [],
        callback: response => {
          if (response.text === this.translate.instant('COMMON.BUTTON.CONFIRME') ) {
            if (note === 'subCat') {
              this.subCate.nativeElement.focus();
            }
          }
          resolve(false);
        }
      });
    });
  }

}
