import { Component, OnInit } from "@angular/core";

import { SadminBoxService } from "./sadmin-box.service";

@Component({
  selector: "app-sadmin-box-records",
  templateUrl: "./sadmin-box-records.component.html",
  styleUrls: ["./sadmin-box-records.component.scss"],
})
export class SadminBoxRecordsComponent implements OnInit {
  shopsCount: number = 0;
  branchesCount: number = 0;
  totalSales: number = 0;
  totalOrders: number = 0;
  pendingSales: number = 0;
  pendingOrders: number = 0;

  constructor(private sadminBoxService: SadminBoxService) {}

  ngOnInit() {
    this.shopsCount = 0;
    this.branchesCount = 0;
    this.totalSales = 0;
    this.totalOrders = 0;
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
        if (data && data.status === 200 && data.payload) {
          const received = Number(data.payload.received_amount);
          const pending = Number(data.payload.pending_amount);
          this.totalSales = isNaN(received) ? 0 : received;
          this.pendingSales = isNaN(pending) ? 0 : pending;
        } else {
          this.totalSales = 0;
          this.pendingSales = 0;
        }
      },
      (error) => {
        this.totalSales = 0;
        this.pendingSales = 0;
      },
    );
  }
  getTotalOrders() {
    this.sadminBoxService.getOrdersTotal().subscribe(
      (resData) => {
        const data = resData;
        if (data && data.status === 200 && data.payload) {
          const orders = Number(data.payload.orders_count);
          const active = Number(data.payload.active_count);
          this.totalOrders = isNaN(orders) ? 0 : orders;
          this.pendingOrders = isNaN(active) ? 0 : active;
        } else {
          this.totalOrders = 0;
          this.pendingOrders = 0;
        }
      },
      (error) => {
        this.totalOrders = 0;
        this.pendingOrders = 0;
      },
    );
  }
  getShopCount() {
    this.sadminBoxService.getShopsCount().subscribe(
      (resData) => {
        const data = resData;
        if (data && data.status === 200 && data.payload) {
          const count = Number(data.payload.shops_count);
          this.shopsCount = isNaN(count) ? 0 : count;
        } else {
          this.shopsCount = 0;
        }
      },
      (error) => {
        this.shopsCount = 0;
      },
    );
  }
  getBranchCount() {
    this.sadminBoxService.getBranchesCount().subscribe(
      (resData) => {
        const data = resData;
        if (data && data.status === 200 && data.payload) {
          const count = Number(data.payload.branch_count);
          this.branchesCount = isNaN(count) ? 0 : count;
        } else {
          this.branchesCount = 0;
        }
      },
      (error) => {
        this.branchesCount = 0;
      },
    );
  }
}
