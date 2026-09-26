import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SadminshopsService } from './sadminshops.service';

@Component({
  selector: 'app-sadmin-shops',
  templateUrl: './sadmin-shops.component.html',
  styleUrls: ['./sadmin-shops.component.scss']
})
export class SadminShopsComponent implements OnInit {
  shopsData = [];
  cols: any[];
  rowGroupMetadata: any;
  constructor(
    private sadminShopsService: SadminshopsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'shop_name', header: 'Shop Name' },
      { field: 'branch_name', header: 'Branch Name' },
    ];
    this.shopsData = this.getMockAvailableShops();
    this.updateRowGroupMetaData();
    this.loadShops();
  }

  private getMockAvailableShops() {
    return [
      {
        shop_id: 1,
        shop_name: 'Mini Mart',
        branch_id: 101,
        branch_name: 'KL Downtown',
        image: 'assets/img/shops/minimart-kl.png',
        isPosEnabled: true,
        active: true,
      },
      {
        shop_id: 1,
        shop_name: 'Mini Mart',
        branch_id: 102,
        branch_name: 'Brickfields',
        image: 'assets/img/shops/minimart-brickfields.png',
        isPosEnabled: true,
        active: true,
      },
      {
        shop_id: 1,
        shop_name: 'Mini Mart',
        branch_id: 103,
        branch_name: 'Cheras',
        image: 'assets/img/shops/minimart-cheras.png',
        isPosEnabled: false,
        active: false,
      },
      {
        shop_id: 2,
        shop_name: 'Fresh Basket',
        branch_id: 201,
        branch_name: 'PJ Section 14',
        image: 'assets/img/shops/freshbasket-pj.png',
        isPosEnabled: true,
        active: true,
      },
      {
        shop_id: 2,
        shop_name: 'Fresh Basket',
        branch_id: 202,
        branch_name: 'Shah Alam',
        image: 'assets/img/shops/freshbasket-shahalam.png',
        isPosEnabled: false,
        active: true,
      },
      {
        shop_id: 3,
        shop_name: 'Daily Needs',
        branch_id: 301,
        branch_name: 'Ampang',
        image: 'assets/img/shops/dailyneeds-ampang.png',
        isPosEnabled: true,
        active: true,
      },
      {
        shop_id: 3,
        shop_name: 'Daily Needs',
        branch_id: 302,
        branch_name: 'Setapak',
        image: 'assets/img/shops/dailyneeds-setapak.png',
        isPosEnabled: true,
        active: false,
      },
    ];
  }

  onSort() {
    this.updateRowGroupMetaData();
  }
  loadShops() {
    this.sadminShopsService.getAllShopsData()
      .subscribe(
        shopsinfo => {
          const shops = shopsinfo?.payload?.shops;
          if (Array.isArray(shops) && shops.length > 0) {
            console.log('shops data ' + JSON.stringify(shops));
            this.shopsData = shops;
            this.updateRowGroupMetaData();
          } else if (!Array.isArray(this.shopsData) || this.shopsData.length === 0) {
            this.shopsData = this.getMockAvailableShops();
            this.updateRowGroupMetaData();
          }
        },
        () => {
          if (!Array.isArray(this.shopsData) || this.shopsData.length === 0) {
            this.shopsData = this.getMockAvailableShops();
            this.updateRowGroupMetaData();
          }
        });
  }
  changeStatus(event, branch_id) {
    this.sadminShopsService.updateBranchStatus(branch_id, event)
      .subscribe(
        branches => {
          this.toastr.success('Shop availability has been changed.', 'Updated successfully!');
          this.loadShops();
        }
      );
  }
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.shopsData) {
      for (let i = 0; i < this.shopsData.length; i++) {
        let rowData = this.shopsData[i];
        let shop_name = rowData.shop_name;

        if (i == 0) {
          this.rowGroupMetadata[shop_name] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.shopsData[i - 1];
          let previousRowGroup = previousRowData.shop_name;
          if (shop_name === previousRowGroup)
            this.rowGroupMetadata[shop_name].size++;
          else
            this.rowGroupMetadata[shop_name] = { index: i, size: 1 };
        }
      }
    }
  }
  showShopDetails(shop) {
    this.sadminShopsService.ShopDetails = shop;
    this.router.navigate(['admin/sadmin/shopdetails']);
  }

}
