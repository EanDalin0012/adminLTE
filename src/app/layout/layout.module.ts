import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { SideNavComponent } from './side-nav/side-nav.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SettingsComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SettingsComponent,
    SideNavComponent,
  ]
})
export class MLayoutModule { }
