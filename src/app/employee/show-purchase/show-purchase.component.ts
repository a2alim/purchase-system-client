import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { PurSystemService } from '../_core/service/pur-system.service';
import { UtilsService } from '../_core/service/utils.service.service';

@Component({
  selector: 'app-show-purchase',
  templateUrl: './show-purchase.component.html',
  styleUrls: ['./show-purchase.component.css']
})
export class ShowPurchaseComponent implements OnInit {

  @ViewChild('viewPurchaseGrid') viewPurchaseGridTable;
  viewPurchaseGrid: any;
  viewPurchaseGridObj: any;

  fromDate: Date;
  toDate: Date;
  maxDate: Date;

  constructor(
    private router: Router,
    private coreUtilService: UtilsService,
    private purSystemService: PurSystemService,
  ) { }

  ngOnInit() {
    this.toDate = new Date();
    this.fromDate = moment().subtract(30, 'days').toDate();
    this.maxDate = new Date();
    this.loadPurcheGrid();
  }

  loadPurcheGrid() {
    let that = this;
    this.viewPurchaseGrid = $(this.viewPurchaseGridTable.nativeElement);

    this.viewPurchaseGridObj = this.viewPurchaseGrid.DataTable({
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: {
        url: environment.baseUrl + environment.purchaseApiUrl + '/purchase/grid-list',
        type: "GET",
        data: function (sendData) {
          sendData.fromDate = moment(that.fromDate).format("DD/MM/YYYY");
          sendData.toDate = moment(that.toDate).format("DD/MM/YYYY");
        },
        beforeSend: function (xhr) {
          // xhr.setRequestHeader('Authorization', "bearer " + that.authService.getAccessToken());
          xhr.setRequestHeader('Content-Type', "application/json");
        },
        dataSrc: function (response) {
          response.draw = response.obj.draw;
          response.recordsTotal = response.obj.recordsTotal;
          response.recordsFiltered = response.obj.recordsFiltered;
          return response.obj.data;
        },
        error: function (request) {
        }
      },

      "order": [0, "desc"],
      columns: [
        {
          visible: false,
          data: 'ledgNo',
        },
        {
          title: 'SL',
          data: 'ledgNo',
          render: function (data, type, row, meta) {
            return (meta.settings._iDisplayStart) + (meta.row + 1);
          }
        },
        {
          title: 'Invoice No',
          data: 'invoiceNo',
          name: 'invoiceNo'
        },
        {
          title: 'Purchase Id',
          data: 'purchaseId',
          name: 'purchaseId'
        },
        {
          title: 'Supplier Name',
          data: 'supplierName',
          name: 'supplierName'
        },
        {
          title: 'Purchase Date',
          data: 'purchaseDate',
          render: (data) => {
            return moment(new Date(data)).format("DD/MM/YYYY").toString();
          },
        },
        {
          title: 'Total Amount',
          data: 'grandTotal',
        },
        {
          title: 'Action',
          render: function () {
            return '<button class="ptn btn-success print"><i class="far fa-file-pdf"></i></button>' +
              '&nbsp <button class="ptn btn-info edit"><i class="far fa-edit"></i></button>';
          }
        }
      ],
      responsive: true,
      select: true,
      rowCallback: (row: Node, data: any | Object) => {
        $('td', row).bind('click', () => {
          //  that.selectedPurObj = data;
        });
        $(row).find(".edit").bind('click', () => {
          this.editPur(data);
        });
        $(row).find(".print").bind('click', () => {
          this.purchaseRpt(data);
        });
        return row;
      }
    });
  }

  reloadGrid() {
    this.viewPurchaseGridObj.draw();
  }

  editPur(data: any) {

    console.log("selectedPurObj", data);
    this.router.navigate(["/add-purchase"], { queryParams: { purObj: JSON.stringify(data) } });

  }

  printPur(data: any) {
    console.log("selectedPurObj", data);

  }

  purchaseRpt(data: any) {
    const reqObj = {
      "id": data.ledgNo,
    }
    this.purSystemService.purchaseRpt(reqObj).subscribe(
      res => {
        // this.printBtn = false;
        let file = new Blob([res], { type: this.coreUtilService.printFormat('PDF') });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // this.removeLoader();
      },
      err => {
        console.log(" Error occured REPORT generation..", err);
        // this.printBtn = false;
        // this.removeLoader();
      }
    )
  }

  purchaseDtlRpt(rptFormat: any) {
    const reqObj = {
      fromDate:moment(this.fromDate).format("DD/MM/YYYY"),
      toDate: moment(this.toDate).format("DD/MM/YYYY"),
      rptFormat: rptFormat,
    }
    this.purSystemService.purchaseDtlRpt(reqObj).subscribe(
      res => {
        // this.printBtn = false;
        let file = new Blob([res], { type: this.coreUtilService.printFormat(rptFormat) });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // this.removeLoader();
      },
      err => {
        console.log(" Error occured REPORT generation..", err);
        // this.printBtn = false;
        // this.removeLoader();
      }
    )
  }


}
