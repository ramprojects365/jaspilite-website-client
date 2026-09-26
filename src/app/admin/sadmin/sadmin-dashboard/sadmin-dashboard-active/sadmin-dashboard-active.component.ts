import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from 'src/app/services/admin/admin-login/adminlogin.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { SadminActiveService } from './sadmin-active.service';
import { UtilityService } from 'src/app/services/utilities.service';


@Component({
  selector: 'app-sadmin-dashboard-active',
  templateUrl: './sadmin-dashboard-active.component.html',
  styleUrls: ['./sadmin-dashboard-active.component.scss']
})
export class SadminDashboardActiveComponent implements OnInit {

  cols: any[];
  sales = [];
  statusItems = [];
  statusList = [];
  statusParam: string;
  saleId = '';
  displayStatusAdder = false;

  constructor(
    private utilityService: UtilityService,
    private adminLoginService: AdminLoginService,
    private sadminActiveService: SadminActiveService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.statusParam = 'Select Status';
    this.cols = [
      { field: 'displayName', header: 'Name' },
      { field: 'salesIdString', header: 'Sale Id' },
      { field: 'branch_name', header: 'Branch' },
      { field: 'date', header: 'Date' },
      { field: 'discount', header: 'Discount' },
      { field: 'delivery_charge', header: 'Delivery Charge' },
      { field: 'total', header: 'Total' },
      { field: 'status', header: 'Status' },
    ];
    this.sales = this.getMockActiveOrders().map(item => {
      item.date = this.utilityService.getDateTimeFormatted(item.date);
      return item;
    });
    setTimeout(
      function () {
        location.reload();
      }, 10000000);
    this.getActiveOrders();
  }

  private getMockActiveOrders() {
    const now = Date.now();
    return [
      {
        sales_id: 1001,
        displayName: 'Aisha Rahman',
        salesIdString: 'S-1001',
        branch_name: 'KL Downtown',
        date: new Date(now - 10 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 6,
        total: 58.9,
        status: 'Accepted',
        phoneNumber: '+60 12-345 6789',
        email: 'aisha.rahman@example.com',
      },
      {
        sales_id: 1002,
        displayName: 'Daniel Lee',
        salesIdString: 'S-1002',
        branch_name: 'PJ Section 14',
        date: new Date(now - 25 * 60 * 1000).toISOString(),
        discount: 2,
        delivery_charge: 0,
        total: 112.5,
        status: 'Accepted',
        phoneNumber: '+60 11-2345 6789',
        email: 'daniel.lee@example.com',
      },
      {
        sales_id: 1003,
        displayName: 'Nur Izzah',
        salesIdString: 'S-1003',
        branch_name: 'Shah Alam',
        date: new Date(now - 45 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 8,
        total: 74.2,
        status: 'Delivered',
        phoneNumber: '+60 16-987 6543',
        email: 'nur.izzah@example.com',
      },
      {
        sales_id: 1004,
        displayName: 'Kumar Raj',
        salesIdString: 'S-1004',
        branch_name: 'Cheras',
        date: new Date(now - 65 * 60 * 1000).toISOString(),
        discount: 5,
        delivery_charge: 5,
        total: 39.0,
        status: 'Cancelled',
        phoneNumber: '+60 17-222 3344',
        email: 'kumar.raj@example.com',
      },
      {
        sales_id: 1005,
        displayName: 'Siti Amina',
        salesIdString: 'S-1005',
        branch_name: 'Ampang',
        date: new Date(now - 95 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 4,
        total: 89.7,
        status: 'Accepted',
        phoneNumber: '+60 19-555 6677',
        email: 'siti.amina@example.com',
      },
    ];
  }

  getActiveOrders() {
    this.sadminActiveService.getActiveOrders()
      .subscribe(
        sales => {
          const remoteSales = sales?.payload?.sales;
          if (Array.isArray(remoteSales) && remoteSales.length > 0) {
            this.sales = remoteSales.map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          }
          //console.log(this.sales);
        },
        () => {
          if (!Array.isArray(this.sales) || this.sales.length < 5) {
            this.sales = this.getMockActiveOrders().map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          }
        });
  }
  addStatus(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    var newStatus = value.statusParam;

    if (newStatus !== 'Select Status') {
      this.sadminActiveService.addStatus(this.saleId, newStatus)
        .subscribe(
          status => {
            if (status.status == 201) {
              this.toastr.success('Status updated!', 'Update Successful!');
              this.displayStatusAdder = false;
              this.getActiveOrders();
            } else {
              this.toastr.error('Status updation has some problem!', 'Update Failed!');
            }
          });
    } else {
      this.toastr.error('Please select the status');
    }


  }

  showdisplayStatusAdder(order) {
    this.displayStatusAdder = true;

    this.saleId = order.sales_id;

    this.statusList = [];
    this.sadminActiveService.getStatus(order.sales_id)
      .subscribe(
        statusArr => {
          this.statusItems = statusArr.payload.status;
          //console.log(this.statusItems.length);
          if (this.statusItems.length == 1) {
            this.statusList = [
              { label: 'Select Status', value: 'Select Status' },
              { label: 'Accepted', value: 'Accepted' },
              { label: 'Cancelled', value: 'Cancelled' },
            ];
          } else if (this.statusItems.length == 2) {
            this.statusList = [
              { label: 'Select Status', value: 'Select Status' },
              { label: 'Delivered', value: 'Delivered' },
            ];
          } else if (this.statusItems.length == 3) {
            this.statusList = [
              { label: 'Select Status', value: 'Select Status' },
              { label: 'Delivered', value: 'Delivered' },
            ];
          } else {
            this.statusList = [];
          }
        });

  }

  updateStatus(order) {
    var r = confirm("Are you sure you want to update the status? This cannot be undone!");
    if (r == true) {
      this.sadminActiveService.updateStatus(order.sales_id, order.status_id, order.status)
        .subscribe(
          status => {
            //console.log(status.status); 
            if (status.status == 204) {
              this.toastr.success('Status deleted!', 'Delete Successful!');
              this.displayStatusAdder = false;
              this.getActiveOrders();
            } else {
              this.toastr.error('Status deletion has some problem!', 'Delete Failed!');
            }
          });
    }
  }
  cancelDisplayStatusAdder() {
    this.displayStatusAdder = false;
  }
  cancelOrder(order) {
    var r = confirm("Are you sure you want to Cancel this order? This cannot be undone!");
    if (r == true) {
      //console.log(order);
      this.sadminActiveService.cancelOrder(order.sales_id)
        .subscribe(
          sales => {
            this.getActiveOrders();
          });
    } else {
      // console.log("You pressed Cancel!");
    }
  }


}
