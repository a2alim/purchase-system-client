import { NgModule } from '@angular/core';
import { EmpRoutingModule } from './emp-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { ShowPurchaseComponent } from './show-purchase/show-purchase.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { SupplierComponent } from './supplier/supplier.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    FooterComponent,
    AddPurchaseComponent,
    ShowPurchaseComponent,
    SupplierComponent
  ],
  imports: [
    EmpRoutingModule,
    SharedModule
  ],
  exports: [
  ],
  entryComponents: [
    SupplierComponent
  ]
})

export class EmpModule { }
