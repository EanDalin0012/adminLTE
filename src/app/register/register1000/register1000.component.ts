import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BTN_ROLES, SUPPLYING_STATUS_CODE } from 'src/app/shared/constants/common.const';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/shared/services/data.service';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, SelectableSettings, RowClassArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { MainCategory } from 'src/app/shared/class/class-main-category';
import { IDDto } from 'src/app/shared/class/class-id';
import { DeleteList } from 'src/app/shared/class-tr/classtr-delete-list-req';
import { Register1100Component } from '../register1100/register1100.component';
import { Register1200Component } from '../register1200/register1200.component';
import { RequestData } from 'src/app/shared/class-tr/classtr-req-data';
import { MainCategoryList } from 'src/app/shared/class-tr/classtr-main-category-list';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-register1000',
  templateUrl: './register1000.component.html',
  styleUrls: ['./register1000.component.css']
})
export class Register1000Component implements OnInit {
  public info = true;
  public buttonCount = 5;
  public type: 'numeric' | 'input' = 'numeric';
  public previousNext = false;
  public pageSizes: any[] = [10, 20, 30, 50, 100];
  public group: any[] = [{
    field: ''
  }];
  public data: any[];
  constructor(
    private serverService: ServerService,
    private modalService: ModalService,
    private translate: TranslateService,
    private dataService: DataService
  ) {
    this.setSelectableSettings();
    // this.allData = this.allData.bind(this);
  }

public listData: any[];
public multiple = false;
public allowUnsort = true;
public height = 'auto';
search: string;
public sort: SortDescriptor[] = [{
  field: 'id',
  dir: 'asc'
}];

// grid datas
public gridView: GridDataResult;
public gridData: any[];
recordsTotal: any;
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
list: Array<MainCategory>;
@ViewChild('container', {static: true, read: ViewContainerRef })
public containerRef: ViewContainerRef;
// selection row get data
public mySelection: any[] = [];
public pageSize = 10;
public skip = 0;
statusSuppling = SUPPLYING_STATUS_CODE;
IDList = new Array<IDDto>();
deleteList: DeleteList;
modal;
totalRecord: number;
public selectedCallback = (args) => args.dataItem;

  ngOnInit() {
    const url = (window.location.href).split('/');
    console.log(url);
    this.dataService.visitMessage(url[5]);
    this.search = '';
    this.inquiry();

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

 // <div class="example-config"> 부분 사용시 펑션
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
      content: Register1100Component,
      message: {},
      modalClass: ['testingabc'],
      callback: async (res) => {
        console.log('res', res);
        if (await res.close === BTN_ROLES.SAVE) {
            this.inquiry();
        }
      },
    });

   }


  async clickEdit(dataItem) {
    if ( dataItem ) {
      this.modalService.open({
          content: Register1200Component,
          message: dataItem,
          modalClass: [''],
          callback: async ( res ) => {
            if (await res.close === BTN_ROLES.EDIT) {
              this.inquiry();
            }
          },
        });
    }
  }

  loadData() {
    this.gridView = {
      data: orderBy(this.gridData.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.gridData.length
    };
    this.recordsTotal = 10;
  }

  inquiry() {
    const trReq = new RequestData();
    const api = '/api/main_category/getList';
    console.log('post request', trReq);
    this.serverService.HTTPRequest(api, trReq).then(resp => {
      console.log(resp);
      const response   = resp as MainCategoryList;
      if (this.serverService.checkResponse(response.header)) {
        this.list        = response.body;
        this.data        = this.list;
        this.gridData    = this.list;
        this.totalRecord = this.list.length;
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
                  name += mainCategoryName  + ', ';
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
    console.log('delete list', this.deleteList);
    const trReq = new DeleteList();
    trReq.body.list   = this.IDList;
    console.log(trReq);
    const api   = '/api/main_category/deleteByListId';
    console.log(trReq);
    this.serverService.HTTPRequest(api, trReq).then(rest => {
      const response = rest as ResponseData;
      if ( this.serverService.checkResponse(response.header) === true) {
        this.inquiry();
      }
    });
  }

  getMainCategoryNameById(val: number): string {
    let name = '';
    this.list.forEach(element => {
      if (element.id === val) {
        name = element.mainCategoryName + '(' + element.id + ')';
      }
    });
    return name;
  }

  onClickBtnSearch() {
    this.search = undefined;
    this.totalRecord = this.list.length;
    this.loadingData(this.list);
  }

  onChangeSearch(val) {
    console.log(val);
    const resultSearch  = this.list.filter( data => data.mainCategoryName.toLowerCase().includes(val));
    this.totalRecord    = resultSearch.length;
    this.loadingData(resultSearch);
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
