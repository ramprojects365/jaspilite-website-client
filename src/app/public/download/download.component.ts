import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title, Meta  } from '@angular/platform-browser';

// declare var jquery: any;
// declare var $: any;
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor(private router: Router, private title:Title, private metaService: Meta) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart - Download App on Google Playstore and Apple App Store"); 
    this.metaService.updateTag(
      { name: 'keywords', content: 'Convenience Store, mini mart franchise malaysia, minimart by resto, mini mart penang,  Minimart Invite code, Minimart Voucher code, Where to get fresh groceery, Best Grocery in CyberJaya, Kerala food in Malaysia, Grocery, Big Basket, D mart, Andhra Vegetables, Haldiram, Hyderabadi Biryani, babas masala, aachi masala, spicy masala, indiangrocery, onlinegrocery, freedelivery, groceryshopping, aboutminimart, minimartmobileapp' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'Mini mart online is Malaysia most convenient online grocery ordering site, connecting people with the best grocery shops around them, in Kuala Lumpur.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
  }
}
