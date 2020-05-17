import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Register1000Component } from './register1000/register1000.component';
import { Register1100Component } from './register1100/register1100.component';
import { Register1200Component } from './register1200/register1200.component';
import { Register2200Component } from './register2200/register2200.component';
import { Register2100Component } from './register2100/register2100.component';
import { Register2000Component } from './register2000/register2000.component';
import { Register3000Component } from './register3000/register3000.component';
import { Register3100Component } from './register3100/register3100.component';
import { Register3200Component } from './register3200/register3200.component';
import { Register4200Component } from './register4200/register4200.component';
import { Register4100Component } from './register4100/register4100.component';
import { Register4000Component } from './register4000/register4000.component';
import { Register5000Component } from './register5000/register5000.component';
import { Register5100Component } from './register5100/register5100.component';
import { Register5200Component } from './register5200/register5200.component';
import { Register6200Component } from './register6200/register6200.component';
import { Register6100Component } from './register6100/register6100.component';
import { Register6000Component } from './register6000/register6000.component';
import { Register7000Component } from './register7000/register7000.component';
import { Register7100Component } from './register7100/register7100.component';
import { Register7200Component } from './register7200/register7200.component';
import { Register8200Component } from './register8200/register8200.component';
import { Register8100Component } from './register8100/register8100.component';
import { Register8000Component } from './register8000/register8000.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SBSharedModule } from '../shared/sbshare.module';
import { Register5110Component } from './register5110/register5110.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [
    Register1000Component,
    Register1100Component,
    Register1200Component,

    Register2200Component,
    Register2100Component,
    Register2000Component,

    Register3000Component,
    Register3100Component,
    Register3200Component,

    Register4200Component,
    Register4100Component,
    Register4000Component,

    Register5000Component,
    Register5100Component,
    Register5200Component,

    Register6200Component,
    Register6100Component,
    Register6000Component,

    Register7000Component,
    Register7100Component,
    Register7200Component,

    Register8200Component,
    Register8100Component,
    Register8000Component,
    Register5110Component
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SBSharedModule,
    CKEditorModule
  ],
  entryComponents: [
    Register5110Component
  ]
})
export class RegisterModule { }
