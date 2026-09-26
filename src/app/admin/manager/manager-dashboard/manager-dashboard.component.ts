import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

  constructor(
    private adminLoginService: AdminLoginService,
  ) { }

  ngOnInit() {
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
}
