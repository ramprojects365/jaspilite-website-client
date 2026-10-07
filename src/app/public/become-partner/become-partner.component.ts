import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-become-partner',
  templateUrl: './become-partner.component.html',
  styleUrls: ['./become-partner.component.scss']
})
export class BecomePartnerComponent implements OnInit {

  constructor(private router: Router, private title: Title, private metaService: Meta) { }


  ngOnInit() {
    this.title.setTitle("Jaspilite - How to register a shop in Jaspilite mobile app? or How to become a Jaspilite partner?");
    this.metaService.updateTag(
      { name: 'keywords', content: 'online Indian grocery store in Malaysia, mini market nearby, jaspilite shop, ola mart, Become a jaspilite partner, how to register with Jaspilite, Indian Grocery Mobile App, Modern Stores, Biggest Indian Super market, Brickfields Grocery' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'If you want to become Jaspilite partner, please reach our team (+60142353806) with the below details. We will help you to register with us. Your name, email address, phone number, shop name, shop Address, shop logo.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
  }

}
