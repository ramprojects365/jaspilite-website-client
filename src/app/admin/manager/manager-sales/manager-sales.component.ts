import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

import { UtilityService } from '../../../services/utilities.service';
import { ManagerSalesService } from './managersales.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';


@Component({
  selector: 'app-manager-sales',
  templateUrl: './manager-sales.component.html',
  styleUrls: ['./manager-sales.component.scss']
})
export class ManagerSalesComponent implements OnInit {

  cols: any[];
  userShops = [];
  userShop: string;
  userBranches = [];
  userBranch: any;
  sales = [];

  constructor(
    private router: Router,
    private managerSalesService: ManagerSalesService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'displayName', header: 'Name' },
      { field: 'date', header: 'Date' },
      { field: 'discount', header: 'Discount' },
      { field: 'delivery_charge', header: 'Delivery Charge' },
      { field: 'total', header: 'Total' },
      { field: 'status', header: 'Status' },
    ];
    // this.getShops();
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.managerSalesService.getMyBranch(adminId)
      .subscribe(
        branch => {
          this.userBranch = branch.payload.branchdetails[0] || null;
          this.getAllSales(this.userBranch.branch_id)
        });
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
  // getShops() {
  //   const adminId = this.adminLoginService.adminUser.getValue().adminId;
  //   this.managerSalesService.getAllUsersShops(adminId)
  //     .subscribe(
  //       shops => {
  //         this.userShops = shops.payload.shops.map(item => {
  //           return { label: item.shop_name, value: item.shop_id };
  //         });
  //         this.userShop = this.userShops[0].value;
  //         // console.log(this.userShops);
  //         this.getBranches(this.userShops[0].value);
  //         // const shopIds = shops.payload.shops.map(item => item.shop_id.toString());
  //         // this.loadAdminUsers(shopIds.join(','));
  //       });
  // }

  // getBranches(shopId) {
  //   this.managerSalesService.getAllUsersBranches(shopId)
  //     .subscribe(
  //       branches => {
  //         this.userBranches = branches.payload.branches.map(item => {
  //           return { label: item.branch_name, value: item.branch_id };
  //         });
  //         if (this.userBranches[0]) {
  //           this.userBranch = this.userBranches[0].value;
  //         } else {
  //           this.userBranch = '0';
  //         }
  //         // console.log(this.userBranch);
  //         this.getAllSales(this.userBranch);
  //       }
  //     );
  // }

  getAllSales(branchId) {
    this.managerSalesService.getAllSales(branchId)
      .subscribe(
        shops => {
          this.sales = shops.payload.sales.map(item => {
            item.date = this.utilityService.getDateTimeFormatted(item.date);
            return item;
          });
          // console.log(this.sales);
        });
  }

  // changeShop(event) {
  //   this.getBranches(event.value);
  // }

  // changeBranch(event) {
  //   this.getAllSales(event.value);
  // }

  showDetails(sale) {
    // console.log(sale);
    this.managerSalesService.SalesId = sale;
    this.router.navigate(['admin/manager/salesdetails']);
  }

}
