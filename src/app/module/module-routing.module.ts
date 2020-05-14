import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { ExportComponent } from '../exports/export/export.component';
import { RegisterComponent } from '../register/register/register.component';
import { SaleComponent } from '../sales/sale/sale.component';
import { UserManagementComponent } from '../user-management/user-management.component';


const routes: Routes = [
  { path: 'main', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomeModule'
      }
    ]
  },
  {
    path: '', component: RegisterComponent,
    children: [
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterModule'
      }
    ]
  },
  {
    path: '', component: RegisterComponent,
    children: [
      {
        path: 'imports',
        loadChildren: '../imports/imports.module#ImportsModule'
      }
    ]
  },
  {
    path: '', component: ExportComponent,
    children: [
      {
        path: 'exports',
        loadChildren: '../exports/exports.module#ExportsModule'
      }
    ]
  },
  {
    path: '', component: SaleComponent,
    children: [
      {
        path: 'sales',
        loadChildren: '../sales/sales.module#SalesModule'
      }
    ]
  },
  {
    path: '', component: UserManagementComponent,
    children: [
      {
        path: 'user-management',
        loadChildren: '../user-management/user-management.module#UserManagemenModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MRoutingModule {
  constructor() {
    console.log();
  }
 }
