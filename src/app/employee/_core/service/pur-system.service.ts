import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurSystemService {

  private SUPP_END_POINT = `${environment.baseUrl}${environment.purchaseApiUrl}/supplier`;
  private FIND_SUPPLIER_LIST = `${this.SUPP_END_POINT}/list`;

  private ITEM_END_POINT = `${environment.baseUrl}${environment.purchaseApiUrl}/item`;
  private FIND_ITEM_LIST = `${this.ITEM_END_POINT}/list`;

  private SUPPLIER_END_POINT = `${environment.baseUrl}${environment.purchaseApiUrl}/supplier`;
  private ADD_SUPPLIER = `${this.SUPPLIER_END_POINT}/create`;
  
  private PUR_END_POINT = `${environment.baseUrl}${environment.purchaseApiUrl}/purchase`;
  private SAVE_PURCHASE = `${this.PUR_END_POINT}/create`;
  private UPDAT_PURCHASE = `${this.PUR_END_POINT}/update`;
  
  private REPORT_END_POINT = `${environment.baseUrl}${environment.purchaseApiUrl}/report`;
  private PURCHASE_RPT = `${this.REPORT_END_POINT}/purchase-rpt`;
  private PURCHASE_DTL_RPT = `${this.REPORT_END_POINT}/purchase-dtl-rpt`;

  constructor(private http: HttpClient) { }

  findSupplierList(): Observable<any> {
    return this.http.get(this.FIND_SUPPLIER_LIST).pipe(map((data: any) => data));
  }

  findItemList(): Observable<any> {
    return this.http.get(this.FIND_ITEM_LIST).pipe(map((data: any) => data));
  }

  savePurchase(data: any): Observable<any> {
    return this.http.post(this.SAVE_PURCHASE, data).pipe(map((data: any) => data));
  }
  
  updatePurchase(data: any): Observable<any> {
    return this.http.post(this.UPDAT_PURCHASE, data).pipe(map((data: any) => data));
  }
  
  addSupplier(data: any): Observable<any> {
    return this.http.post(this.ADD_SUPPLIER, data).pipe(map((data: any) => data));
  }

  purchaseRpt(data: any): Observable<any> {
    return this.http.post(this.PURCHASE_RPT, data).pipe(map((data: any) => data));
  }

  purchaseDtlRpt(data: any): Observable<any> {
    return this.http.post(this.PURCHASE_DTL_RPT, data).pipe(map((data: any) => data));
  }


}
