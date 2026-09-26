import { Component, OnInit } from '@angular/core';
import { Title, Meta  } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promo-codes',
  templateUrl: './promo-codes.component.html',
  styleUrls: ['./promo-codes.component.scss']
})
export class PromoCodesComponent implements OnInit {

  constructor(private title:Title, private metaService: Meta,  private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart | Promo Codes and Cash Vouchers in Malaysia | Free Delivery"); 
    this.metaService.updateTag(
      { name: 'keywords', content: 'Minimart Promo Codes, Minimart Cash Vouchers, Minimart Free Coupons, Food Coupons, Free Credit, Free Delivery, Cash Back Coupons' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'Earn credit points by sharing our app with others. You can get the points once they used your invite code while they logged in. You can use credit points any time while purchasing.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    ); 
  }

}
