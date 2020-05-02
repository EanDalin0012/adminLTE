import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Register1000Component } from './register1000/register1000.component';


const routes: Routes = [
  {path: '', component: Register1000Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
