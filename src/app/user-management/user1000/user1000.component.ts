import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user1000',
  templateUrl: './user1000.component.html',
  styleUrls: ['./user1000.component.css']
})
export class User1000Component implements OnInit {

  constructor(
    private dataService: DataService,
    private titleService: Title
  ) {
    this.titleService.setTitle('User');
   }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    console.log(url);
    this.dataService.visitMessage(url[5]);
  }

}
