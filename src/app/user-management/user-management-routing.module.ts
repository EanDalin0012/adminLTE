import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role1000Component } from './role1000/role1000.component';
import { User1000Component } from './user1000/user1000.component';
import { UserRole1000Component } from './user-role1000/user-role1000.component';
import { User2000Component } from './user2000/user2000.component';


const routes: Routes = [
  {path: '', redirectTo: 'user', pathMatch: 'full'},
  { path: 'user', component: User1000Component },
  { path: 'role', component: Role1000Component },
  { path: 'user-role', component: UserRole1000Component },
  { path: 'user-lock', component: User2000Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
