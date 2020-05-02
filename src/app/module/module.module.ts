import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home/home.component';
import { ExportComponent } from '../exports/export/export.component';
import { ImportComponent } from '../imports/import/import.component';
import { RegisterComponent } from '../register/register/register.component';
import { SaleComponent } from '../sales/sale/sale.component';
import { MRoutingModule } from './module-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    ExportComponent,
    ImportComponent,
    RegisterComponent,
    SaleComponent
  ],
  imports: [
    // CommonModule,
    MRoutingModule
  ]
})
export class MModule {
  constructor() {
    console.log('MModule');
  }
 }
