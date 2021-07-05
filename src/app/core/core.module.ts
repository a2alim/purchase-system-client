import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

@NgModule({
  declarations: [
  HomeLayoutComponent],
  imports: [
    CoreRoutingModule,
    SharedModule,
  ],
  exports: [ ],
  providers: [],

  entryComponents: []
})
export class CoreModule { }
