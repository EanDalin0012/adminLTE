import { Component, OnInit } from '@angular/core';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { ImportProductDetails } from 'src/app/shared/class/class-import-product-detail';
import { DataService } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
const sortItems = [
  {
    key: 'Product Name',
    value: '01'
  },
  {
    key: 'Company Name',
    value: '02'
  },
  {
    key: 'Supplier Name',
    value: '03'
  }
];

@Component({
  selector: 'app-register5000',
  templateUrl: './register5000.component.html',
  styleUrls: ['./register5000.component.css']
})
export class Register5000Component implements OnInit {

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
  // end grid info\

  recordsTotal: number;
  search: string;
  list: ImportProductDetails[];
  sortItems: any[];
  sortItem;

    constructor(
      private dataService: DataService,
      private router: Router,
      private title: Title,
      private translate: TranslateService
    ) {
      this.title.setTitle(this.translate.instant('Home9000.LABEL.IMPORT_PRODUCT'));
      this.setSelectableSettings();
    }

  ngOnInit() {
  this.sortItems = sortItems;
  this.sortItem  = this.sortItems[0];

  const url = (window.location.href).split('/');
  console.log(url);
  this.dataService.visitMessage(url[5]);
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

  loadingData(data) {
  if (data) {
    this.gridView = {
      data: orderBy(data.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: data.length
    };
    this.recordsTotal = data.length;
  }
  }
  // end grid function

  onClickDelete() {

  }

  onClickRegister() {

  }

  onClickEdit(dataItem) {
  console.log(dataItem);
  }

  onClickBtnSearch() {

  }

  rowclick(event) {
  console.log(event);
  }

  inputSearch(event) {
  console.log(event);
  }

  inquiry() {
  this.list = importProductDetialList;
  this.loadingData(this.list);
  }

  onClickImportNewItem() {
  this.router.navigate(['/main/register/import-product']);
  }

}

const importProductDetialList: ImportProductDetails[] = [
{
  id: 1,
  productId: 1,
  productName: 'productName 1',
  supplierId: 1,
  supplierName: 'Supplier 1',
  companyId: 1,
  companyName: 'Company 1',
  quantity: 2,
  price: 2,
  discount: 0,
  total: 4,
  currencyCode: 'USD',
  description: 'Import Product 1',
  createBy: 1,
  modifyBy: 1,
  createDate: '20201010',
  modifyDate: '20201010',
  status: '01'
},
{
  id: 2,
  productId: 2,
  productName: 'productName 2',
  supplierId: 2,
  supplierName: 'Supplier 2',
  companyId: 2,
  companyName: 'Company 2',
  quantity: 2,
  price: 2,
  discount: 0,
  total: 4,
  currencyCode: 'USD',
  description: 'Import Product 2',
  createBy: 1,
  modifyBy: 1,
  createDate: '20201010',
  modifyDate: '20201010',
  status: '01'
}
];
