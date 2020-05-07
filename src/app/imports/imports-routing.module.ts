import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportComponent } from './import/import.component';
import { Import1000Component } from './import1000/import1000.component';
import { Import1100Component } from './import1100/import1100.component';


const routes: Routes = [
  {path: '',                    component: ImportComponent},
  {path: 'import-product-list', component: Import1000Component},
  {path: 'import-product',      component: Import1100Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportsRoutingModule { }
