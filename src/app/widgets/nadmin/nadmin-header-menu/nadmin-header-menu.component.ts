import { Component, OnInit } from '@angular/core';

import { AdminLoginService } from 'src/app/services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-header-menu',
  templateUrl: './nadmin-header-menu.component.html',
  styleUrls: ['./nadmin-header-menu.component.scss']
})
export class NadminHeaderMenuComponent implements OnInit {

  constructor(
    private adminLoginService: AdminLoginService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.adminLoginService.adminLogout();
  }

}
