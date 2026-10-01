import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AdminLoginService } from 'src/app/services/admin/admin-login/adminlogin.service';
import { Globals } from '../../../globals/admin-global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit, OnDestroy {

  private adminUserSub: Subscription;
  isAuthenticated = false;

  constructor(private adminLoginService: AdminLoginService, private globals: Globals, private router: Router,) { }

  ngOnInit() {
    this.adminUserSub = this.adminLoginService.adminUser.subscribe(adminUser => {
      this.isAuthenticated = !!adminUser;
    });
  }

  ngOnDestroy(): void {
    this.adminUserSub.unsubscribe();
  }
  continueFun() {
    const userData: {
      adminId: number;
      displayName: string;
      userType: string;
      email: string;
      token: string;
      refreshToken: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem(this.globals.strUserData));

    if(userData) {
      if (userData.userType === 'sadmin') {
        this.router.navigate(['/admin/sadmin']);
      } else if (userData.userType === 'nadmin') {
        this.router.navigate(['/admin/nadmin']);
      } else if (userData.userType === 'manager') {
        this.router.navigate(['/admin/manager']);
      }else if (userData.userType === 'padmin') {
        this.router.navigate(['/admin/padmin']);
      }

    }else {
      this.router.navigate(['/admin']);
    }
    
  }
}
