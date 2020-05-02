import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Sign1000Component } from './sign1000/sign1000.component';


const routes: Routes = [
  {path: '', component: Sign1000Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutingModule { }
