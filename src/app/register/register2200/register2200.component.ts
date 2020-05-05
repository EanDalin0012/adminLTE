import { Component, OnInit, ViewChild } from '@angular/core';
import { MainCategory } from 'src/app/shared/class/class-main-category';
import { ServerService } from 'src/app/shared/services/server.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SubCategoryRequest } from 'src/app/shared/class-tr/classtr-req-sub-category';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { RequestDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-register2200',
  templateUrl: './register2200.component.html',
  styleUrls: ['./register2200.component.css']
})
export class Register2200Component implements OnInit {

  @ViewChild('subCate', {static: true}) subCate;
  modal;
  typeList: any[] = [];
  mainCategory: MainCategory;
  mainCategoryList = new Array<MainCategory>();
  mainCategoryID: number;

  subCategoryName: string;
  subCategoryId: number;
  description: string;
  translateTxt: any;
  ngClassList: string;

  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService,
    private dataServiec: RequestDataService
  ) { }

  ngOnInit() {
    this.translate.get('Home8100').subscribe((res) => {
      this.translateTxt = res;
     });
    this.setNgModel();
    this.getMainCategoryList();
  }

  close() {
    this.modal.close();
  }

  onClickBtnSubCategory() {
    this.subCategoryName = undefined;
  }

  onClickBtnDescr() {
    this.description = undefined;
  }

  onClickUpdate() {
    if ( this.isValid() === true ) {
        const trReq                = new SubCategoryRequest();
        trReq.body.id              = this.subCategoryId;
        trReq.body.mainCategoryId  = this.mainCategory.id;
        trReq.body.subCategoryName = this.subCategoryName;
        trReq.body.description     = this.description;
        const api = '/api/sub_category/update';
        this.serverService.HTTPRequest(api, trReq).then(rest => {
          const response = rest as ResponseData;
          if ( this.serverService.checkResponse(rest.header) === true) {
            this.modal.close( {close: BTN_ROLES.EDIT});
          }
        });
    }
  }

  selectionChange() {

  }

  setNgModel() {
    console.log(this.modal);
    if (this.modal) {
      this.mainCategoryID = this.modal.message.mainCatId;
      this.subCategoryName = this.modal.message.subCatName;
      this.description     = this.modal.message.description;
      this.subCategoryId   = this.modal.message.subCatId;
    }
  }

  getMainCategoryList() {
    this.dataServiec.inquiryMainCategory().then(response => {
      console.log('response', response);
      if (response) {
        console.log(this.mainCategoryID);
        this.mainCategoryList = response;
        this.mainCategoryList.forEach(element => {
          if (this.mainCategoryID) {
            if (this.mainCategoryID === element.id) {
              this.mainCategory = element;
              this.ngClassList = 'active-input';
            }
          }
        });
      }
    });
  }

  isValid(): boolean {
    const mainCategoryText = this.translateTxt.LABEL.MAIN_CATEGORY_ID;
    const subText = this.translateTxt.LABEL.SUB_CATEGORY_NAME;
    if (!this.mainCategory) {
      const bool = this.modalService.messageAlert(mainCategoryText);
      return bool;
    } else if (this.subCategoryName === undefined) {
      const bool = this.modalService.messageAlert(subText);
      this.subCate.nativeElement.focus();
      return bool;
    } else {
      return true;
    }
  }

}
