import { Component, OnInit } from '@angular/core';

import { AdminLoginService } from 'src/app/services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-sadmin-header-menu',
  templateUrl: './sadmin-header-menu.component.html',
  styleUrls: ['./sadmin-header-menu.component.scss']
})
export class SadminHeaderMenuComponent implements OnInit {

  constructor(
    private adminLoginService: AdminLoginService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.adminLoginService.adminLogout();
  }

}
