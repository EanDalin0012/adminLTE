import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { SubCategoryDetail } from 'src/app/shared/class/class-subcategoryDetail';
import { SUPPLYING_STATUS_CODE, BTN_ROLES } from 'src/app/shared/constants/common.const';
import { IDDto } from 'src/app/shared/class/class-id';
import { Register2100Component } from '../register2100/register2100.component';
import { Register2200Component } from '../register2200/register2200.component';
import { RequestData } from 'src/app/shared/class-tr/classtr-req-data';
import { SubCategoryDetailList } from 'src/app/shared/class-tr/classtr-sub-category-detail-list';
import { DeleteList } from 'src/app/shared/class-tr/classtr-delete-list-req';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-register2000',
  templateUrl: './register2000.component.html',
  styleUrls: ['./register2000.component.css']
})
export class Register2000Component implements OnInit {

  constructor(
    private serverService: ServerService,
    private modalService: ModalService,
    private translate: TranslateService,
    private dataService: DataService,
    private title: Title
  ) {
    this.setSelectableSettings();
    title.setTitle('Sub Category');
   }
public info = true;
public buttonCount = 5;
public type: 'numeric' | 'input' = 'numeric';
public previousNext = false;
public pageSizes: any[] = [10, 20, 30, 50, 100];

public listData: any[];
public multiple = false;
public allowUnsort = true;
public height = '450';
search: string;
public sort: SortDescriptor[] = [{
  field: 'subCatId',
  dir: 'asc'
}];

// grid datas
public gridView: GridDataResult;
public gridData: any[];
recordsTotal: any;
searchValue: any[];
// check setting
public checkboxOnly = false;
public mode = 'multiple';
public selectableSettings: SelectableSettings;
userInfo: any;
///////////
viewText: any;
userInfoSubscribe: any;
activateSubscribe: any;
activateCount: number;
gridheight = screen.height * 0.5;
list: Array<SubCategoryDetail>;
@ViewChild('container', {static: true, read: ViewContainerRef })
public containerRef: ViewContainerRef;
// selection row get data
public mySelection: any[] = [];
public pageSize = 10;
public skip = 0;
statusSuppling = SUPPLYING_STATUS_CODE;
IDList: IDDto[];
modal;
totalRecord: number;
public selectedCallback = (args) => args.dataItem;
public data: any[];

  ngOnInit() {
    this.search = '';
    const url = (window.location.href).split('/');
    console.log(url);
    this.dataService.visitMessage(url[5]);
    this.inquiryList();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }

private paging(): void {
  this.gridView = {
    data: this.gridData.slice(this.skip, this.skip + this.pageSize),
    total: this.gridData.length
  };
}

 pageChange({ skip, take }: PageChangeEvent) {
  this.skip = skip;
  this.pageSize = take;
  this.paging();
}

public rowCallback = (context: RowClassArgs) => {
    switch (context.dataItem.serviceStatusDesc) {
      case 'Deactivated':
        return {dormant: true};
        break;
      default:
        return {};
        break;
     }
}

  REGISTER() {
    this.modalService.open({
      content: Register2100Component,
      message: {},
      callback: async (res) => {
        if (await res.close === BTN_ROLES.SAVE) {
          this.modalService.showNotificationService();
          this.inquiryList();
        }
      },
    });
   }

   rowclick(event) {
    const id = event.dataItem.Id;
  }

  async clickEdit(dataItem) {
    if ( dataItem ) {
      this.modalService.open({
          content: Register2200Component,
          message: dataItem,
          callback: async ( res ) => {
            if (await res.close === BTN_ROLES.EDIT) {
              this.inquiryList();
            }
          },
        });
    }
  }

  openGuide() {

  }

  onChangeSearch(event) {
    this.searchValue = [];
    let searchResult = this.list.filter(data => data.subCatName.toLowerCase().includes(event));
    this.totalRecord = searchResult.length;
    this.loadingData(searchResult);
  }

  onClickBtnSearch() {
    this.search = '';
    this.loadingData(this.list);
  }

  loadData() {
    this.gridView = {
      data: orderBy(this.gridData.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.gridData.length
    };
    this.recordsTotal = 10;
  }

  clickSupplyingStatus(dataItem, remark: string) {
    if ( dataItem ) {
      this.modalService.open({
          content: '', // Home6110Component,
          message: dataItem,
          callback: async ( res ) => {
            if (await res.close === BTN_ROLES.EDIT) {
            }
          },
        });
    }
  }

  inquiryList() {
    const trReq = new RequestData();
    const api = '/api/sub_category/getList';
    this.serverService.HTTPRequest(api, trReq).then(rest => {
      const response = rest as SubCategoryDetailList;
      if (this.serverService.checkResponse(response.header)) {
        this.list         = response.body;
        this.data         = this.list;
        this.gridData     = this.list;
        this.totalRecord  = this.list.length;
        this.loadingData(this.list);
      }
    });
  }

  loadingData(data) {
    this.gridView = {
      data: orderBy(data.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.list.length
    };
    this.recordsTotal = 10;
  }

  onClickDelete() {
    if (this.mySelection) {
      if (this.mySelection.length === 0) {
        this.modalService.alert({
          content: this.translate.instant('COMMON.LABEL.SELECT_ROW_FOR_DELETE'),
          btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
          modalClass: [],
          callback: rest => {
            // resolve(tr);
          }
        });
      } else {
        if ( this.mySelection.length > 0) {
          this.IDList = [];
          let name = '';
          let i = 0;
          this.mySelection.forEach(element => {
              const mainCategoryName = this.getMainCategoryNameById(element);
              if (mainCategoryName !== '') {
                if (i === this.mySelection.length - 1) {
                  name += mainCategoryName;
                } else {
                  name += mainCategoryName + ', ';
                }
              }
              this.IDList.push({
                id: Number(element)
              });
              ++i;
            });

          this.modalService.confirm({
              content: 'Do you want to delete main category name : ' + name,
              lBtn: this.translate.instant('COMMON.BUTTON.NO'),
              rBtn: this.translate.instant('COMMON.BUTTON.YES'),
              modalClass: ['pop_confirm'],
              callback: ( rest) => {
                if ( rest.text === this.translate.instant('COMMON.BUTTON.YES')) {
                  this.requestDelete();
                }
              }

          });
        }
      }
    }
  }

  requestDelete() {
    const trReq = new DeleteList();
    trReq.body.list  = this.IDList;
    const api = '/api/sub_category/deleteByListID';
    this.serverService.HTTPRequest(api, trReq).then(rest => {
      const response = rest as ResponseData;
      if ( this.serverService.checkResponse(response.header) === true) {
        this.modalService.showNotificationService();
        this.inquiryList();
      }
    });
  }

  getMainCategoryNameById(val: number): string {
    let name = '';
    this.list.forEach(element => {
      if (element.subCatId === val) {
        name = element.subCatName;
      }
    });
    return name;
  }

  public setSelectableSettings() {

    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'multiple'
    };
  }

  public save(component): void {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;

    let altIdx = 0;
    rows.forEach((row) => {
        if (row.type === 'data') {
            if (altIdx % 2 !== 0) {
                row.cells.forEach((cell) => {
                    cell.background = '#aabbcc';
                });
            }
            altIdx++;
        }
    });
    component.save(options);
  }

}
