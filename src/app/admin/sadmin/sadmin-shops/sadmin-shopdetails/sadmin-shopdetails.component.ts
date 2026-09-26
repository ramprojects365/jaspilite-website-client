import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { SadminshopsService } from '../sadminshops.service';

@Component({
  selector: 'app-sadmin-shopdetails',
  templateUrl: './sadmin-shopdetails.component.html',
  styleUrls: ['./sadmin-shopdetails.component.scss']
})
export class SadminShopdetailsComponent implements OnInit {

  displayDeliveryAdder = false;
  displayPaymentAdder = false;
  deliveryData = [];
  paymentData = [];
  deliveryVendors = [];
  paymentVendors = [];
  shop: any;
  currency: any;
  branchId: any;
  branchName: any;
  cols: any[];
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private sadminShopsService: SadminshopsService,
    private location: Location,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.shop = [];
    this.cols = [
      { field: 'del_ven_name', header: 'Delivery Vendor' },
      { field: 'status', header: 'Status' },
    ];
    if (this.sadminShopsService.shop === undefined) {
      this.location.back();
    } else {
      this.shop = this.sadminShopsService.shop;
      this.branchId = this.shop.branch_id;
      this.branchName = this.shop.branch_name;
      this.currency = this.shop.currency.toLowerCase();
      this.getAvailableDeliveryVendors();
      this.getAvailablePaymentVendors();
    }
  }
  getAvailableDeliveryVendors() {
    this.sadminShopsService.getDeliveryVendors(this.branchId)
      .subscribe(
        deliveryVendors => {
          //console.log('delivery vendors ' + JSON.stringify(deliveryVendors.payload.vendors));
          this.deliveryVendors = deliveryVendors.payload.vendors;
          this.getDeliveryServices();
          this.getPaymentServices();
        });
  }
  getAvailablePaymentVendors() {
    this.sadminShopsService.getPaymentVendors(this.branchId)
      .subscribe(
        paymentVendors => {
          //console.log('delivery vendors ' + JSON.stringify(deliveryVendors.payload.vendors));
          this.paymentVendors = paymentVendors.payload.paymentgateways;
          this.getPaymentServices();
        });
  }
  getDeliveryServices() {
    this.deliveryData = [];
    this.sadminShopsService.getDeliveryServices(this.currency)
      .subscribe(
        deliveryinfo => {
          this.deliveryData = deliveryinfo.payload.vendors;
          this.deliveryData.map(item => {
            for (var i = 0; i < this.deliveryData.length; i++) {
              if (this.deliveryVendors.length > 0 &&  this.deliveryVendors[i] !== undefined) {
               // console.log("Item    " + JSON.stringify(item) + " DI " + JSON.stringify(this.deliveryVendors[i]));
                if (item.delivery_vendor_id == this.deliveryVendors[i].delivery_vendor_id && item.delivery_vendor_id == this.deliveryVendors[i].vendor_id) {
                  //console.log("Item    " + item.delivery_vendor_id + " DI " + JSON.stringify(this.deliveryVendors[i].vendor_id));
                  item.status = (this.deliveryVendors[i].status == 1 ? true : false);
                  break;
                }
              }
            }
          });
        });
  }
  getPaymentServices() {
    this.paymentData = [];
    this.sadminShopsService.getPaymentServices()
      .subscribe(
        paymentinfo => {
          this.paymentData = paymentinfo.payload.paymentgateways;
          this.paymentData.map(item => {
            for (var i = 0; i < this.paymentData.length; i++) {
              if (this.paymentVendors.length > 0 &&  this.paymentVendors[i] !== undefined) {
               // console.log("Item    " + JSON.stringify(item) + " DI " + JSON.stringify(this.deliveryVendors[i]));
                if (item.payment_gateway_id == this.paymentVendors[i].payment_gateway_id && item.payment_gateway_id == this.paymentVendors[i].payment_gateway_id) {
                  //console.log("Item    " + item.delivery_vendor_id + " DI " + JSON.stringify(this.deliveryVendors[i].vendor_id));
                  item.status = (this.paymentVendors[i].status == 1 ? true : false);
                  break;
                }
              }
            }
          });
        });
  }
  showdisplayDeliveryAdder() {
    this.displayDeliveryAdder = true;
  }
  showdisplayPaymentAdder() {
    this.displayPaymentAdder = true;
  }
  submitDelivery(form: NgForm) {
    this.displayDeliveryAdder = false;
    this.getAvailableDeliveryVendors();
  }
  submitPayment(form: NgForm) {
    this.displayPaymentAdder = false;
    this.getAvailablePaymentVendors();
  }
  addDelivery(value, vendor) {
    if (value == true) {
      this.spinner.show();
      this.sadminShopsService.addDeliveryServices(vendor.delivery_vendor_id, this.branchId)
        .subscribe(response => {
          this.spinner.hide();

          this.getAvailableDeliveryVendors();
          this.toastr.success('success', 'Service enabled!');

        }, error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        });
    } else {
      this.spinner.show();
      this.sadminShopsService.removeDeliveryServices(vendor.delivery_vendor_id, this.branchId)
        .subscribe(response => {
          this.spinner.hide();

          this.getAvailableDeliveryVendors();
          this.toastr.success('success', 'Service disabled!');
        }, error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        });
    }
  }
  addPayment(value, vendor) {
    if (value == true) {
      this.spinner.show();
      this.sadminShopsService.addPaymentServices(vendor.payment_gateway_id, this.branchId)
        .subscribe(response => {
          this.spinner.hide();

          this.getAvailablePaymentVendors();
          this.toastr.success('success', 'Service enabled!');

        }, error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        });
    } else {
      this.spinner.show();
      this.sadminShopsService.removePaymentServices(vendor.payment_gateway_id, this.branchId)
        .subscribe(response => {
          this.spinner.hide();

          this.getAvailablePaymentVendors();
          this.toastr.success('success', 'Service disabled!');
        }, error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        });
    }
  }
}

