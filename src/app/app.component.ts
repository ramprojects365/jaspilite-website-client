import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AdminLoginService } from './services/admin/admin-login/adminlogin.service';
import { CanonicalService } from './shared/canonical.service';
import { Title, Meta  } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private adminLoginService: AdminLoginService,
    private canonicalService: CanonicalService,
    private title:Title, 
    private metaService: Meta,
    
    @Inject(PLATFORM_ID) private platformId,
  ) { }

  ngOnInit() {
    this.title.setTitle("mini mart online  - Fresh Groceries Shopping App in Malaysia");
    this.metaService.updateTag(
      { name: 'keywords', content: 'malayali shop near me, TPL fresh meats, Fresh cow milk, mini mart franchise malaysia, Buffalo milk, Indian Spices, Andhra Masala, Chicken, Lamb, Mutton Shop in Kualalumpur' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'At Minimart mobile app, you can choose from over thousands products spread across various categories such as quality milk, fresh meats and vegetables, food essentials, bakery, beauty and health appliances and much more. Since our mobile app is still new, we work hard to make your shopping experience wonderful. Please let us know via message or email if we missed out any of your daily needs.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );

    if (isPlatformBrowser(this.platformId)) {
      this.adminLoginService.autoAdminLogin();
    }
    this.canonicalService.setCanonicalURL();
  }
}
