import { Component, OnInit } from '@angular/core';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { ImportProductDetails } from 'src/app/shared/class/class-import-product-detail';
import { Supplier } from 'src/app/shared/Class/class-suplier';
import { Company } from 'src/app/shared/Class/class-company';
import { Product } from 'src/app/shared/class/class-product';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { CURRENCY_CODE_LIST } from 'src/app/shared/constants/common.const';
import { ImportPoduct } from 'src/app/shared/class/class-import-product';
import { ServerService } from 'src/app/shared/services/server.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DataService } from 'src/app/shared/services/data.service';
import { RequestDataService } from 'src/app/shared/services/get-data.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Utils } from 'src/app/shared/utils/utils.static';
import { ImportProductRequest } from 'src/app/shared/class-tr/classtr-import-product-req';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';

@Component({
  selector: 'app-register5100',
  templateUrl: './register5100.component.html',
  styleUrls: ['./register5100.component.css']
})
export class Register5100Component implements OnInit {

  focus: string;
  public info = true;
  public buttonCount = 5;
  public type: 'numeric' | 'input' = 'numeric';
  public previousNext = false;
  public gridData: any[];
  public multiple = false;
  public allowUnsort = true;
  public height = '300';
  public pageSize = 10;
  public pageSizes: any[] = [10, 20, 30, 50, 100];
  public sort: SortDescriptor[] = [{
    field: 'productId',
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

  // importer
  importProductDetailsList = new Array<ImportProductDetails>();
  suppliertList: Supplier[] = [];
  compList: Company[] = [];

  supplierInfo: Supplier;
  defaultSupplierInfo = {
    id: 0,
    supName: 'Select Supplier',
    supContact: null,
    supContactTwo: null,
    supEmail: null,
    description: null,
    createBy: null,
    modifyBy: null,
    createDate: null,
    modifyDate: null,
    status: null
  };


  proList: Product[] = [];
  productInfo: Product;
  defaultProductInfo: Product = {
    proId: null,
    subCateId: null,
    companyId: null,
    proName: 'Select Product',
    price: null,
    unitPrice: null,
    discount: null,
    afterDiscountPrice: null,
    description: null,
    createBy: null,
    modifyBy: null,
    createDate: null,
    modifyDate: null,
    status: null
  };


  companyInfo: Company;
  defaultCompanyInfo: Company = {
    id: 0,
    name: 'Select Company',
    email: null,
    contact: null,
    address: null,
    description: null,
    createBy: null,
    createDate: null,
    modifyBy: null,
    modifyDate: null,
    status: null
  };

  description: string;
  qty: number;
  total: number;
  price: number;
  discount: number;

  recordsTotal: number;
  defaultItemProd;

  valuePrimitivePro: boolean;
  valuePrimitiveCompany: boolean;
  valuePrimitiveSupplier: boolean;

  filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith'
  };

  valuePrimitive: boolean;
  currencyList = CURRENCY_CODE_LIST;
  currencyCode = CURRENCY_CODE_LIST[0];

  ngClassProduct: string;
  ngClassCompany: string;
  ngClassSupplier: string;
  discountCss: string;

  importProductList: ImportPoduct[] = [];
  constructor(
      private serverService: ServerService,
      private modalService: ModalService,
      private dataService: DataService,
      private requestDataService: RequestDataService,
      private translate: TranslateService,
      private title: Title,
      private router: Router
    ) {
      this.title.setTitle(this.translate.instant('Home9100.LABEL.IMPORT_NEW_PRODUCT'));
      this.setSelectableSettings();
    }

ngOnInit() {
  this.focus = '';
  this.defaultItemProd = 'select product ..';
  this.valuePrimitivePro = true;
  const url = (window.location.href).split('/');
  this.dataService.visitMessage(url[5]);
  this.gridData = [];
  this.loadData();
  this.inquiryCompanyList();
  this.inquirySupplierList();
  this.proList    = productList;
  this.importProductDetailsList = [];

  this.valuePrimitivePro      = true;
  this.valuePrimitiveCompany  = true;
  this.valuePrimitiveSupplier = true;
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

focusProductItem() {
  this.proList    = productList;
}

async onClickEdit(dataItem) {
  if ( dataItem ) {
    // set value to product information
    this.proList.forEach(element => {
        if (element.proId === dataItem.productId) {
          this.productInfo = element;
          this.ngClassProduct = 'active-input';
        }
    });

    // set value to company information
    this.compList.forEach(element => {
      if (dataItem.companyId === element.id) {
        this.companyInfo = element;
        this.ngClassCompany = 'active-input';
      }
    });

    // set value to supplier information
    this.suppliertList.forEach(element => {
      if (element.id === dataItem.supplierId) {
        this.supplierInfo = element;
        this.ngClassSupplier = 'active-input';
      }
    });

    this.qty          = dataItem.quantity;
    this.price        = dataItem.price;
    this.total        = dataItem.total;
    this.discount     = dataItem.discount;
    this.description  = dataItem.description;
    this.discountCss  = 'active-input';
  }
}

onClickDelet(dataItem) {
  this.importProductDetailsList = this.importProductDetailsList.splice(dataItem.id - 1);
  this.loadingData(this.importProductDetailsList);
}

addNewItems() {
  let isTheSameProduct = false;
  if (this.importProductDetailsList.length > 0) {
    this.importProductDetailsList.forEach(element => {
      if (this.productInfo.proId === element.productId) {
        isTheSameProduct = true;
        this.message(this.translate.instant('Home9100.LABEL.THE_SAME_PRODUCT')).then(bool => {});
        return;
      }
    });
  }

  if (this.isValid() === true && isTheSameProduct === false) {
    const userInfo = Utils.getUserInfo();
    const index = this.importProductDetailsList.length + 1;
    this.importProductDetailsList.push({
      id: index,
      productId: this.productInfo.proId,
      productName: this.productInfo.proName,
      supplierId: this.supplierInfo.id,
      supplierName: this.supplierInfo.supName,
      companyId: this.companyInfo.id,
      companyName: this.companyInfo.name,
      quantity: this.qty,
      price: this.price,
      discount: this.discount,
      total: this.total,
      currencyCode: this.currencyCode.currencyCode,
      description: this.description,
      createBy: userInfo.id,
      modifyBy: userInfo.id,
      createDate: '',
      modifyDate: '',
      status: ''
    });
    this.loadingData(this.importProductDetailsList);
    // reset form
    this.productInfo      = undefined;
    this.companyInfo      = undefined;
    this.supplierInfo     = undefined;
    this.qty              = undefined;
    this.price            = undefined;
    this.discount         = undefined;
    this.total            = undefined;
    this.description      = undefined;
    this.ngClassProduct   = '';
    this.ngClassCompany   = '';
    this.ngClassSupplier  = '';
    this.discountCss      = '';
  }
}

valueChangeProduct(prodId) {
  this.valuePrimitivePro = false;
  if (prodId) {
    if (prodId.proId === null) {
      this.ngClassProduct = '';
    } else {
      this.proList.forEach(element => {
        if (prodId === element.proId) {
          this.productInfo = element;
          this.ngClassProduct = 'active-input';
        }
      });
    }
  }
}

valueChangeSupplier(supplierId: number) {
  this.valuePrimitiveSupplier = false;
  if (supplierId) {
    this.suppliertList.forEach(element => {
      if (supplierId === element.id) {
        this.supplierInfo = element;
        this.ngClassSupplier = 'active-input';
      }
    });
  }
}

valueChangeCompany(id) {
  this.valuePrimitiveCompany = false;
  if (id) {
    this.compList.forEach(element => {
      if (id === element.id) {
        this.companyInfo = element;
        this.ngClassCompany = 'active-input';
      }
    });
  }
}

registerImportProduct() {
  const request = new ImportProductRequest();
  const api = '';
  this.serverService.HTTPRequest(api, request).then(resp => {
    const response = resp as ResponseData;
    if (this.serverService.checkResponse(response.header)) {

    }
  });
}

btnDel(key: string) {
  switch (key) {
    case 'price':
      this.price = undefined;
      break;
    case 'qty':
      this.qty = undefined;
      break;
    case 'dis':
      this.discount = undefined;
      break;
    case 'total':
      this.total = undefined;
      break;
    case 'descr':
      this.description = undefined;
      break;
  }
}

inquiryCompanyList() {
    this.requestDataService.inquiryCompanyList().then(response => {
      if (response) {
        this.compList   = response;
      }
    });
}

inquirySupplierList() {
    this.requestDataService.inquirySupplierList().then(response => {
      if (response) {
        this.suppliertList = response;
      }
    });
}

isValid(): boolean {
  if (!this.productInfo || this.productInfo && ( this.productInfo.proId === 0 || this.productInfo.proId === null) ) {
    this.message(this.translate.instant('Home9100.LABEL.PLEASE_SELECT_PRODUCT')).then(bool => {});
    return false;
  }
  if (!this.companyInfo || this.companyInfo && ( this.companyInfo.id === 0 ||  this.companyInfo.id === null) ) {
    this.message(this.translate.instant('Home9100.LABEL.PLEASE_SELECT_COMPANY')).then(bool => {});
    return false;
  }
  if (!this.qty || this.qty === 0) {
    this.message(this.translate.instant('Home9100.LABEL.PLEASE_ENTER_QUANTITY')).then(bool => {
      this.focus = 'focusQty'
    });
    return false;
  }
  if (!this.price || this.price === 0) {
    this.message(this.translate.instant('Home9100.LABEL.PLEASE_ENTER_PRICE')).then(bool => {
      this.focus = 'focusPrice'
    });
    return false;
  }
  if ( !this.discount) {
    this.discount = 0;
    this.discountCss = 'active-input';
  }
  if (this.total === undefined) {
    this.message(this.translate.instant('Home9100.LABEL.PLEASE_CALCULATE_TOTAL_AMOUNT')).then(bool => {});
    return false;
  }
  if (!this.supplierInfo || this.supplierInfo && ( this.supplierInfo.id === 0 || this.supplierInfo.id === null) ) {
    this.message(this.translate.instant('Home9100.LABEL.PLEASE_SELECT_SUPPLIER')).then(bool => {});
    return false;
  }
  return true;

}

message(msg: string) {
  return new Promise((resolve) => {
    this.modalService.alert({
      content: msg,
      btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
      modalClass: [],
      callback: rest => {
        resolve(false);
      }
    });
  });
}

onClickCalc() {
  if (!this.qty || this.qty && this.qty === 0 ) {
    this.message(this.translate.instant('Home9100.LABEL.PLEASE_ENTER_QUANTITY')).then(bool => {
      this.focus = 'focusQty';
      return;
    });
  }
  if (!this.price || this.price && this.price === 0) {
    this.message(this.translate.instant('Home9100.LABEL.PLEASE_ENTER_PRICE')).then(bool => {
      this.focus = 'focusPrice';
      return;
    });
  }
  if (this.discount === undefined) {
   this.discount = 0;
   this.discountCss = 'active-input';
  }

  this.total = (this.price * this.qty)  - ((this.price * this.qty) * (this.discount / 100));
}

onClickSave() {
  const request = new ImportProductRequest();
  const userInfo = Utils.getUserInfo();
  this.importProductList  = [];
  if (this.importProductDetailsList.length > 0) {
    this.importProductDetailsList.forEach(element => {
      this.importProductList.push({
        id: 0,
        productId: element.productId,
        companyId: element.companyId,
        quantity: element.quantity,
        price: element.price,
        discount: element.discount,
        total: element.total,
        currencyCode: this.currencyCode.currencyCode,
        supplierId: element.supplierId,
        description: element.description,
        createBy: userInfo.id,
        modifyBy: userInfo.id,
        createDate: '',
        modifyDate: '',
        status: ''
      });
    });
  }

  request.body.list = this.importProductList;
  console.log(request);
  const url = '/api/import-product/save';
  this.serverService.HTTPRequest(url, request).then( response => {
    const res = response as ResponseData;
    if (this.serverService.checkResponse(res.header)) {
      this.router.navigate(['/main/home/list-import-product']);
    }
  });

}

}

export const productList: Product[] = [
  {
  proId: 1,
  subCateId: 1,
  companyId: 1,
  proName: 'Product 1',
  price: 12,
  unitPrice: 1,
  discount: 0,
  afterDiscountPrice: 1,
  description: '',
  createBy: 1,
  modifyBy: 1,
  createDate: '',
  modifyDate: '',
  status: ''
  },
  {
    proId: 2,
    subCateId: 1,
    companyId: 1,
    proName: 'Product 2',
    price: 12,
    unitPrice: 1,
    discount: 0,
    afterDiscountPrice: 1,
    description: '',
    createBy: 1,
    modifyBy: 1,
    createDate: '',
    modifyDate: '',
    status: ''
    },
    {
      proId: 3,
      subCateId: 1,
      companyId: 1,
      proName: 'Product 3',
      price: 12,
      unitPrice: 1,
      discount: 0,
      afterDiscountPrice: 1,
      description: '',
      createBy: 1,
      modifyBy: 1,
      createDate: '',
      modifyDate: '',
      status: ''
      }
];
