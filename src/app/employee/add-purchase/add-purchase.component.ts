import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SupplierComponent } from '../supplier/supplier.component';
import { PurSystemService } from '../_core/service/pur-system.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  purchaseObj: any = {};
  itemObj: any = {};
  supplierList: any = [];
  itemList: any = [];
  saveBtn: boolean = false;
  bsModalRef: BsModalRef;


  payTypeList: any = [
    { payTypeNo: 1, payTypeName: 'Cash' },
    { payTypeNo: 2, payTypeName: 'Check' },
    { payTypeNo: 3, payTypeName: 'Mobile Banking' },
  ]

  constructor(
    private route: ActivatedRoute,
    private purSystemService: PurSystemService,
    private toastr: ToastrService,
    private _modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.findValueFromRoute();
    this.findSupplierList();
    this.findItemList();
  }

  findValueFromRoute() {
    this.route.queryParams.subscribe(params => {
      if (params["purObj"]) {
        this.purchaseObj = JSON.parse(params["purObj"]);
        this.purchaseObj.purchaseDate = new Date(this.purchaseObj.purchaseDate);
        this.purchaseObj.supplierNo = Number(this.purchaseObj.supplierNo);
      } else {
        this.purchaseObj.purchaseDate = new Date();
      }
      this.purchaseObj.itemDtlList = this.purchaseObj.itemDtlList ? this.purchaseObj.itemDtlList : [];
    });
  }

  findSupplierList() {
    this.purSystemService.findSupplierList().subscribe(
      res => {
        if (res.success && res.items) {
          this.supplierList = res.items;
        }
      },
      err => {
        console.log('Suppliser List Err', err);
      }
    );
  }

  findItemList() {
    this.purSystemService.findItemList().subscribe(
      res => {
        if (res.success && res.items) {
          this.itemList = res.items;
        }
      },
      err => {
        console.log('Suppliser List Err', err);
      }
    );
  }

  changeItem(data: any) {
    this.itemObj = data;
    this.calTotalItem(data);
  }

  calTotalItem(data: any) {
    data.totalAmt = 0.0;
    if (data.purchaseQty && data.purRate) {
      data.totalAmt = data.purchaseQty * data.purRate;
    }
    this.calTotal();
    this.calGrandTotal();
    this.calDueAmt();
  }

  addItem(itemObj: any) {
    let result = this.purchaseObj.itemDtlList.find(item => item.itemNo == itemObj.itemNo);
    if (result) {
      this.toastr.warning('Item Already Added !');
      this.itemObj = {};
      return;
    }
    if (itemObj.purchaseQty < 1) {
      this.toastr.warning('Please Add Purchase Quantity !');
      return;
    }
    if (itemObj.purRate < 0) {
      this.toastr.warning('Please Add Purchase Rate !');
      return;
    }
    if (this.purchaseObj.ledgNo) {
      itemObj.ledgNo = this.purchaseObj.ledgNo;
    }
    if (itemObj) {
      itemObj.addStockQty = itemObj.purchaseQty;
      itemObj.lastPurchaseQty = itemObj.purchaseQty;
      this.purchaseObj.itemDtlList.unshift(itemObj);
      this.itemObj = {};
      this.calTotal();
      this.calGrandTotal();
      this.calDueAmt();
    }
  }

  calTotal() {
    this.purchaseObj.totalAmt = 0.0;
    this.purchaseObj.itemDtlList.forEach(element => {
      this.purchaseObj.totalAmt += element.totalAmt;
    });
  }

  calGrandTotal() {
    this.purchaseObj.grandTotal = 0.0;
    if (this.purchaseObj.totalAmt && this.purchaseObj.discountAmt) {
      this.purchaseObj.grandTotal = this.purchaseObj.totalAmt - this.purchaseObj.discountAmt;
    } else {
      this.purchaseObj.discountAmt = 0.0;
      this.purchaseObj.grandTotal = this.purchaseObj.totalAmt
    }
  }

  calDueAmt() {
    this.purchaseObj.dueAmt = 0.0;
    if (this.purchaseObj.grandTotal && this.purchaseObj.paidAmt) {
      this.purchaseObj.dueAmt = this.purchaseObj.grandTotal - this.purchaseObj.paidAmt;
    } else {
      this.purchaseObj.paidAmt = 0.0;
      this.purchaseObj.dueAmt = this.purchaseObj.grandTotal;
    }
  }

  calFullPaid() {
    this.purchaseObj.paidAmt = this.purchaseObj.grandTotal;
    this.purchaseObj.dueAmt = 0.0;
  }

  removeItem(index) {
    this.purchaseObj.itemDtlList.splice(index, 1);
    this.calTotal();
    this.calGrandTotal();
    this.calDueAmt();
  }

  saveOrUpdate() {
    if (!this.purchaseObj.invoiceNo) {
      this.toastr.warning('Please Add Invoice No!');
      return;
    }
    if (!this.purchaseObj.payTypeNo) {
      this.toastr.warning('Please Add Payment Type!');
      return;
    }
    if (this.purchaseObj.itemDtlList.length < 1) {
      this.toastr.warning('Please Add Item!');
      return;
    }
    this.saveBtn = true;
    if (this.purchaseObj.ledgNo) {
      this.updatePurchase();
    } else {
      this.savePurchase()
    }
  }

  savePurchase() {
    this.purSystemService.savePurchase(this.purchaseObj).subscribe(
      res => {
        if (res.success) {
          this.toastr.success('Purchase Successfuly.');
          this.purchaseObj = {};
        } else {
          this.toastr.warning('Purchase Failed!');
        }
        this.saveBtn = false;
      },
      err => {
        this.saveBtn = false;
        this.toastr.warning('Purchase Error!');
        console.log('Save Purchase err', err);
      }
    )
  }

  updatePurchase() {
    this.purSystemService.updatePurchase(this.purchaseObj).subscribe(
      res => {
        if (res.success) {
          this.toastr.success('Purchase Update Successfuly.');
          this.purchaseObj = {};
        } else {
          this.toastr.warning('Purchase Update Failed!');
        }
        this.saveBtn = false;
      },
      err => {
        this.saveBtn = false;
        this.toastr.warning('Purchase Update Error!');
        console.log('Update Purchase err', err);
      }
    )
  }

  changeSup(event) {
    if (event) {
      this.purchaseObj.supplierNo = event.supNo;
      this.purchaseObj.supplierName = event.name;
    }
  }

  addSupplier() {
    this.bsModalRef = this._modalService.show(SupplierComponent, { class: 'modal-md', backdrop: 'static' });
    this.bsModalRef.content.onClose.subscribe(
      result => {
        if (result) {
          this.findSupplierList();
        }
      }
    );
  }

}
