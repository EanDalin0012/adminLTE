import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExportsRoutingModule } from './exports-routing.module';
import { Export1000Component } from './export1000/export1000.component';
import { Export2000Component } from './export2000/export2000.component';
import { Export3000Component } from './export3000/export3000.component';



@NgModule({
  declarations: [
  Export1000Component,
  Export2000Component,
  Export3000Component],
  imports: [
    CommonModule,
    ExportsRoutingModule
  ]
})
export class ExportsModule { }
