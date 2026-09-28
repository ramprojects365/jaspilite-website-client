import { Component, OnInit } from '@angular/core';
import { Title, Meta  } from '@angular/platform-browser';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-dashboard',
  templateUrl: './nadmin-dashboard.component.html',
  styleUrls: ['./nadmin-dashboard.component.scss']
})
export class NadminDashboardComponent implements OnInit {

  constructor(private title:Title,
    private adminLoginService: AdminLoginService,
    private metaService: Meta) { }

  ngOnInit() {
    this.title.setTitle("Jaspilite | Login and Registration for grocery shops | Download today");
    this.metaService.addTags([
      {name: 'keywords', content: 'Register with Jaspilite, voucher, discount, grocery discount, free delivery, little Indian Grocery, freedelivery, groceryshopping, food delivery app, aboutjaspilite, grab delivery'},
      {name: 'description', content: 'Travel back to India and relive your fondest memories at Jaspilite Indian Grocery mobile app. Find only the most traditional and authentic provisions from all across India.'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
}
