import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta  } from '@angular/platform-browser';

@Component({
  selector: 'app-pagenotfoundcomponent',
  templateUrl: './pagenotfoundcomponent.component.html',
  styleUrls: ['./pagenotfoundcomponent.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router, private title:Title, private metaService: Meta) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart - Indian Grocery Shop in Kualalumpur, Malaysia");
    this.metaService.updateTag(
      { name: 'keywords', content: 'Modern Stores, Um Stores, Value Bazaar, Haldiram, Lulu Hypermarket, Hyderabadi Biryani, Indian Spices' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'Online Indian grocery store in Brickfields Little India, Malaysia' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
  }

}
