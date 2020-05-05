import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Register1000Component } from './register1000/register1000.component';
import { Register2000Component } from './register2000/register2000.component';
import { Register3000Component } from './register3000/register3000.component';


const routes: Routes = [
  {path: '', component: Register1000Component},
  {path: 'sub-category', component: Register2000Component},
  {path: 'company', component: Register3000Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
