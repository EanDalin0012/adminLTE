import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Register5100Component } from '../register5100/register5100.component';
import { Register5200Component } from '../register5200/register5200.component';

@Component({
  selector: 'app-register5000',
  templateUrl: './register5000.component.html',
  styleUrls: ['./register5000.component.css']
})
export class Register5000Component implements OnInit {

  public info = true;
  public buttonCount = 5;
  public type: 'numeric' | 'input' = 'numeric';
  public previousNext = false;
  public pageSizes: any[] = [10, 20, 30, 50, 100];

  public listData: any[];
  public multiple = false;
  public allowUnsort = true;
  public height = 'auto';
  search: string;
  public sort: SortDescriptor[] = [{
    field: 'Id',
    dir: 'asc'
  }];

  // grid datas
  public gridView: GridDataResult;
  public gridData: any[];
  recordsTotal: any;
  // check setting
  public checkboxOnly = true;
  public mode = 'multiple';
  public selectableSettings: SelectableSettings;
  userInfo: any;
  ///////////
  viewText: any;
  gridheight = screen.height * 0.5;
  // public gridView: any[] = sampleCustomers;
  @ViewChild('container', {static: true, read: ViewContainerRef })
  public containerRef: ViewContainerRef;
  // selection row get data
  public mySelection: any[] = [];
  public selectedCallback = (args) => args.dataItem;
  public pageSize = 10;
  public skip = 0;

  constructor(
      private serverService: ServerService,
      private modalService: ModalService,
      private dataService: DataService,
    ) { }

  ngOnInit() {
      const url = (window.location.href).split('/');
      this.dataService.visitMessage(url[5]);
      this.search = '';
      // this.gridData = customers;
      this.gridData = customers;
      this.loadData();
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
        content: Register5100Component,
        message: {},
        callback: async (res) => {
          console.log('res', res);
          if (await res.close === BTN_ROLES.SAVE) {

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

}

export const customers = [{
  Id: '1',
  productName: 'Key board',
  productCategory: 'Electonice',
  price: '10',
  unitPrice: '7',
  discount: '1',
  afterDiscount: '9',
  description: 'from china',
}, {
  Id: '2',
  productName: 'Flash 3.0',
  productCategory: 'Electonice',
  price: '10',
  unitPrice: '7',
  discount: '1',
  afterDiscount: '9',
  description: 'from china',
}];
