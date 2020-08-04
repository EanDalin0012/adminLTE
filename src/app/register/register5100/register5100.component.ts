import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChunkSettings, ClearEvent, FileInfo, FileRestrictions, RemoveEvent, SelectEvent, SuccessEvent, UploadEvent } from '@progress/kendo-angular-upload';
import { MainCategoryList } from 'src/app/shared/class-tr/classtr-main-category-list';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { MainCategory } from 'src/app/shared/Class/class-main-category';
import { BTN_ROLES, LOGO_FILE_EXT } from 'src/app/shared/constants/common.const';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ServerService } from 'src/app/shared/services/server.service';
import { environment } from 'src/environments/environment';
import { ProductRequest } from '../../shared/class-tr/classtr-req-product';
import { Product } from '../../shared/class/class-product';
import { SubCategory } from '../../shared/class/class-sub-category';
import { RequestDataService } from '../../shared/services/get-data.service';
import { Utils } from '../../shared/utils/utils.static';

@Component({
  selector: 'app-register5100',
  templateUrl: './register5100.component.html',
  styleUrls: ['./register5100.component.css']
})
export class Register5100Component implements OnInit {

  @ViewChild('subCate', {static: true}) subCate;
  modal;
  typeList: any[] = [];
  mainCategoryInfo: MainCategory;
  subCategoryInfo: SubCategory;
  subCategoryId: number;

  subCategoryName: string;

  translateTxt: any;
  mainCategoryList = new Array<MainCategory>();
  valuePrimitiveMainCategory: boolean;
  defaultMainCategoryInfo: MainCategory = {
    id: 0,
    mainCategoryName: 'Select Main Category',
    description: null,
    createBy: null,
    modifyBy: null,
    createDate: null,
    modifyDate: null,
    status: null
  };


  subCategoryList = new Array<SubCategory>();
  subCatListTrm: SubCategory[];
  valuePrimitiveSubCategory: boolean;
  defaultSubCategoryInfo: SubCategory = {
    id: 0,
    mainCategoryId: 0,
    subCategoryName: 'Select Sub Category',
    description: null,
    createBy: null,
    modifyBy: null,
    createDate: null,
    modifyDate: null,
    status: null
  };

  ngClassList: string;

  // img declear
  uploadbtn = true;
  public imagePreviews: any;
  public uploadRemoveUrl = 'removeUrl';
  userinfo: any;

  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: LOGO_FILE_EXT
  };

  public uploadSaveUrl: string;

  selectedFile: File;
  message: string;
  userInfo: any;

  api = '/api/file/upload/product';
  public chunkSettings: ChunkSettings = {
    size: 102400
  };

  product: Product;
  subCateId: number;
  proName: string;
  resourceFileInfoId: string;
  description: string;

  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService,
    private dataService: RequestDataService
  ) { }

  ngOnInit() {
    this.uploadSaveUrl = environment.bizServer.server + this.api;
    this.uploadRemoveUrl = environment.bizServer.server + '/api/file/removeUrl';
    this.valuePrimitiveMainCategory = true;
    this.valuePrimitiveSubCategory = true;
    this.translate.get('Home8100').subscribe((res) => {
      this.translateTxt = res;
     });
    this.inquiryMainCategory();
    this.inquirySubCategory();
  }

  close() {
    this.modal.close();
  }

  inquiryMainCategory() {
    const trReq = new ResponseData();
    const api = '/api/main_category/getList';
    this.serverService.HTTPRequest(api, trReq).then(rest => {
      const response = rest as MainCategoryList;
      if ( this.serverService.checkResponse(rest.header) === true) {
        this.mainCategoryList   = response.body;
      }
    });
  }

  valueChangeMainCategory(value) {
    console.log(value);
    if (value) {
      this.subCategoryInfo = undefined;
      this.valuePrimitiveSubCategory = true;
      this.subCategoryList = [];
      this.subCatListTrm.forEach(element => {
        if (Number(value) === element.mainCategoryId) {
          this.subCategoryList.push(element);
        }
      });
      this.ngClassList = 'active-input';
    } else {
      this.ngClassList = '';
    }
  }

  valueChangeSubCategory(value) {
    if (value) {
      this.subCategoryId = value;
    }
  }

  onClickRegister() {
    if (this.isValid() === true) {
      const trReq                = new ProductRequest();
      trReq.body.subCateId       = this.subCategoryId;
      trReq.body.proName         = this.proName;
      trReq.body.description     = this.description;
      trReq.body.createBy        = Utils.getUserInfo().id;
      trReq.body.resourceFileInfoId = this.resourceFileInfoId;
      const api = '/api/product/save';
      this.serverService.HTTPRequest(api, trReq).then(rest => {
        const response = rest as ResponseData;
        if ( this.serverService.checkResponse(response.header) === true) {
          this.modal.close( {close: BTN_ROLES.SAVE});
        }
      });
    }

  }

  onClickBtnSubCategory() {
    this.subCategoryName = undefined;
  }

  onClickBtnDescr() {
    this.description = undefined;
  }

  isValid(): boolean {
      const mainCategoryText = this.translateTxt.LABEL.MAIN_CATEGORY_ID;
      const subText = this.translateTxt.LABEL.SUB_CATEGORY_NAME;
      if (!this.mainCategoryInfo) {
        const bool = this.modalService.messageAlert(mainCategoryText);
        return bool;
      }

      if ( !this.subCategoryInfo || !this.subCategoryId) {
        const bool = this.modalService.messageAlert(subText);
        this.subCate.nativeElement.focus();
        return bool;
      }

      if (!this.proName) {
        const bool = this.modalService.messageAlert(this.translate.instant('Register5100.MESSAGE.ENTER_PRODUCT_NAME'));
        return bool;
      }

      if (!this.resourceFileInfoId) {
        const bool = this.modalService.messageAlert(this.translate.instant('Register5100.MESSAGE.SELECT_PRODUCT_IMAGE'));
        return bool;
      }

      return true;
  }

  inquirySubCategory() {
    this.dataService.inquirySubCategoryList().then(response => {
      this.subCatListTrm = response;
    });
  }

  // upload img

  public onSelect(ev: SelectEvent): void {
    ev.files.forEach((file: FileInfo) => {
      if (file.rawFile) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.imagePreviews = { src: String(reader.result) };
        };

        reader.readAsDataURL(file.rawFile);
      }
    });

  }

  public onRemove(ev: RemoveEvent): void {
    if ( this.resourceFileInfoId !== undefined) {
      ev.data = {
        resourceFileInfoId: this.resourceFileInfoId
      };
    }

    ev.files.forEach((file: FileInfo) => {
      this.imagePreviews = null;
    });

  }

  public onClear(ev: ClearEvent): void {
    this.imagePreviews = null;
  }

  successEventHandler(e: SuccessEvent) {
    console.log('response file update', e);
    const responseData = e.response.body;
    if (responseData) {
      if  (responseData.header.result === true) {
        this.resourceFileInfoId = responseData.body.id;
        const url = e.response.body.body.imageURL;
      }
    }
  }

  uploadEventHandler(e: UploadEvent) {
    console.log(e);
    e.data = {
      userID : 1,
      productId: 1,
      fileImageURL: environment.bizServer.server ,
      file : e.files[0].rawFile
    };
  }

}
