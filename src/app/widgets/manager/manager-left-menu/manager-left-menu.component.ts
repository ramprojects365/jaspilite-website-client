import { Component, OnInit } from '@angular/core';
import { AdminUser } from 'src/app/model/admin/adminuser.model';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-manager-left-menu',
  templateUrl: './manager-left-menu.component.html',
  styleUrls: ['./manager-left-menu.component.scss']
})
export class ManagerLeftMenuComponent implements OnInit {
  adminUser: AdminUser;
  constructor(private adminLoginService: AdminLoginService) { }

  ngOnInit() {
    this.getUserData();
  }
  
  getUserData() {
    // console.log(this.adminLoginService.adminUser);
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
