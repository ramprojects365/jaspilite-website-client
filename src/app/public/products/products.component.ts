import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta  } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private title:Title, private metaService: Meta) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart - Order Food, Grocery, Homemade Snacks, Cooking gas today");
    this.metaService.updateTag(
      { name: 'keywords', content: 'Homemade snacks, Biggest Indian grocery store in Brickfields, Cooking gas delivery, Fresh frutis, Organic Vegetables, Indian Groceries, Birayani, Modern Stores, biggest indian grocery store in Brickfields' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'The biggest Indian grocery store in Brickfields Little India, KualaLumpur' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
  }
}
