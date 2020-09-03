import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../../shared/services/server.service';
import { UserDataRequest } from 'src/app/shared/class-tr/classtr-req-user-data';
import { UserDataResponse } from '../../shared/class-tr/classtr-res-user-data';
import { UserInfo } from '../../shared/class/class-user-info';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, SelectableSettings, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { ModalService } from '../../shared/services/modal.service';
import { User1100Component } from '../user1100/user1100.component';
import { BTN_ROLES } from '../../shared/constants/common.const';

@Component({
  selector: 'app-user1000',
  templateUrl: './user1000.component.html',
  styleUrls: ['./user1000.component.css']
})
export class User1000Component implements OnInit {
  // gride data declearation
  public info = true;
  public buttonCount = 5;
  public type: 'numeric' | 'input' = 'numeric';
  public previousNext = false;
  public pageSizes: any[] = [10, 20, 30, 50, 100];
  public group: any[] = [{
    field: ''
  }];
  public multiple = false;
  public allowUnsort = true;
  public height = 'auto';
  search: string;
  public sort: SortDescriptor[] = [{
    field: 'id',
    dir: 'asc'
  }];
  public gridView: GridDataResult;
  public gridData: any[];
  public checkboxOnly = false;
  public mode = 'multiple';
  gridheight = screen.height * 0.5;
  public selectedCallback = (args) => args.dataItem;
  public selectableSettings: SelectableSettings;
  public skip = 0;
  public pageSize = 10;
  public mySelection: any[] = [];
  // end gride

  // declear varible

  public data: any[];
  totalRecord = 0;
  list: Array<UserInfo>;
  // end delear varible
  userInfoList = new Array<UserInfo>();
  constructor(
    private dataService: DataService,
    private titleService: Title,
    private service: ServerService,
    private modalService: ModalService
  ) {
    this.titleService.setTitle('User');
    this.setSelectableSettings();
   }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    this.dataService.visitMessage(url[5]);
    this.inquiry();
  }

  
  // Declear function

  inquiry() {
    const trReq = new UserDataRequest();
    const api = '/api/user/get/list';
    this.service.HTTPget(api).then(resp => {
      const response   = resp as UserDataResponse;
      if (response) {
        this.userInfoList =  response.body.items;
        this.gridData = this.userInfoList;
        this.list     = this.userInfoList;
        this.loadingData(this.userInfoList);
      }
    });
  }

  edit(dataItems) {
    this.modalService.open({
      content: User1100Component,
      message: dataItems,
      callback: _response => {
        if(_response) {
          if(_response && _response.close === BTN_ROLES.EDIT) {
            this.inquiry();
          }
        }
      }
    });
  }

  searchChange(event) {
    if (event) {
      console.log(event.target.value);
      const resultSearch  = this.list.filter( data => data.user_name.toLowerCase().includes(event.target.value));
      this.totalRecord    = resultSearch.length;
      this.loadingData(resultSearch);
    }
  }

  deleteTextSearch() {
    this.search = undefined;
    this.loadingData(this.list);
  }

  public excelExportExcel(component) {
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
  // End Declear function

  // Declear function gride
  public setSelectableSettings() {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'multiple'
    };
  }

  loadingData(data) {
    this.gridView = {
      data: orderBy(data.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: data.length
    };
    this.totalRecord = data.length;
  }

  loadData() {
    this.gridView = {
      data: orderBy(this.gridData.slice(this.skip, this.skip + this.pageSize), this.sort),
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

  private paging(): void {
    this.gridView = {
      data: this.gridData.slice(this.skip, this.skip + this.pageSize),
      total: this.gridData.length
    };
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }
  // end gride function

}
