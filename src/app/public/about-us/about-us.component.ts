import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title, Meta  } from '@angular/platform-browser';

// declare var jquery: any;
// declare var $: any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private router: Router, private title:Title, private metaService: Meta) { }

  ngOnInit() {
    this.title.setTitle("Jaspilite - About Us, Jaspilite vouchers and promo codes"); 
    this.metaService.updateTag(
      { name: 'keywords', content: 'Convenience Store, jaspilite franchise malaysia, jaspilite by resto, jaspilite penang,  Jaspilite Invite code, Jaspilite Voucher code, Where to get fresh grocery, Best Grocery in CyberJaya, Kerala food in Malaysia, Grocery, Big Basket, D mart, Andhra Vegetables, Haldiram, Hyderabadi Biryani, babas masala, aachi masala, spicy masala, indiangrocery, onlinegrocery, freedelivery, groceryshopping, aboutjaspilite, jaspilitemobileapp' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'Jaspilite online is Malaysia most convenient online grocery ordering site, connecting people with the best grocery shops around them, in Kuala Lumpur.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
  }
}
