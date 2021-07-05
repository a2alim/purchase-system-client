import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeLayoutComponent } from './home-layout/home-layout.component';

const routes: Routes = [
  
  {
    path: '',
    component: HomeLayoutComponent,
    loadChildren: '../employee/emp.module#EmpModule'
  },
  // {
  //   path: '**',
  //   // component: NotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class CoreRoutingModule { }
