import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PurSystemService } from '../_core/service/pur-system.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  supplier: any = {};
  isId: boolean;
  isName: boolean;
  onClose: Subject<boolean>;

  constructor(
    public bsModalRef: BsModalRef,
    private _tosterService: ToastrService,
    private purSystemService: PurSystemService,
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  addSupplier() {
    if (!this.supplier.supId) {
      this._tosterService.warning('Supplier Id Empty Not Allowed!');
      this.isId = true;
      return;
    }
    if (!this.supplier.name) {
      this._tosterService.warning('Supplier Name Empty Not Allowed!');
      this.isName = true;
      return;
    }
    this.purSystemService.addSupplier(this.supplier).subscribe(
      res => {
        if (res.success) {
          this._tosterService.success(res.message);
          this.onClose.next(true);
          this.bsModalRef.hide();
          this.supplier = {};
        } else {
          this._tosterService.warning(res.message);
        }
      },
      err => {
        console.log("save error; ", err);
        this._tosterService.warning('', "Error occured");
      }
    );
  }

  idChange(){
    this.isId = false;
  }

  nameChange(){
    this.isName = false;
  }


}
