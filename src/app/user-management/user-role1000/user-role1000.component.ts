import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-role1000',
  templateUrl: './user-role1000.component.html',
  styleUrls: ['./user-role1000.component.css']
})
export class UserRole1000Component implements OnInit {

  constructor(
    private dataService: DataService,
    private titleService: Title
  ) {
    this.titleService.setTitle('user-role');
  }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    console.log(url);
    this.dataService.visitMessage(url[5]);
  }

}
