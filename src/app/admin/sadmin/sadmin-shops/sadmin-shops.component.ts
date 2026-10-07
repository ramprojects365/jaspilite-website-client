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
    // Live production: Start with clean empty array, load real database data only
    this.shopsData = [];
    this.updateRowGroupMetaData();
    this.loadShops();
  }

  // Mock demo data commented out - production uses live database only
  private getMockAvailableShops() {
    return [];
    /*
    return [
      { shop_id: 1, shop_name: 'Mini Mart', branch_id: 101, branch_name: 'KL Downtown', isPosEnabled: true, active: true },
      { shop_id: 2, shop_name: 'Fresh Basket', branch_id: 201, branch_name: 'PJ Section 14', isPosEnabled: true, active: true },
      { shop_id: 3, shop_name: 'Daily Needs', branch_id: 301, branch_name: 'Ampang', isPosEnabled: true, active: true },
    ];
    */
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
          } else {
            // No registered shops in DB yet
            this.shopsData = [];
            this.updateRowGroupMetaData();
          }
        },
        () => {
          this.shopsData = [];
          this.updateRowGroupMetaData();
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
