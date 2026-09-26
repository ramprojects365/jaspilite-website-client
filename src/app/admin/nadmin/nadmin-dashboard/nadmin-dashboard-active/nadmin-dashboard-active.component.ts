import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NadminActiveService } from './nadmin-active.service';
import { UtilityService } from 'src/app/services/utilities.service';
import { AdminLoginService } from '../../../../services/admin/admin-login/adminlogin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nadmin-dashboard-active',
  templateUrl: './nadmin-dashboard-active.component.html',
  styleUrls: ['./nadmin-dashboard-active.component.scss']
})
export class NadminDashboardActiveComponent implements OnInit {

  userBranch: any;
  sales = [];
  cols: any[];

  constructor(
    private router: Router,
    private utilityService: UtilityService,
    private nadminActiveService: NadminActiveService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'displayName', header: 'Name' },
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
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    setTimeout(
      function () {
        location.reload();
      }, 10000000);
    this.getActiveOrders(adminId);
    // this.nadminActiveService.getMyBranch(adminId)
    //   .subscribe(
    //     branch => {
    //       this.userBranch = branch.payload.branchdetails[0] || null;
    //       this.getActiveOrders(adminId);
    //     });
  }

  private getMockActiveOrders() {
    const now = Date.now();
    return [
      {
        sales_id: 2001,
        displayName: 'Nadmin Customer 1',
        salesIdString: 'NA-2001',
        branch_name: 'Brickfields',
        date: new Date(now - 15 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 5,
        total: 46.4,
        status: 'Accepted',
        phoneNumber: '+60 12-111 2233',
        email: 'customer1@example.com',
      },
      {
        sales_id: 2002,
        displayName: 'Nadmin Customer 2',
        salesIdString: 'NA-2002',
        branch_name: 'Brickfields',
        date: new Date(now - 35 * 60 * 1000).toISOString(),
        discount: 2,
        delivery_charge: 0,
        total: 98.0,
        status: 'Accepted',
        phoneNumber: '+60 12-222 3344',
        email: 'customer2@example.com',
      },
      {
        sales_id: 2003,
        displayName: 'Nadmin Customer 3',
        salesIdString: 'NA-2003',
        branch_name: 'Brickfields',
        date: new Date(now - 75 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 6,
        total: 31.2,
        status: 'Delivered',
        phoneNumber: '+60 12-333 4455',
        email: 'customer3@example.com',
      },
      {
        sales_id: 2004,
        displayName: 'Nadmin Customer 4',
        salesIdString: 'NA-2004',
        branch_name: 'Brickfields',
        date: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
        discount: 5,
        delivery_charge: 5,
        total: 67.9,
        status: 'Cancelled',
        phoneNumber: '+60 12-444 5566',
        email: 'customer4@example.com',
      },
      {
        sales_id: 2005,
        displayName: 'Nadmin Customer 5',
        salesIdString: 'NA-2005',
        branch_name: 'Brickfields',
        date: new Date(now - 6 * 60 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 4,
        total: 120.75,
        status: 'Accepted',
        phoneNumber: '+60 12-555 6677',
        email: 'customer5@example.com',
      },
    ];
  }

  getActiveOrders(adminId) {
    this.nadminActiveService.getActiveOrders(adminId)
      .subscribe(
        sales => {
          const remoteSales = sales?.payload?.sales;
          if (Array.isArray(remoteSales) && remoteSales.length > 0) {
            this.sales = remoteSales.map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          }
          // console.log(JSON.stringify(this.sales));
        },
        () => {
          if (!Array.isArray(this.sales) || this.sales.length < 5) {
            this.sales = this.getMockActiveOrders().map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          }
        },
      );
  }
  showDetails(sale) {
    this.nadminActiveService.SalesId = sale;
    this.router.navigate(['admin/nadmin/activeOrderDetails']);
  }

}
