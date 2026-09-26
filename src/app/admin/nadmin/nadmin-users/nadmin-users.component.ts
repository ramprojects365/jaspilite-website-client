import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';

import { NadminUsersService } from './nadminusers.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-users',
  templateUrl: './nadmin-users.component.html',
  styleUrls: ['./nadmin-users.component.scss']
})
export class NadminUsersComponent implements OnInit {

  adminUsers = [];
  private clonedUser: { admin_id: any; };
  pass = '';
  userStatus: any[];
  userTypes: any[];
  userType: string;
  userShops = [];
  userShop: string;
  userBranches = [];
  userBranch: string;
  displayUserAdder = false;
  cols: any[];

  constructor(
    private nadminUsersService: NadminUsersService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title:Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart - Online food delivery app like food panda and grab food");
    this.cols = [
      { field: 'display_name', header: 'Name' },
      { field: 'type', header: 'Type' },
      { field: 'branch_name', header: 'Branch' },
      { field: 'status', header: 'Status' },
    ];
    this.userTypes = [
      { label: 'Manager', value: 'manager' },
    ];
    this.userStatus = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
    this.userShops = this.getMockShops();
    this.userShop = this.userShops[0]?.value;
    this.userBranches = this.getMockBranches(this.userShop);
    this.userBranch = this.userBranches[0]?.value;
    this.adminUsers = this.getMockUsers();
    this.getShops();
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminUsersService.getAllUsersShops(adminId)
      .subscribe(
        shops => {
          const remoteShops = shops?.payload?.shops;
          if (Array.isArray(remoteShops) && remoteShops.length > 0) {
            this.userShops = remoteShops.map(item => {
              return { label: item.shop_name, value: item.shop_id };
            });
            this.userShop = this.userShops[0]?.value;
            this.getBranches(this.userShop);
            const shopIds = remoteShops.map(item => item.shop_id.toString());
            this.loadAdminUsers(shopIds.join(','));
          } else {
            this.userShops = this.getMockShops();
            this.userShop = this.userShops[0]?.value;
            this.userBranches = this.getMockBranches(this.userShop);
            this.userBranch = this.userBranches[0]?.value;
            this.loadAdminUsers('');
          }
        },
        () => {
          this.userShops = this.getMockShops();
          this.userShop = this.userShops[0]?.value;
          this.userBranches = this.getMockBranches(this.userShop);
          this.userBranch = this.userBranches[0]?.value;
          this.loadAdminUsers('');
        },
      );
  }

  getBranches(shopId) {
    this.nadminUsersService.getAllUsersBranches(shopId)
      .subscribe(
        branches => {
          const remoteBranches = branches?.payload?.branches;
          if (Array.isArray(remoteBranches) && remoteBranches.length > 0) {
            this.userBranches = remoteBranches.map(item => {
              return { label: item.branch_name, value: item.branch_id };
            });
          } else {
            this.userBranches = this.getMockBranches(shopId);
          }
          this.userBranch = this.userBranches[0]?.value;
          // console.log(this.userBranch);
        },
        () => {
          this.userBranches = this.getMockBranches(shopId);
          this.userBranch = this.userBranches[0]?.value;
        },
      );
  }

  loadAdminUsers(shopIds) {
    this.nadminUsersService.getAllAdminUsers(shopIds)
      .subscribe(
        admUsers => {
          //console.log(admUsers.payload.users);
          const users = admUsers?.payload?.users;
          if (Array.isArray(users) && users.length > 0) {
            this.adminUsers = users;
          } else if (!Array.isArray(this.adminUsers) || this.adminUsers.length === 0) {
            this.adminUsers = this.getMockUsers();
          }
        },
        () => {
          if (!Array.isArray(this.adminUsers) || this.adminUsers.length === 0) {
            this.adminUsers = this.getMockUsers();
          }
        },
      );
  }

  private getMockUsers() {
    return [
      {
        admin_id: 901,
        display_name: 'Branch Manager 1',
        email: 'manager1@example.com',
        user_type: 'manager',
        branch_name: 'Brickfields',
        status: 'active',
      },
      {
        admin_id: 902,
        display_name: 'Branch Manager 2',
        email: 'manager2@example.com',
        user_type: 'manager',
        branch_name: 'Brickfields',
        status: 'inactive',
      },
      {
        admin_id: 903,
        display_name: 'Branch Manager 3',
        email: 'manager3@example.com',
        user_type: 'manager',
        branch_name: 'KL Downtown',
        status: 'active',
      },
      {
        admin_id: 904,
        display_name: 'Branch Manager 4',
        email: 'manager4@example.com',
        user_type: 'manager',
        branch_name: 'PJ Section 14',
        status: 'active',
      },
      {
        admin_id: 905,
        display_name: 'Branch Manager 5',
        email: 'manager5@example.com',
        user_type: 'manager',
        branch_name: 'Shah Alam',
        status: 'inactive',
      },
    ];
  }

  private getMockShops() {
    return [
      { label: 'Mini Mart', value: '1' },
      { label: 'Fresh Basket', value: '2' },
    ];
  }

  private getMockBranches(shopId: string) {
    const map = {
      '1': [
        { label: 'Brickfields', value: '102' },
        { label: 'KL Downtown', value: '101' },
      ],
      '2': [
        { label: 'PJ Section 14', value: '201' },
        { label: 'Shah Alam', value: '202' },
      ],
    };

    return map[shopId] || [{ label: 'Default Branch', value: '0' }];
  }

  onRowEditInit(user) {
    this.clonedUser = { ...user };
    this.pass = '';
    // console.log(this.clonedUser);
  }

  onRowEditCancel(user, index: number) {
    const userIndex = this.adminUsers.findIndex(item => item.admin_id === this.clonedUser.admin_id);
    // console.log(userIndex);
    this.adminUsers[userIndex] = this.clonedUser;
    this.adminUsers = [...this.adminUsers];
    this.clonedUser = null;
    this.pass = '';
    this.toastr.warning('Your edit has not been saved!', 'Edit Cancelled!');
  }

  onRowEditSave(user) {
    const modifiedUser = user;
    // console.log('Pass - ' + this.pass);
    if (this.pass !== '') {
      // Add password when changed
      modifiedUser.password = this.pass;
    } else {
      modifiedUser.password = '';
    }
    // console.log(modifiedUser.password);
    // Preloader
    this.spinner.show();
    this.nadminUsersService.updateAdminUser(modifiedUser)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('Your edit has been saved!', 'Save Successful!');
          this.getShops();
        } else if (response.status === 406) {
          this.toastr.warning('You have not changed anything!', 'Nothing to save!');
        } else {
          // console.log(response);
          this.toastr.error('Your edit has not been saved or you have no edits!', 'Save User Failed!');
        }
      }, error => {
        this.getShops();
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

  showdisplayUserAdder() {
    // this.selectedCatInAddProd = this.categories[0].category_id;
    this.userType = 'manager';
    this.userShop = this.userShop || this.userShops[0]?.value;
    if (!this.userBranches || this.userBranches.length === 0) {
      this.userBranches = this.getMockBranches(this.userShop);
    }
    this.userBranch = this.userBranch || this.userBranches[0]?.value;
    this.displayUserAdder = true;
  }

  cancelUserAdder(form: NgForm) {
    form.reset();
    this.displayUserAdder = false;
  }

  addNewUser(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    console.log(value);
    if (value.passwd === value.confirmpasswd) {
      this.spinner.show();
      this.nadminUsersService.addAdminUser(value)
        .subscribe(response => {
          // console.log(response);
          this.spinner.hide();
          // this.loadAdminUsers();
          if (response.status === 201) {
            this.toastr.success('The new user you have added has been saved.!', 'Used Added!');
            this.getShops();
            form.reset({
              userType: 'nadmin'
            });
            this.userType = 'nadmin';
            this.displayUserAdder = false;
            this.getShops();
          } else {
            // console.log(response);
            this.toastr.error('The new user you have added has not been saved!', 'User Not Added!');
          }
        }, error => {
          // this.loadAdminUsers();
          this.spinner.hide();
          if (error.error.message === 'The resource already exists in database') {
            this.toastr.error('The email you have entered already exists!', 'Email exists!');
          } else {
            this.toastr.error(error.error.message, 'Error!');
          }
        });
    } else {
      this.toastr.warning('Passwords you have entered does not match!', 'Password Mismatch!');
      return;
    }
  }

}
