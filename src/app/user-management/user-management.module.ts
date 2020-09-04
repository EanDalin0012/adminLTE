import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { User1000Component } from './user1000/user1000.component';
import { User1100Component } from './user1100/user1100.component';
import { User1200Component } from './user1200/user1200.component';
import { Role1200Component } from './role1200/role1200.component';
import { Role1100Component } from './role1100/role1100.component';
import { UserRole1000Component } from './user-role1000/user-role1000.component';
import { Role1000Component } from './role1000/role1000.component';
import { User2000Component } from './user2000/user2000.component';
import { SBSharedModule } from '../shared/sbshare.module';
import { User2100Component } from './user2100/user2100.component';
import { User2200Component } from './user2200/user2200.component';



@NgModule({
  declarations: [
    User1000Component,
    User1100Component,
    User1200Component,
    Role1200Component,
    Role1100Component,
    Role1000Component,
    UserRole1000Component,
    User2000Component,
    User2100Component,
    User2200Component
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SBSharedModule
  ],
  entryComponents: [
    User1100Component,
    User1200Component,
    Role1100Component,
    Role1200Component,
    User2000Component
  ]
})
export class UserManagemenModule { }
