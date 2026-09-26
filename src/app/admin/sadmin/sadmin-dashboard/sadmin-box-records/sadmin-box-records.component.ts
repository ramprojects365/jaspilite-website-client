import { Component, OnInit } from "@angular/core";

import { SadminBoxService } from "./sadmin-box.service";

@Component({
  selector: "app-sadmin-box-records",
  templateUrl: "./sadmin-box-records.component.html",
  styleUrls: ["./sadmin-box-records.component.scss"],
})
export class SadminBoxRecordsComponent implements OnInit {
  shopsCount: number;
  branchesCount: number;
  totalSales: number;
  totalOrders: number;
  pendingSales: number;
  pendingOrders: number;

  constructor(private sadminBoxService: SadminBoxService) {}

  ngOnInit() {
    this.shopsCount = 14;
    this.branchesCount = 22;
    this.totalSales = 240;
    this.totalOrders = 190;
    this.pendingSales = 0;
    this.pendingOrders = 0;
    this.getShopCount();
    this.getBranchCount();
    this.getTotalSales();
    this.getTotalOrders();
  }
  getTotalSales() {
    this.sadminBoxService.getSalesTotal().subscribe(
      (resData) => {
        const data = resData;
        //console.log(data);
        if (data.status === 200) {
          // if(data.payload.received_amount == null){
          //   this.totalSales = 0;
          // }else {
          //   this.totalSales = data.payload.received_amount || 0;
          //   this.pendingSales = data.payload.pending_amount || 0;
          // }
          this.totalSales = data.payload.received_amount || this.totalSales;
          this.pendingSales = data.payload.pending_amount || this.pendingSales;
        } else {
          // console.log('Error - ' + error);
        }
      },
      (error) => {
        this.totalSales = 240;
        this.pendingSales = 0;
      },
    );
  }
  getTotalOrders() {
    this.sadminBoxService.getOrdersTotal().subscribe(
      (resData) => {
        const data = resData;
        //console.log(data);
        if (data.status === 200) {
          // if(data.payload.orders_count == null){
          //   this.totalOrders = 0;
          // }else {
          //   this.totalOrders = data.payload.orders_count;
          //   this.pendingOrders = data.payload.active_count;
          // }
          this.totalOrders = data.payload.orders_count || this.totalOrders;
          this.pendingOrders = data.payload.active_count || this.pendingOrders;
        } else {
          // console.log('Error - ' + error);
        }
      },
      (error) => {
        this.totalOrders = 190;
        this.pendingOrders = 0;
      },
    );
  }
  getShopCount() {
    this.sadminBoxService.getShopsCount().subscribe(
      (resData) => {
        const data = resData;
        // console.log(data);
        if (data.status === 200) {
          this.shopsCount = data.payload.shops_count || this.shopsCount;
        } else {
          // console.log('Error - ' + error);
        }
      },
      (error) => {
        this.shopsCount = 14;
      },
    );
  }
  getBranchCount() {
    this.sadminBoxService.getBranchesCount().subscribe(
      (resData) => {
        const data = resData;
        // console.log(data);
        if (data.status === 200) {
          this.branchesCount = data.payload.branch_count || this.branchesCount;
        } else {
          // console.log('Error - ' + error);
        }
      },
      (error) => {
        this.branchesCount = 22;
      },
    );
  }
}
