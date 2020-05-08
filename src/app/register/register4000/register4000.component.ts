import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/shared/Class/class-suplier';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Register4100Component } from '../register4100/register4100.component';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { Register4200Component } from '../register4200/register4200.component';
import { RequestData } from 'src/app/shared/class-tr/classtr-req-data';
import { SupplierList } from 'src/app/shared/class-tr/classtr-res-supplier-list';
import { DeleteList } from 'src/app/shared/class-tr/classtr-delete-list-req';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { IDDto } from 'src/app/shared/class/class-id';

@Component({
  selector: 'app-register4000',
  templateUrl: './register4000.component.html',
  styleUrls: ['./register4000.component.css']
})
export class Register4000Component implements OnInit {
  public data: any[];

  supList: Supplier[];
  // grid info
  public info = true;
  public buttonCount = 5;
  public type: 'numeric' | 'input' = 'numeric';
  public previousNext = false;
  public gridData: any[];
  public multiple = false;
  public allowUnsort = true;
  public height = '450';
  public pageSize = 10;
  public pageSizes: any[] = [10, 20, 30, 50, 100];
  public sort: SortDescriptor[] = [{
    field: 'id',
    dir: 'asc'
  }];
  public gridView: GridDataResult;
  public checkboxOnly = false;
  public mode = 'multiple';
  public selectableSettings: SelectableSettings;
  gridheight = screen.height * 0.5;
  public mySelection: any[] = [];
  public skip = 0;
  public selectedCallback = (args) => args.dataItem;
  // end grid info

  search: string;
  recordsTotal: number;
  listId = new Array<IDDto>();

  constructor(
    private serverService: ServerService,
    private modalService: ModalService,
    private translate: TranslateService,
    private dataService: DataService
  ) {
    this.setSelectableSettings();
  }

  ngOnInit() {
    const url = (window.location.href).split('/');
    console.log(url);
    this.dataService.visitMessage(url[5]);
    this.search = '';
    this.inquiry();
  }
  // grid function
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }

  public setSelectableSettings() {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'multiple'
    };

  }

  private paging(): void {
    this.gridView = {
      data: this.gridData.slice(this.skip, this.skip + this.pageSize),
      total: this.gridData.length
    };
  }

  loadData() {
    this.gridView = {
      data: orderBy(this.gridData.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.gridData.length
    };
    this.recordsTotal = 10;
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
  rowclick(event) {
    if (event.dataItem.Id) {
     // this.disabled = false;
    }
   }

   loadingData(data) {
    this.gridView = {
      data: orderBy(data.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: data.length
    };
    this.recordsTotal = data.length;
  }
  // end grid function
  // function need use

  onClickBtnSearch() {
    this.search = undefined;
  }

  clickEdit(dataItem) {
    if ( dataItem ) {
      this.modalService.open({
          content: Register4200Component,
          message: dataItem,
          callback: async ( res ) => {
            if (await res.close === BTN_ROLES.EDIT) {
              this.inquiry();
            }
          },
        });
    }
  }
  onClickDelete() {
    console.log(this.mySelection);
    if (this.mySelection) {
      if (this.mySelection.length === 0) {
        this.modalService.alert({
          content: this.translate.instant('COMMON.LABEL.SELECT_ROW_FOR_DELETE'),
          btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
          modalClass: [],
          callback: rest => {
          }
        });
      } else {
        if ( this.mySelection.length > 0) {
          this.listId = [];
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
              this.listId.push({
                id: Number(element)
              });
              ++i;
            });

          console.log(this.listId);

          this.modalService.confirm({
              content: 'Do you want to delete main category name : ' + name,
              lBtn: this.translate.instant('COMMON.BUTTON.NO'),
              rBtn: this.translate.instant('COMMON.BUTTON.YES'),
              modalClass: ['pop_confirm'],
              callback: ( rest) => {
                if ( rest.text === this.translate.instant('COMMON.BUTTON.YES')) {
                  this.postDelete();
                }
              }

          });
        }
      }
    }
  }

  onClickRegister() {
    this.modalService.open({
      content: Register4100Component,
      message: {},
      callback: async (res) => {
        console.log('res', res);
        if (await res.close === BTN_ROLES.SAVE) {
            this.inquiry();
        }
      },
    });
  }

  inputSearch(event) {
    console.log('input search', event);
  }

  getMainCategoryNameById(val: number): string {
    let name = '';
    this.supList.forEach(element => {
      if (element.id === val) {
        name = element.supName + '(' + element.id + ')';
      }
    });
    return name;
  }

  inquiry() {
    const trReq = new RequestData();
    const api = '/res/supplier/getList';
    this.serverService.HTTPRequest(api, trReq).then(res => {
      const response = res as SupplierList;
      if (this.serverService.checkResponse(response.header)) {
        this.supList = response.body;
        this.data    = this.supList;
        this.gridData = this.supList;
        // this.totalRecord = this.list.length;
        this.loadingData(this.gridData);
      }
      console.log('response', this.supList);
    });
  }

  postDelete() {
    const request = new DeleteList();
    request.body.list = this.listId;
    const api = '/res/supplier/updateStatus';
    this.serverService.HTTPRequest(api, request).then(resp => {
      const response = resp as ResponseData;
      if (this.serverService.checkResponse(response.header)) {
        this.inquiry();
      }
    });
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
