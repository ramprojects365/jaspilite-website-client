import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Title, Meta  } from '@angular/platform-browser';

import { NadminSettingsService } from './nadminsettings.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-settings',
  templateUrl: './nadmin-settings.component.html',
  styleUrls: ['./nadmin-settings.component.scss']
})
export class NadminSettingsComponent implements OnInit {

  userShops = [];
  userShop: string;
  userBranches = [];

  constructor(
    public router: Router,
    private toastr: ToastrService,
    private adminLoginService: AdminLoginService,
    private nadminSettingsService: NadminSettingsService,
    private title:Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart | Login and Registration for grocery shops | Download today");
    this.metaService.addTags([
      {name: 'keywords', content: 'Tamil Grocery Shop, Telugu Grocery Shop in Malaysia, Food and Grocery Delivery app in malaysia, Food Panda Grocery, Sentul Grocery, Malay Grocery'},
      {name: 'description', content: 'Minimart Grocery. We are an online store selling high quality Indian spices, masalas and other groceries at reasonable price delivered direct to the home.'},
      {name: 'robots', content: 'index, follow'}
    ]);
    this.userShops = this.getMockShops();
    this.userShop = this.userShops[0]?.value;
    this.userBranches = this.getMockBranches(this.userShop);
    this.getShops();
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminSettingsService.getAllUsersShops(adminId)
      .subscribe(
        shops => {
          const remoteShops = shops?.payload?.shops;
          if (Array.isArray(remoteShops) && remoteShops.length > 0) {
            this.userShops = remoteShops.map(item => {
              return { label: item.shop_name, value: item.shop_id, address: item.shop_addr };
            });
            this.userShop = this.userShops[0]?.value;
            this.getBranches(this.userShop);
          } else if (!Array.isArray(this.userShops) || this.userShops.length === 0) {
            this.userShops = this.getMockShops();
            this.userShop = this.userShops[0]?.value;
            this.userBranches = this.getMockBranches(this.userShop);
          }
        },
        () => {
          if (!Array.isArray(this.userShops) || this.userShops.length === 0) {
            this.userShops = this.getMockShops();
          }
          this.userShop = this.userShop || this.userShops[0]?.value;
          this.userBranches = this.getMockBranches(this.userShop);
        },
      );
  }

  getBranches(shopId) {
    this.nadminSettingsService.getAllUsersBranches(shopId)
      .subscribe(
        branches => {
          const remoteBranches = branches?.payload?.branches;
          if (Array.isArray(remoteBranches) && remoteBranches.length > 0) {
            this.userBranches = remoteBranches.map(item => {
              return { label: item.branch_name, value: item.branch_id, image: item.image, active: item.active };
            });
          } else {
            this.userBranches = this.getMockBranches(shopId);
          }
          // console.log(this.userBranches);
        },
        () => {
          this.userBranches = this.getMockBranches(shopId);
        },
      );
  }

  changeShop(event) {
    this.getBranches(event.value);
  }

  editShop(shop) {
    this.router.navigate(['admin/nadmin/editshop', shop.value]);
  }

  editBranch(branch) {
    this.router.navigate(['admin/nadmin/editbranch', branch.value]);
  }

  changeStatus(event, branch_id) {
    this.nadminSettingsService.updateBranchStatus(branch_id, event)
      .subscribe(
        branches => {
          this.toastr.success('Your edit has been saved!', 'Save Successful!');
          this.getShops();
        }
      );
  }

  private getMockShops() {
    return [
      { label: 'Mini Mart', value: '1', address: 'Brickfields, Kuala Lumpur' },
      { label: 'Fresh Basket', value: '2', address: 'Petaling Jaya' },
      { label: 'Daily Needs', value: '3', address: 'Ampang, Kuala Lumpur' },
    ];
  }

  private getMockBranches(shopId: string) {
    const map = {
      '1': [
        { label: 'Brickfields', value: '102', image: './assets/img/icon-store.svg', active: true },
        { label: 'KL Downtown', value: '101', image: './assets/img/icon-store.svg', active: true },
      ],
      '2': [
        { label: 'PJ Section 14', value: '201', image: './assets/img/icon-store.svg', active: true },
        { label: 'Shah Alam', value: '202', image: './assets/img/icon-store.svg', active: false },
      ],
      '3': [
        { label: 'Ampang', value: '301', image: './assets/img/icon-store.svg', active: true },
        { label: 'Setapak', value: '302', image: './assets/img/icon-store.svg', active: false },
      ],
    };

    return map[shopId] || [];
  }

}
