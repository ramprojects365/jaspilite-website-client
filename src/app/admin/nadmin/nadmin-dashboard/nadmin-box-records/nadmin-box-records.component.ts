import { Component, OnInit } from '@angular/core';

import { NadminDashboardService } from '../nadmindashboard.service';
import { AdminLoginService } from '../../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-box-records',
  templateUrl: './nadmin-box-records.component.html',
  styleUrls: ['./nadmin-box-records.component.scss']
})
export class NadminBoxRecordsComponent implements OnInit {

  userShopCount = 0;
  userBranchCount = 0;
  userOrderCount = 0;
  userActiveOrderCount = 0;
  userReceivedOrderAmount = 0;
  userPendingOrderAmount = 0;

  constructor(
    private nadminDashboardService: NadminDashboardService,
    private adminLoginService: AdminLoginService,
  ) { }

  ngOnInit() {
    this.userShopCount = 0;
    this.userBranchCount = 0;
    this.userOrderCount = 0;
    this.userActiveOrderCount = 0;
    this.userReceivedOrderAmount = 0;
    this.userPendingOrderAmount = 0;
    this.getShopCount();
    this.getBranchCount();
    this.getOrderCount();
    this.getOrderAmount();
  }

  getShopCount() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminDashboardService.getShopCount(adminId)
      .subscribe(
        shops => {
          const count = Number(shops?.payload?.shops_count);
          this.userShopCount = isNaN(count) ? 0 : count;
        }, () => {
          this.userShopCount = 0;
        });
  }

  getBranchCount() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminDashboardService.getBranchCount(adminId)
      .subscribe(
        shops => {
          const count = Number(shops?.payload?.branch_count);
          this.userBranchCount = isNaN(count) ? 0 : count;
        }, () => {
          this.userBranchCount = 0;
        });
  }

  getOrderCount() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminDashboardService.getOrderCount(adminId)
      .subscribe(
        shops => {
          const orders = Number(shops?.payload?.orders_count);
          const active = Number(shops?.payload?.active_count);
          this.userOrderCount = isNaN(orders) ? 0 : orders;
          this.userActiveOrderCount = isNaN(active) ? 0 : active;
        }, () => {
          this.userOrderCount = 0;
          this.userActiveOrderCount = 0;
        });
  }

  getOrderAmount() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminDashboardService.getOrderAmounts(adminId)
      .subscribe(
        shops => {
          const received = Number(shops?.payload?.received_amount);
          const pending = Number(shops?.payload?.pending_amount);
          this.userReceivedOrderAmount = isNaN(received) ? 0 : received;
          this.userPendingOrderAmount = isNaN(pending) ? 0 : pending;
        }, () => {
          this.userReceivedOrderAmount = 0;
          this.userPendingOrderAmount = 0;
        });
  }

}
