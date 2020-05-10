import { Component, OnInit, ViewChild } from '@angular/core';
import { MainCategory } from 'src/app/shared/Class/class-main-category';
import { ServerService } from 'src/app/shared/services/server.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { MainCategoryList } from 'src/app/shared/class-tr/classtr-main-category-list';
import { SubCategoryRequest } from 'src/app/shared/class-tr/classtr-req-sub-category';
import { BTN_ROLES, LOGO_FILE_EXT } from 'src/app/shared/constants/common.const';
import { SubCategory } from '../../shared/class/class-sub-category';
import { DataService } from '../../shared/services/data.service';
import { RequestDataService } from '../../shared/services/get-data.service';
import { FileRestrictions, FileInfo, SelectEvent, RemoveEvent, ClearEvent, SuccessEvent, UploadEvent } from '@progress/kendo-angular-upload';
import { Utils } from '../../shared/utils/utils.static';
import { environment } from 'src/environments/environment';
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

  subCategoryName: string;
  description: string;
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
  server = environment.bizServer.server;
  content = environment.bizServer.context;
  port = environment.bizServer.port;

  totalserver = this.server + ":" + this.port + '/' + this.content;
  public uploadSaveUrl = this.totalserver + '/upload/companyProfile';

  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService,
    private dataService: RequestDataService
  ) { }

  ngOnInit() {
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
    // this.modal.close( {close: BTN_ROLES.CLOSE});
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
    if (value) {
      this.subCategoryInfo = undefined;
      this.valuePrimitiveSubCategory = true;
      this.subCategoryList = [];
      this.subCatListTrm.forEach(element => {
        console.log(value, element.mainCategoryId);
        if (value === element.mainCategoryId) {
          this.subCategoryList.push(element);
        }
      });
      this.ngClassList = 'active-input';
    } else {
      this.ngClassList = '';
    }
  }

  onClickRegister() {
    if (this.isValid() === true) {
      const trReq                = new SubCategoryRequest();
      trReq.body.mainCategoryId  = this.mainCategoryInfo.id;
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
      } else if (this.subCategoryName === undefined) {
        const bool = this.modalService.messageAlert(subText);
        this.subCate.nativeElement.focus();
        return bool;
      } else {
        return true;
      }
  }

  inquirySubCategory() {
    this.dataService.inquirySubCategoryList().then(response => {
      // this.subCategoryList = response;
      this.subCatListTrm = response;
      console.log('sun category response', this.subCatListTrm);
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
    ev.files.forEach((file: FileInfo) => {
      this.imagePreviews = null;
    });
  }

  public onClear(ev: ClearEvent): void {
    this.imagePreviews = null;
  }

  successEventHandler(e: SuccessEvent) {
    if (e.response.headers) {
      // this.userInfo = [];
      // this.userInfo = Utils.getSecureStorage('USER_INFO');
      // this.userInfo.corporateUserProfileImageURL = e.response.body.body.corporateUserProfileImageURL;
      // this.util.setSecureStorage('USER_INFO', this.userInfo);
      // this.dataService.companyMessage(e.response.body.body.corporateUserProfileImageURL);
      // this.dataService.ImageMessage(e.files[0]);
    }
  }

  uploadEventHandler(e: UploadEvent) {
    e.data = {
      userID : this.userinfo.userID,
      customerNo: this.userinfo.customerNo,
      corporateUserProfileImageURL: this.userinfo.corporateUserProfileImageURL,
      userFile : e.files[0].rawFile
    };
  }

  public completeEventHandler(val) {
    // this.log(`All files processed`);
  }

}
