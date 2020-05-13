import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Register5100Component } from '../register5100/register5100.component';
import { Register5200Component } from '../register5200/register5200.component';
import { RequestData } from 'src/app/shared/class-tr/classtr-req-data';
import { DeleteList } from 'src/app/shared/class-tr/classtr-delete-list-req';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { Product } from '../../shared/class/class-product';
import { ProductDetail } from '../../shared/class/class-product-detial';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Register5110Component } from '../register5110/register5110.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register5000',
  templateUrl: './register5000.component.html',
  styleUrls: ['./register5000.component.css']
})
export class Register5000Component implements OnInit {
  public data: any[];

  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService,
    private dataService: DataService,
    private title: Title
  ) {
    this.setSelectableSettings();
    this.title.setTitle('Product');
  }
  public info = true;
  public buttonCount = 5;
  public type: 'numeric' | 'input' = 'numeric';
  public previousNext = false;
  public gridData: any[];
  disabled: boolean;
  public multiple = false;
  public allowUnsort = true;
  search: string;
  public height = '450';
  public pageSize = 10;
  public pageSizes: any[] = [10, 20, 30, 50, 100];
  public sort: SortDescriptor[] = [{
    field: 'id',
    dir: 'asc'
  }];

  deleteListById: any[];

  public gridView: GridDataResult;
  recordsTotal: any;
  public checkboxOnly = false;
  public mode = 'multiple';
  public selectableSettings: SelectableSettings;

  gridheight = screen.height * 0.5;
  @ViewChild('container', {static: true, read: ViewContainerRef })
  public containerRef: ViewContainerRef;
  public mySelection: any[] = [];
  public skip = 0;
  list: ProductDetail[];
  totalRecord: number;
  public selectedCallback = (args) => args.dataItem;
  bizServer = environment.bizServer.server;
  url: string;
  api = '/api/file/images/resources/';
  ngOnInit() {
    this.url = environment.bizServer.server + this.api;
    const url = (window.location.href).split('/');
    this.dataService.visitMessage(url[5]);

    this.inquiry();
    this.translate.get('COMMON.LABEL').subscribe((res) => {
     console.log(res);
    });
    this.disabled = true;
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

  DELETE() {
    this.requestDelete(this.mySelection);
  }

  check(id) {
    console.log(id);
  }

  REGISTER() {
    this.modalService.open({
          content: Register5100Component,
          message: {},
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
          content: Register5200Component,
          message: dataItem,
          callback: async ( res ) => {
            console.log('res', res);
            if (await res.close === BTN_ROLES.EDIT) {
              this.inquiry();
            }
          },
        });
    }
  }

  click(Id) {
     console.log(Id);
  }

  rowclick(event) {
    const id = event.dataItem.Id;
    console.log(this.mySelection, id);
    this.disabled = false;
  }

  loadingData(list: any[]) {
      this.gridView = {
        data: orderBy(list.slice(this.skip, this.skip + this.pageSize), this.sort),
        total: list.length
      };
      this.recordsTotal = 10;
  }

  public setSelectableSettings() {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'multiple'
    };

  }

  inquiry() {
    const trReq = new RequestData();
    const api = '/api/product/getProductDetailsList';
    console.log('trReq data', trReq);
    this.serverService.HTTPRequest(api, trReq).then(response => {
      console.log('response response', response);
      if (this.serverService.checkResponse(response.header)) {
        this.list         = response.body.list;
        this.data         = this.list;
        this.gridData     = this.list;
        this.totalRecord  = this.list.length;
        this.loadingData(this.gridData);
      }
    });
  }

  onClickDelete() {
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
          this.deleteListById = [];
          let name = '';
          let i = 0;
          this.mySelection.forEach(element => {
              const companyName = this.getMainCategoryNameById(element);
              if (companyName !== '') {
                if (i === this.mySelection.length - 1) {
                  name += companyName;
                } else {
                  name += companyName   + ', ';
                }
              }
              this.deleteListById.push({
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
                  this.requestDelete(this.deleteListById);
                }
              }

          });
        }
      }
    }
  }

  requestDelete(deleteListById: any[]) {
    if ( deleteListById.length > 0) {
      const trReq      = new DeleteList();
      const api        = '/api/company_access/updateListByID';
      console.log(trReq);
      this.serverService.HTTPRequest(api, trReq).then(rest => {
        console.log(rest);
        const response = rest as ResponseData;
        if ( this.serverService.checkResponse(response.header) === true) {
          this.inquiry();
        }
      });
    }

  }

  onClickBtnSearch() {
    this.search = undefined;
    this.loadingData(this.list);
  }

  inputSearch(event) {
    console.log(event);
    if (event) {
      this.search = event.target.value;
      const searchResult = this.gridData.filter(data => data.name.toLowerCase().includes(event.target.value));
      this.totalRecord = searchResult.length;
      this.loadingData(searchResult);
    }
  }

  getMainCategoryNameById(val: number): string {
    let name = '';
    this.list.forEach(element => {
      if (element.productId === val) {
        name = element.productName + '(' + element.productId + ')';
      }
    });
    return name;
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

  addImage(dataItem) {
    if ( dataItem ) {
      this.modalService.open({
          content: Register5110Component,
          message: dataItem,
          callback: async ( res ) => {
            console.log('res', res);
            if (await res.close === BTN_ROLES.EDIT) {
              this.inquiry();
            }
          },
        });
    }
  }

}
