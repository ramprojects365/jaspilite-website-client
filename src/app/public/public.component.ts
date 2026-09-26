import { Component, OnInit } from '@angular/core';
import { Title, Meta  } from '@angular/platform-browser';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private title:Title, private metaService: Meta) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart - Shop for quality milk, meat and seafood online");
    this.metaService.updateTag(
      { name: 'keywords', content: 'TPL fresh meats,  grocery shopping app malaysia, Fresh cow milk, Buffalo milk, Indian Spices, Andhra Masala, Chicken, Lamb, Mutton Shop in Kualalumpur' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'At Minimart mobile app, you can choose from over thousands products spread across various categories such as quality milk, fresh meats and vegetables, food essentials, bakery, beauty and health appliances and much more. Since our mobile app is still new, we work hard to make your shopping experience wonderful. Please let us know via message or email if we missed out any of your daily needs.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
  }
}
