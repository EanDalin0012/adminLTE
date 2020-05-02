import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home1000Component } from './home1000/home1000.component';
import { HomeRoutingModule } from './home-routing.module';
import { SBSharedModule } from '../shared/sbshare.module';



@NgModule({
  declarations: [
    Home1000Component
  ],
  imports: [
    // CommonModule,
    HomeRoutingModule,
    SBSharedModule
  ]
})
export class HomeModule {
  constructor() {
    console.log('home module work');
  }
 }
