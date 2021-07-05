import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { ShowPurchaseComponent } from './show-purchase/show-purchase.component';
import { HomeComponent } from './home/home.component';
import { AuthGaurdService } from './_core/service/auth-gaurd.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate:[AuthGaurdService]
  },
  {
    path: 'login',
    component: HomeComponent,
    // canActivate:[AuthGaurdService]
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate:[AuthGaurdService]
  },
  {
    path: 'add-purchase',
    component: AddPurchaseComponent,
    // canActivate:[AuthGaurdService]
  },
  {
    path: 'show-purchase',
    component: ShowPurchaseComponent,
    // canActivate:[AuthGaurdService]
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpRoutingModule { }
