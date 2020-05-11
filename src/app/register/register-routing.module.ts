import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Register1000Component } from './register1000/register1000.component';
import { Register2000Component } from './register2000/register2000.component';
import { Register3000Component } from './register3000/register3000.component';
import { Register4000Component } from './register4000/register4000.component';
import { Register5000Component } from './register5000/register5000.component';
import { Register6000Component } from './register6000/register6000.component';


const routes: Routes = [
  {path: 'main-category', component: Register1000Component},
  {path: 'sub-category',  component: Register2000Component},
  {path: 'company',       component: Register3000Component},
  {path: 'supplier',      component: Register4000Component},
  {path: 'product',       component: Register5000Component},
  {path: 'ck',            component: Register6000Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
