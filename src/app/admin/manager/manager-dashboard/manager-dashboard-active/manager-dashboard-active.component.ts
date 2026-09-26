import { Component, OnInit } from '@angular/core';

import { ManagerActiveService } from './manager-active.service';
import { UtilityService } from 'src/app/services/utilities.service';
import { AdminLoginService } from '../../../../services/admin/admin-login/adminlogin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-dashboard-active',
  templateUrl: './manager-dashboard-active.component.html',
  styleUrls: ['./manager-dashboard-active.component.scss']
})
export class ManagerDashboardActiveComponent implements OnInit {

  userBranch: any;
  sales = [];
  cols: any[];

  constructor(
    private utilityService: UtilityService,
    private managerActiveService: ManagerActiveService,
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
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.managerActiveService.getMyBranch(adminId)
      .subscribe(
        branch => {
          this.userBranch = branch.payload.branchdetails[0] || null;
          this.getActiveOrders(this.userBranch.branch_id);
        });
   
  }
  getActiveOrders(branchId) {
    this.managerActiveService.getActiveOrders(branchId)
      .subscribe(
        sales => {           
          this.sales = sales.payload.sales.map(item => {
            item.date = this.utilityService.getDateTimeFormatted(item.date);
            return item;
          });
         // console.log(JSON.stringify(this.sales));
        });
  }

}
