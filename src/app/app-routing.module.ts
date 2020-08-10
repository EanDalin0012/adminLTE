import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';


const routes: Routes = [
  {path: '', redirectTo: '/singin', pathMatch: 'full'},
  {path: 'main', component: LayoutComponent, loadChildren: './module/module.module#MModule'},
  {path: 'singin', component: LayoutBlankComponent, loadChildren: './sign/sign.module#SignModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
