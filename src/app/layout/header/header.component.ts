import { Component, OnInit } from '@angular/core';
import { Utils } from '../../shared/utils/utils.static';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo: any; // new User();
  constructor() { }

  ngOnInit(): void {
    this.userInfo = Utils.getUserInfo();
  }

}
