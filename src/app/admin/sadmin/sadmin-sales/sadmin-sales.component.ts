import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UtilityService } from '../../../services/utilities.service';
import { SadminSalesService } from './sadminsales.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-sadmin-sales',
  templateUrl: './sadmin-sales.component.html',
  styleUrls: ['./sadmin-sales.component.scss']
})
export class SadminSalesComponent implements OnInit {

  cols: any[];
  userShops = [];
  userShop: string;
  userBranches = [];
  userBranch: string;
  sales = [];

  constructor(
    private router: Router,
    private sadminSalesService: SadminSalesService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilityService: UtilityService,
    private title:Title
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'salesIdString', header: 'Sales ID' },
      { field: 'displayName', header: 'Name' },    
      { field: 'date', header: 'Date' },
      { field: 'discount', header: 'Discount' },
      { field: 'delivery_charge', header: 'Delivery Charge' },
      { field: 'total', header: 'Total' },
      { field: 'status', header: 'Status' },
    ];
    this.userShops = this.getMockShops();
    this.userShop = this.userShops[0]?.value;
    this.userBranches = this.getMockBranches(this.userShop);
    this.userBranch = this.userBranches[0]?.value;
    this.sales = this.getMockSales(this.userBranch).map(item => {
      item.date = this.utilityService.getDateTimeFormatted(item.date);
      return item;
    });
    this.getShops();
    this.title.setTitle("Mini Mart: Grocery delivery from Lulu Hypermarket, Modern Stores, UM Stores | Download today");
  }

  private getMockShops() {
    return [
      { label: 'Mini Mart', value: '1' },
      { label: 'Fresh Basket', value: '2' },
      { label: 'Daily Needs', value: '3' },
    ];
  }

  private getMockBranches(shopId: string) {
    const map = {
      '1': [
        { label: 'KL Downtown', value: '101' },
        { label: 'Brickfields', value: '102' },
        { label: 'Cheras', value: '103' },
      ],
      '2': [
        { label: 'PJ Section 14', value: '201' },
        { label: 'Shah Alam', value: '202' },
      ],
      '3': [
        { label: 'Ampang', value: '301' },
        { label: 'Setapak', value: '302' },
      ],
    };

    return map[shopId] || [];
  }

  private getMockSales(branchId: string) {
    const now = Date.now();
    const branchMeta = {
      '101': { prefix: 'KL', baseId: 4100 },
      '102': { prefix: 'BF', baseId: 4200 },
      '103': { prefix: 'CH', baseId: 4300 },
      '201': { prefix: 'PJ', baseId: 4400 },
      '202': { prefix: 'SA', baseId: 4500 },
      '301': { prefix: 'AM', baseId: 4600 },
      '302': { prefix: 'ST', baseId: 4700 },
    };

    const meta = branchMeta[branchId] || { prefix: 'BR', baseId: 4000 };
    const makeSaleIdString = (n: number) => `${meta.prefix}-${n}`;

    return [
      {
        sales_id: meta.baseId + 1,
        salesIdString: makeSaleIdString(meta.baseId + 1),
        displayName: 'Aisha Rahman',
        date: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 6,
        total: 58.9,
        status: 'Accepted',
      },
      {
        sales_id: meta.baseId + 2,
        salesIdString: makeSaleIdString(meta.baseId + 2),
        displayName: 'Daniel Lee',
        date: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
        discount: 2,
        delivery_charge: 0,
        total: 112.5,
        status: 'Delivered',
      },
      {
        sales_id: meta.baseId + 3,
        salesIdString: makeSaleIdString(meta.baseId + 3),
        displayName: 'Nur Izzah',
        date: new Date(now - 9 * 60 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 8,
        total: 74.2,
        status: 'Accepted',
      },
      {
        sales_id: meta.baseId + 4,
        salesIdString: makeSaleIdString(meta.baseId + 4),
        displayName: 'Kumar Raj',
        date: new Date(now - 28 * 60 * 60 * 1000).toISOString(),
        discount: 5,
        delivery_charge: 5,
        total: 39.0,
        status: 'Cancelled',
      },
      {
        sales_id: meta.baseId + 5,
        salesIdString: makeSaleIdString(meta.baseId + 5),
        displayName: 'Siti Amina',
        date: new Date(now - 52 * 60 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 4,
        total: 89.7,
        status: 'Delivered',
      },
    ];
  }

  getShops() {
    //const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.sadminSalesService.getAllUsersShops()
      .subscribe(
        shops => {
          const remoteShops = shops?.payload?.shops;
          if (Array.isArray(remoteShops) && remoteShops.length > 0) {
            this.userShops = remoteShops.map(item => {
              return { label: item.shop_name, value: item.shop_id };
            });
            this.userShop = this.userShops[0].value;
            this.getBranches(this.userShops[0].value);
          } else if (!Array.isArray(this.userShops) || this.userShops.length === 0) {
            this.userShops = this.getMockShops();
            this.userShop = this.userShops[0]?.value;
            this.userBranches = this.getMockBranches(this.userShop);
            this.userBranch = this.userBranches[0]?.value;
            this.sales = this.getMockSales(this.userBranch).map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          }
          // const shopIds = shops.payload.shops.map(item => item.shop_id.toString());
          // this.loadAdminUsers(shopIds.join(','));
        },
        () => {
          if (!Array.isArray(this.userShops) || this.userShops.length === 0) {
            this.userShops = this.getMockShops();
            this.userShop = this.userShops[0]?.value;
            this.userBranches = this.getMockBranches(this.userShop);
            this.userBranch = this.userBranches[0]?.value;
            this.sales = this.getMockSales(this.userBranch).map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          }
        });
  }

  getBranches(shopId) {
    this.sadminSalesService.getAllUsersBranches(shopId)
      .subscribe(
        branches => {
          const remoteBranches = branches?.payload?.branches;
          if (Array.isArray(remoteBranches) && remoteBranches.length > 0) {
            this.userBranches = remoteBranches.map(item => {
              return { label: item.branch_name, value: item.branch_id };
            });
          } else {
            this.userBranches = this.getMockBranches(shopId);
          }
          this.userBranch = this.userBranches[0] ? this.userBranches[0].value : '0';
          this.sales = this.getMockSales(this.userBranch).map(item => {
            item.date = this.utilityService.getDateTimeFormatted(item.date);
            return item;
          });
          // console.log(this.userBranch);
          this.getAllSales(this.userBranch);
        },
        () => {
          this.userBranches = this.getMockBranches(shopId);
          this.userBranch = this.userBranches[0] ? this.userBranches[0].value : '0';
          this.sales = this.getMockSales(this.userBranch).map(item => {
            item.date = this.utilityService.getDateTimeFormatted(item.date);
            return item;
          });
          this.getAllSales(this.userBranch);
        },
      );
  }

  getAllSales(branchId) {
    this.sadminSalesService.getAllSales(branchId)
      .subscribe(
        shops => {
          const remoteSales = shops?.payload?.sales;
          if (Array.isArray(remoteSales) && remoteSales.length > 0) {
            this.sales = remoteSales.map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          } else if (!Array.isArray(this.sales) || this.sales.length === 0) {
            this.sales = this.getMockSales(branchId).map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          }
          //console.log('sadmin sales'+ JSON.stringify(this.sales));
        },
        () => {
          if (!Array.isArray(this.sales) || this.sales.length === 0) {
            this.sales = this.getMockSales(branchId).map(item => {
              item.date = this.utilityService.getDateTimeFormatted(item.date);
              return item;
            });
          }
        },
      );
  }
  changeShop(event) {
    this.getBranches(event.value);
  }
  changeBranch(event) {
    this.sales = this.getMockSales(event.value).map(item => {
      item.date = this.utilityService.getDateTimeFormatted(item.date);
      return item;
    });
    this.getAllSales(event.value);
  }
  // showDetails(sale) {
  //   this.sadminSalesService.SalesId = sale;
  //   this.router.navigate(['admin/nadmin/salesdetails']);
  // }

}
