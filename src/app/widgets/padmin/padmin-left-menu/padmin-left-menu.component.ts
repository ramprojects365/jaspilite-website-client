import { Component, OnInit } from '@angular/core';
import { AdminUser } from 'src/app/model/admin/adminuser.model';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-padmin-left-menu',
  templateUrl: './padmin-left-menu.component.html',
  styleUrls: ['./padmin-left-menu.component.scss']
})
export class PadminLeftMenuComponent implements OnInit {
  adminUser: AdminUser;
  constructor(private adminLoginService: AdminLoginService) { }

  ngOnInit() {
    this.getUserData();
  }
  getUserData() {
    this.adminLoginService.adminUser
      .subscribe(
        userData => {
          if (userData) {
            this.adminUser = new AdminUser(userData, userData.getToken, userData.refreshToken, new Date(userData.tokenExpirationDate));
          }
        }
      );
  }
}
