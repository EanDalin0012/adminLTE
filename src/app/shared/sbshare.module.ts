import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule, DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule, SharedModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { ModalComponent } from './component/modal/modal.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';
import { AmountFormatPipe } from './pipes/amount-format.pipe';
import { DiscountFormatPipe } from './pipes/discount-format.pipe';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { UploadModule } from '@progress/kendo-angular-upload';

@NgModule({
  declarations: [
  ModalComponent,
  DateFormatPipe,
  PhoneNumberPipe,
  AmountFormatPipe,
  DiscountFormatPipe,
  AutoFocusDirective
],
  imports: [
   /*  CommonModule */
  ],
  exports : [
    // CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DialogModule,
    GridModule,
    LayoutModule,
    SharedModule,
    SortableModule,
    DropDownsModule,
    PDFModule,
    // AccountFormatePipe,
    // CurrencyFormatePipe,
    // FilesizePipe

    ButtonsModule,
    // BrowserAnimationsModule,
    ChartsModule,
    DateInputsModule,
    DialogsModule,
    ExcelExportModule,
    InputsModule,
    PDFExportModule,
    SchedulerModule,
    NotificationModule,
    UploadModule,
    // pipe
    DateFormatPipe,
    PhoneNumberPipe,
    AmountFormatPipe,
    DiscountFormatPipe,
    AutoFocusDirective

  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [
    DatePipe,
  ]
})
export class SBSharedModule {
  static forRoot(): ModuleWithProviders<SBSharedModule> {
    return {
      ngModule: SBSharedModule,
      providers: []
    };
  }
 }
