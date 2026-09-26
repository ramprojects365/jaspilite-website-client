import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Title, Meta  } from '@angular/platform-browser';

import { UtilityService } from '../../../services/utilities.service';
import { NadminSalesService } from './nadminsales.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-sales',
  templateUrl: './nadmin-sales.component.html',
  styleUrls: ['./nadmin-sales.component.scss']
})
export class NadminSalesComponent implements OnInit {

  cols: any[];
  userShops = [];
  userShop: string;
  userBranches = [];
  userBranch: string;
  sales = [];

  constructor(
    private router: Router,
    private nadminSalesService: NadminSalesService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilityService: UtilityService,
    private title:Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'displayName', header: 'Name' },
      { field: 'date', header: 'Date' },
      { field: 'discount', header: 'Discount' },
      { field: 'delivery_charge', header: 'Delivery' },
      { field: 'total', header: 'Total' },
      { field: 'status', header: 'Status' },
      { field: 'salesIdString', header: 'Sales ID' },
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
    this.title.setTitle("Mini Mart | Grocery delivery from Lulu Hypermarket, Modern Stores, UM Stores | Download today");
    this.metaService.addTags([
      {name: 'keywords', content: 'Cyberjaya Food, Petaling Jaya Grocery Delivery, Instant Food Delivery, Same day delivery mobile app'},
      {name: 'description', content: 'Malaysia own Indian e-commerce store. Same day delivery to PJ, Klang, Shah Alam, Kajang, Brickfields, Kuala Lumpur, Selayang, Batu Caves, Klang Valley'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminSalesService.getAllUsersShops(adminId)
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
        }, () => {
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
        { label: 'Brickfields', value: '102' },
        { label: 'KL Downtown', value: '101' },
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
      '101': { prefix: 'KL', baseId: 5100 },
      '102': { prefix: 'BF', baseId: 5200 },
      '201': { prefix: 'PJ', baseId: 5400 },
      '202': { prefix: 'SA', baseId: 5500 },
      '301': { prefix: 'AM', baseId: 5600 },
      '302': { prefix: 'ST', baseId: 5700 },
    };

    const meta = branchMeta[branchId] || { prefix: 'BR', baseId: 5000 };
    const makeSaleIdString = (n: number) => `${meta.prefix}-${n}`;

    return [
      {
        sales_id: meta.baseId + 1,
        salesIdString: makeSaleIdString(meta.baseId + 1),
        displayName: 'Nadmin Buyer 1',
        date: new Date(now - 90 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 5,
        total: 46.4,
        status: 'Accepted',
      },
      {
        sales_id: meta.baseId + 2,
        salesIdString: makeSaleIdString(meta.baseId + 2),
        displayName: 'Nadmin Buyer 2',
        date: new Date(now - 4 * 60 * 60 * 1000).toISOString(),
        discount: 2,
        delivery_charge: 0,
        total: 98.0,
        status: 'Delivered',
      },
      {
        sales_id: meta.baseId + 3,
        salesIdString: makeSaleIdString(meta.baseId + 3),
        displayName: 'Nadmin Buyer 3',
        date: new Date(now - 9 * 60 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 6,
        total: 31.2,
        status: 'Accepted',
      },
      {
        sales_id: meta.baseId + 4,
        salesIdString: makeSaleIdString(meta.baseId + 4),
        displayName: 'Nadmin Buyer 4',
        date: new Date(now - 28 * 60 * 60 * 1000).toISOString(),
        discount: 5,
        delivery_charge: 5,
        total: 67.9,
        status: 'Cancelled',
      },
      {
        sales_id: meta.baseId + 5,
        salesIdString: makeSaleIdString(meta.baseId + 5),
        displayName: 'Nadmin Buyer 5',
        date: new Date(now - 52 * 60 * 60 * 1000).toISOString(),
        discount: 0,
        delivery_charge: 4,
        total: 120.75,
        status: 'Delivered',
      },
    ];
  }

  getBranches(shopId) {
    this.nadminSalesService.getAllUsersBranches(shopId)
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
    this.nadminSalesService.getAllSales(branchId)
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
           //console.log('sales with remarks ' + JSON.stringify(this.sales));
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
  showDetails(sale) {
    this.nadminSalesService.SalesId = sale;
    this.router.navigate(['admin/nadmin/salesdetails']);
  }
}
