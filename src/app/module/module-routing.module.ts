import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { ExportComponent } from '../exports/export/export.component';
import { ImportComponent } from '../imports/import/import.component';


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
  { path: 'home1',  loadChildren: './home/home.module#HomeModule' },
  { path: 'exports', component: ExportComponent, loadChildren: './home/home.module#HomeModule' },
  { path: 'imports', component: ImportComponent, loadChildren: './home/home.module#HomeModule' },
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
