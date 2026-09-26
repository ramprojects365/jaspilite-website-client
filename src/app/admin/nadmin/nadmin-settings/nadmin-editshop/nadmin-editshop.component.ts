import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { NadminSettingsService } from '../nadminsettings.service';

@Component({
  selector: 'app-nadmin-editshop',
  templateUrl: './nadmin-editshop.component.html',
  styleUrls: ['./nadmin-editshop.component.scss']
})
export class NadminEditshopComponent implements OnInit {

  shopId: string;
  userShop?: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private nadminSettingsService: NadminSettingsService,
  ) { }

  ngOnInit() {
    this.userShop = {};
    this.shopId = this.route.snapshot.paramMap.get('shop');
    this.getShopDetails(this.shopId);
  }

  getShopDetails(shopId) {
    this.nadminSettingsService.getShopById(shopId)
      .subscribe(
        shop => {
          this.userShop = shop.payload.shops[0];
        });
  }

  updateShop(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    value.shop_id = this.shopId;
    // console.log(value);
    this.spinner.show();
    this.nadminSettingsService.updateShop(value)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('The new shop you have added has been updated.!', 'Shop Updated!');
          form.reset();
          this.router.navigate(['admin/nadmin/settings']);
        } else {
          // console.log(response);
          this.toastr.error('The new shop you have updated has not been saved!', 'Shop Not Updated!');
        }
      }, error => {
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

}
