import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta  } from '@angular/platform-browser';

@Component({
  selector: 'app-become-partner',
  templateUrl: './become-partner.component.html',
  styleUrls: ['./become-partner.component.scss']
})
export class BecomePartnerComponent implements OnInit {

  constructor(private router: Router, private title:Title, private metaService: Meta) { }


  ngOnInit() {
    this.title.setTitle("Mini Mart - How to register a shop in Minimart mobile app? or How to become a Minimart partner?");
    this.metaService.updateTag(
      { name: 'keywords', content: 'online Indian grocery store in Malaysia, mini market nearby, mini mart shop, ola mart, Become a minimart partner, how to register with Minimart, Indian Grocery Mobile App, Modern Stores, Biggest Indian Super market, Brickfields Grocery' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'If you want to become Minimart partner, please reach our team (+60 10 544 9974) with the below details. We will help you to register with us. Your name, email address, phone number, shop name, shop Address, shop logo.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
  }

}
