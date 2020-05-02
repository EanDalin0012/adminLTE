import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home1000Component } from './home1000/home1000.component';
import { HomeRoutingModule } from './home-routing.module';
import { SBSharedModule } from '../shared/sbshare.module';
import { Home1100Component } from './home1100/home1100.component';
import { Home1200Component } from './home1200/home1200.component';
import { Home2000Component } from './home2000/home2000.component';
import { Home3000Component } from './home3000/home3000.component';
import { Home4000Component } from './home4000/home4000.component';



@NgModule({
  declarations: [
    Home1000Component,
    Home1100Component,
    Home1200Component,
    Home2000Component,
    Home3000Component,
    Home4000Component
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
