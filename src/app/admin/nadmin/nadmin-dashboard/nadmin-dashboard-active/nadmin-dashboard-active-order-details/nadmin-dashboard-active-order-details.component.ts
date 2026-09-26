import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NadminActiveService } from '../nadmin-active.service';

@Component({
  selector: 'app-nadmin-dashboard-active-order-details',
  templateUrl: './nadmin-dashboard-active-order-details.component.html',
  styleUrls: ['./nadmin-dashboard-active-order-details.component.scss']
})
export class NadminDashboardActiveOrderDetailsComponent implements OnInit {
  sale: any;
  saleDetails = [];
  cols = [];
  grandTotal: any;
  total: any;
  totalItems = 0;
  address: any;
  addressString: string;
  constructor(
    private spinner: NgxSpinnerService,
    private title:Title,
    private location: Location,
    public router: Router,
    private nadminActiveService: NadminActiveService,
  ) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart - Free delivery Mobile app for food and groceries");
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'item_price', header: 'Unit Price' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'discount', header: 'Discount' },
      { field: 'total', header: 'Total' },
    ];
    this.sale = this.nadminActiveService.sale || this.getMockSale();
    this.saleDetails = this.getMockSaleDetails();
    this.address = this.getMockAddress();
    this.addressString = this.address.unit_number + ', ' + this.address.condo_name
      + ', ' + this.address.address + ', ' + this.address.pin_code;
    this.totalItems = this.saleDetails.reduce((sum, item) => {
      return sum + parseFloat(item.quantity);
    }, 0);
    this.recalculateGrandTotal();
    this.getSalesDetails();
    this.getAddress(this.sale.address_id);
  }

  private getMockSale() {
    return {
      sales_id: 2001,
      displayName: 'Nadmin Customer 1',
      salesIdString: 'NA-2001',
      phoneNumber: '+60 12-111 2233',
      email: 'customer1@example.com',
      status: 'Accepted',
      branch_name: 'Brickfields',
      address_id: 9001,
      discount: '0',
      voucher_discount: '0',
      delivery_charge: '5',
      total: '46.40',
    };
  }

  private getMockSaleDetails() {
    return [
      {
        sales_details_id: 3001,
        name: 'Basmati Rice 5kg',
        item_price: '24.90',
        quantity: 1,
        discount: '0',
        image: 'assets/img/products/basmati-rice.png',
        item_qr_code: 'RICE-BAS-5KG',
        articleNumber: 'A-1001',
      },
      {
        sales_details_id: 3002,
        name: 'Garam Masala 100g',
        item_price: '6.50',
        quantity: 2,
        discount: '0',
        image: 'assets/img/products/garam-masala.png',
        item_qr_code: 'SPC-GMAS-100G',
        articleNumber: 'A-1002',
      },
      {
        sales_details_id: 3003,
        name: 'Masala Tea 250g',
        item_price: '10.00',
        quantity: 1,
        discount: '0',
        image: 'assets/img/products/masala-tea.png',
        item_qr_code: 'BEV-MTEA-250G',
        articleNumber: 'A-1003',
      },
    ];
  }

  private getMockAddress() {
    return {
      unit_number: '12A',
      condo_name: 'Palm Residency',
      address: 'Jalan Tun Sambanthan, Brickfields',
      pin_code: '50470',
    };
  }

  getAddress(addressId) {
    this.nadminActiveService.getAddress(addressId)
      .subscribe(
        details => {
          const addr = details?.payload?.address?.[0];
          if (addr) {
            this.address = addr;
            this.addressString = this.address.unit_number + ', ' + this.address.condo_name
              + ', ' + this.address.address + ', ' + this.address.pin_code;
          }
        },
        () => {
          this.address = this.getMockAddress();
          this.addressString = this.address.unit_number + ', ' + this.address.condo_name
            + ', ' + this.address.address + ', ' + this.address.pin_code;
        },
      );
  }
  getSalesDetails() {
    this.nadminActiveService.getSaleDetails(this.sale.sales_id)
      .subscribe(
        details => {
          const remoteDetails = details?.payload?.saledetails;
          if (Array.isArray(remoteDetails) && remoteDetails.length > 0) {
            this.saleDetails = remoteDetails;
          } else if (!Array.isArray(this.saleDetails) || this.saleDetails.length === 0) {
            this.saleDetails = this.getMockSaleDetails();
          }
          this.totalItems = this.saleDetails.reduce((sum, item) => {
            return sum + parseFloat(item.quantity);
          }, 0);
          this.recalculateGrandTotal();
        },
        () => {
          if (!Array.isArray(this.saleDetails) || this.saleDetails.length === 0) {
            this.saleDetails = this.getMockSaleDetails();
          }
          this.totalItems = this.saleDetails.reduce((sum, item) => {
            return sum + parseFloat(item.quantity);
          }, 0);
          this.recalculateGrandTotal();
        },
      );
  }
  recalculateGrandTotal() {   
    this.grandTotal = 0;
    this.total = 0;
    this.saleDetails.forEach(element => {
      this.total += ((parseFloat(element.item_price) * parseFloat(element.quantity)));
      this.grandTotal += ((parseFloat(element.item_price) * parseFloat(element.quantity)) - parseFloat(element.discount));
    });
    this.grandTotal += (parseFloat(this.sale.delivery_charge)) - (this.sale.voucher_discount ? parseFloat(this.sale.voucher_discount) : 0);
    this.grandTotal = this.grandTotal.toFixed(2);
    this.total = this.total.toFixed(2);
  }

}
