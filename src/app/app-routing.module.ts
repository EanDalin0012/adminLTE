import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { Error4Component } from './announce/error4/error4.component';
import { Error5Component } from './announce/error5/error5.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'main', component: LayoutComponent, loadChildren: './module/module.module#MModule'},
  {path: 'login', component: LayoutBlankComponent, loadChildren: './sign/sign.module#SignModule'},
  
  { path: 'announce/4error', component: Error4Component },
  { path: 'announce/5error', component: Error5Component },
  { path: '**', component: Error4Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
