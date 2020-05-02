import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home1000Component } from './home1000/home1000.component';

const routes: Routes = [
  {path: '', component: Home1000Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
