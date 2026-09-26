import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title, Meta  } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//import { AdminServices } from '../../services/admin/';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  constructor(private title:Title, private router: Router, private toastr: ToastrService, private metaService: Meta, @Inject(PLATFORM_ID) private platformId) { }
  ngOnInit() {
    this.title.setTitle("Mini Mart - faq, complaints and suggestions page");
    this.metaService.updateTag(
      { name: 'keywords', content: 'online indian grocery store in malaysia, mini mart franchise malaysia, mini mart business plan, mini market, Frequently asked questions, Best Tamil Food, Best Kerala Food, Andhra Spices, Hyderabadi Biryani, Shop for quality milk online, Lulu Hypermarket, Modern Stores Malaysia, Indian Grocery, Online Grocery, Value Bazaar Malaysia, Cyberjaya Grocery, Delivery App, GroceryShopping, Grocery Delivery' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'Indian Vegetables online Malaysia, Fresh groceries and Hot food at your doorstep in the next hour! Download Minimart now in App store or Google Play store' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );


    if(isPlatformBrowser(this.platformId)){
      $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).siblings('.panel-heading').addClass('active');
      });
    
      $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).siblings('.panel-heading').removeClass('active');
      });      
    }
  }

  // contactUs(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }
  //   const value = form.value;
  //   this.toastr.success('Your query has been submitted successfully');
  //   console.log(JSON.stringify(value));
  // }
}
