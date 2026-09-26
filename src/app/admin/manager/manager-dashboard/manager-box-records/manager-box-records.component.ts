import { Component, OnInit } from '@angular/core';

import { ManagerDashboardService } from '../managerdashboard.service';
import { AdminLoginService } from '../../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-manager-box-records',
  templateUrl: './manager-box-records.component.html',
  styleUrls: ['./manager-box-records.component.scss']
})
export class ManagerBoxRecordsComponent implements OnInit {

  userBranch: any;
  userShopCount = 0;
  userBranchCount = 0;
  userOrderCount = 0;
  userActiveOrderCount = 0;
  userReceivedOrderAmount = 0;
  userPendingOrderAmount = 0;

  constructor(
    private managerDashboardService: ManagerDashboardService,
    private adminLoginService: AdminLoginService,
  ) { }

  ngOnInit() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.managerDashboardService.getMyBranch(adminId)
      .subscribe(
        branch => {
          this.userBranch = branch.payload.branchdetails[0] || null;
          this.getDashboardBoxes();
        });
  }

  getDashboardBoxes() {
    this.getShopCount();
    this.getBranchCount();
    this.getOrderCount();
    this.getOrderAmount();
  }

  getShopCount() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.managerDashboardService.getShopCount(adminId)
      .subscribe(
        shops => {
          this.userShopCount = shops.payload.shops_count || 0;
        });
  }

  getBranchCount() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.managerDashboardService.getBranchCount(adminId)
      .subscribe(
        shops => {
          this.userBranchCount = shops.payload.branch_count || 0;
        });
  }

  getOrderCount() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    const branchId = this.userBranch.branch_id;
    this.managerDashboardService.getOrderCount(adminId, branchId)
      .subscribe(
        shops => {
          this.userOrderCount = shops.payload.orders_count || 0;
          this.userActiveOrderCount = shops.payload.active_count || 0;
        });
  }

  getOrderAmount() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    // console.log(this.userBranch);
    const branchId = this.userBranch.branch_id;
    this.managerDashboardService.getOrderAmounts(adminId, branchId)
      .subscribe(
        shops => {
          //console.log(shops.payload);
          this.userReceivedOrderAmount = shops.payload.received_amount || 0;
          this.userPendingOrderAmount = shops.payload.pending_amount || 0;
        });
  }

}
