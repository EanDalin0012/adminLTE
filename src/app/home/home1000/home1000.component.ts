import { Component, OnInit } from '@angular/core';
import { Country, CountryData } from './data';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home1000',
  templateUrl: './home1000.component.html',
  styleUrls: ['./home1000.component.css']
})
export class Home1000Component implements OnInit {

  value: Date = new Date();

  public series: any[] = [{
    name: 'India',
    data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
  }, {
    name: 'Russian Federation',
    data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
  }, {
    name: 'Germany',
    data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
  }, {
    name: 'World',
    data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
  }];
  public categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];

  countryList: Country[];
  country: Country;
  filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith'
  };

  defaultCountry = { id: '', name: 'Select', countryCode: '', isEnabled: '' };

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.value = null;
    const url = (window.location.href).split('/');
    console.log(url);
    this.dataService.visitMessage(url[5]);
    this.countryList = CountryData;
  }

  setBankName(country) {
    console.log(country);
  }

  countryClass() {

  }

}
