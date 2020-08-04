import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/shared/services/server.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DataService } from 'src/app/shared/services/data.service';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { Register3100Component } from '../register3100/register3100.component';
import { BTN_ROLES } from 'src/app/shared/constants/common.const';
import { Register3200Component } from '../register3200/register3200.component';
import { DeleteList } from 'src/app/shared/class-tr/classtr-delete-list-req';
import { ResponseData } from 'src/app/shared/class-tr/classtr-res-data';
import { RequestData } from 'src/app/shared/class-tr/classtr-req-data';
import { CompanyList } from 'src/app/shared/class-tr/classtr-company-list';
import { Company } from 'src/app/shared/Class/class-company';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register3000',
  templateUrl: './register3000.component.html',
  styleUrls: ['./register3000.component.css']
})
export class Register3000Component implements OnInit {
  public data: any[];
  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService,
    private dataService: DataService,
    private titleService: Title
  ) {
    this.setSelectableSettings();
    this.titleService.setTitle('Company');
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
  list: Company[];
  totalRecord: number;
  public selectedCallback = (args) => args.dataItem;

  ngOnInit() {
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
          content: Register3100Component,
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
          content: Register3200Component,
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
    console.log(event);
    const id = event.dataItem.Id;
    console.log(this.mySelection, id);
    this.disabled = false;
  }

  loadingData(list: any[]) {
      this.gridView = {
        data: orderBy(list.slice(this.skip, this.skip + this.pageSize), this.sort),
        total: list.length
      };
      this.recordsTotal = list.length;
  }

  public setSelectableSettings() {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'multiple'
    };

  }

  inquiry() {
    const trReq = new RequestData();
    const api = '/api/company_access/getList';
    console.log('trReq data', trReq);
    this.serverService.HTTPRequest(api, trReq).then(resp => {
      console.log(resp);
      const response = resp as CompanyList;
      this.list    = response.body.list;
      this.data    = this.list;
      this.gridData = this.list;
      this.totalRecord = this.list.length;
      this.loadingData(this.gridData);
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
    console.log(deleteListById);
    if ( deleteListById.length > 0) {
      const trReq      = new DeleteList();
      trReq.body.list   = deleteListById;
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
      let searchResult = this.gridData.filter(data => data.name.toLowerCase().includes(event.target.value));
      this.totalRecord = searchResult.length;
      this.loadingData(searchResult);
    }
  }

  getMainCategoryNameById(val: number): string {
    let name = '';
    this.list.forEach(element => {
      if (element.id === val) {
        name = element.name + '(' + element.id + ')';
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

  gridCheckBoxClick(dataItem) {
    let trmArray = [];
    if (this.mySelection.length > 0) {
      this.mySelection.forEach((value, index) => {
        console.log(dataItem.id);
        console.log(value.id);
        // push array
        if (dataItem.id !== value.id) {
          this.mySelection.push({id: dataItem.id});
        }
        // splice array
        if (dataItem.id === value.id) {
          console.log(this.mySelection.splice(0, index));
          console.log('ddd');
        }

      });
    } else {
      this.mySelection.push({id: dataItem.id});
    }
  }

}
