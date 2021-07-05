
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FullCalendarModule } from '@fullcalendar/angular';
// datatables
import { DataTablesModule, DataTableDirective } from 'angular-datatables';

// Date Picker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Modal
import { ModalModule, BsModalRef, TooltipModule, TabsModule, TypeaheadModule, CollapseModule } from 'ngx-bootstrap';

// ngx-order-pipe
import { OrderModule } from 'ngx-order-pipe';


import { PopoverModule } from 'ngx-bootstrap/popover';

// TinyMCE
import { EditorModule } from '@tinymce/tinymce-angular';

// BsDropdown
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Ngx-Mask
import { NgxMaskModule } from 'ngx-mask'

// Digit Only || Only numeric field
import { DigitOnlyModule } from '@uiowa/digit-only';

// NG-Select
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipe } from './pipes/filter.pipe';

// High charts
import { ChartModule } from '@rijine/ngx-highcharts';
import { HighchartsStatic } from "@rijine/ngx-highcharts/dist/services/highcharts.service";

//TimepickerModule
import { TimepickerModule } from 'ngx-bootstrap';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
//Sliding scale
import { Ng5SliderModule } from 'ng5-slider';

// AccordionModule
import { AccordionModule } from 'ngx-bootstrap';
import { TwoDigitDecimaNumberDirective } from './directives/two-digit-decima-number.directive';
import { GroupByPipe } from './pipes/group-by.pipe';
import { MultiFilterPipe } from './pipes/multi-filter.pipe';
import { WebcamModule } from 'ngx-webcam';

export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    FilterPipe,
    MultiFilterPipe,
    TwoDigitDecimaNumberDirective,
    GroupByPipe,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    DataTablesModule,
    // DataTableDirective,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    OrderModule,
    PopoverModule.forRoot(),
    EditorModule,
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot(),
    DigitOnlyModule,
    NgSelectModule,
    ChartModule,
    // TimepickerModule
    TimepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    Ng5SliderModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    WebcamModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    DataTablesModule,
    // DataTableDirective,
    BsDatepickerModule,
    ModalModule,
    TooltipModule,
    TabsModule,
    TypeaheadModule,
    OrderModule,
    PopoverModule,
    EditorModule,
    BsDropdownModule,
    NgxMaskModule,
    DigitOnlyModule,
    NgSelectModule,
    FilterPipe,
    MultiFilterPipe,
    GroupByPipe,
    ChartModule,
    TimepickerModule,
    ButtonsModule,
    Ng5SliderModule,
    AccordionModule,
    CollapseModule,
    TwoDigitDecimaNumberDirective,
    FullCalendarModule,
  ],
  providers: [BsModalRef, CookieService, { provide: HighchartsStatic, useFactory: highchartsFactory }]
})
export class SharedModule { }

