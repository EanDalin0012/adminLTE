import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportComponent } from './import/import.component';
import { ImportsRoutingModule } from './imports-routing.module';
import { Import1000Component } from './import1000/import1000.component';
import { Import1100Component } from './import1100/import1100.component';
import { Import1200Component } from './import1200/import1200.component';
import { Import2200Component } from './import2200/import2200.component';
import { Import2100Component } from './import2100/import2100.component';
import { Import2000Component } from './import2000/import2000.component';
import { SBSharedModule } from '../shared/sbshare.module';



@NgModule({
  declarations: [
  Import1000Component,
  Import1100Component,
  Import1200Component,
  Import2200Component,
  Import2100Component,
  Import2000Component],
  imports: [
    CommonModule,
    ImportsRoutingModule,
    SBSharedModule
  ]
})
export class ImportsModule { }
