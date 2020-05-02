import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { ExportComponent } from '../exports/export/export.component';
import { RegisterComponent } from '../register/register/register.component';


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
