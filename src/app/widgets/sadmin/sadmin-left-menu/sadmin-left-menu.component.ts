import { Component, OnInit } from '@angular/core';

import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';
import { AdminUser } from 'src/app/model/admin/adminuser.model';

@Component({
  selector: 'app-sadmin-left-menu',
  templateUrl: './sadmin-left-menu.component.html',
  styleUrls: ['./sadmin-left-menu.component.scss']
})
export class SadminLeftMenuComponent implements OnInit {

  adminUser: AdminUser;

  constructor(
    private adminLoginService: AdminLoginService,
  ) { }

  ngOnInit() {
    // this.getUserData();
  }

  getUserData() {
    console.log(this.adminLoginService.adminUser);
    this.adminLoginService.adminUser
      .subscribe(
        userData => {
          if (userData) {
            this.adminUser = new AdminUser(userData, userData.getToken, userData.refreshToken, new Date(userData.tokenExpirationDate));
            // console.log('Got admin user ...' + JSON.stringify(this.adminUser));
          }
        }
      );
  }

}
