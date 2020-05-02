import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign/sign.component';
import { Sign1000Component } from './sign1000/sign1000.component';
import { SignRoutingModule } from './sign-routing.module';



@NgModule({
  declarations: [
    SignComponent,
    Sign1000Component
  ],
  imports: [
    CommonModule,
    SignRoutingModule
  ]
})
export class SignModule {
  constructor() {
    console.log('Sign Modole Work');
  }
}
