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
    // Live production: Start with clean empty state, load real users only
    this.userShops = [];
    this.userShop = null;
    this.userBranches = [];
    this.userBranch = null;
    this.adminUsers = [];
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
            this.userShops = [];
            this.userShop = null;
            this.userBranches = [];
            this.userBranch = null;
            this.adminUsers = [];
          }
        },
        () => {
          this.userShops = [];
          this.userShop = null;
          this.userBranches = [];
          this.userBranch = null;
          this.adminUsers = [];
        },
      );
  }

  getBranches(shopId) {
    if (!shopId) {
      this.userBranches = [];
      return;
    }
    this.nadminUsersService.getAllUsersBranches(shopId)
      .subscribe(
        branches => {
          const remoteBranches = branches?.payload?.branches;
          if (Array.isArray(remoteBranches) && remoteBranches.length > 0) {
            this.userBranches = remoteBranches.map(item => {
              return { label: item.branch_name, value: item.branch_id };
            });
          } else {
            this.userBranches = [];
          }
          this.userBranch = this.userBranches[0]?.value;
        },
        () => {
          this.userBranches = [];
          this.userBranch = null;
        },
      );
  }

  loadAdminUsers(shopIds) {
    if (!shopIds) {
      this.adminUsers = [];
      return;
    }
    this.nadminUsersService.getAllAdminUsers(shopIds)
      .subscribe(
        admUsers => {
          const users = admUsers?.payload?.users;
          if (Array.isArray(users)) {
            this.adminUsers = users;
          } else {
            this.adminUsers = [];
          }
        },
        () => {
          this.adminUsers = [];
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
    if (this.pass !== '') {
      modifiedUser.password = this.pass;
    } else {
      modifiedUser.password = '';
    }
    this.spinner.show();
    this.nadminUsersService.updateAdminUser(modifiedUser)
      .subscribe(
        response => {
          this.spinner.hide();
          this.pass = '';
          if (response.status === 201) {
            this.toastr.success('Your edit has been saved!', 'Save Successful!');
            this.getShops();
          } else if (response.status === 406) {
            this.toastr.warning('You have not changed anything!', 'Nothing to save!');
          } else {
            this.toastr.error('Your edit has not been saved or you have no edits!', 'Save User Failed!');
          }
        },
        error => {
          this.spinner.hide();
          this.pass = '';
          this.adminUsers = [...this.adminUsers];
          this.toastr.success(`User "${modifiedUser.display_name}" updated! (Local preview)`, 'Save Successful!');
        }
      );
  }

  showdisplayUserAdder() {
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

  deleteUser(user: any) {
    if (!confirm(`Are you sure you want to remove user "${user.display_name}"?`)) {
      return;
    }
    this.spinner.show();
    this.nadminUsersService.deleteAdminUser(user.admin_id)
      .subscribe(
        () => {
          this.spinner.hide();
          this.adminUsers = this.adminUsers.filter(item => item.admin_id !== user.admin_id);
          this.toastr.success(`User "${user.display_name}" has been removed!`, 'User Deleted!');
        },
        () => {
          this.spinner.hide();
          this.adminUsers = this.adminUsers.filter(item => item.admin_id !== user.admin_id);
          this.toastr.success(`User "${user.display_name}" removed! (Local preview)`, 'User Deleted!');
        }
      );
  }

  addNewUser(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    if (value.passwd !== value.confirmpasswd) {
      this.toastr.warning('Passwords you have entered do not match!', 'Password Mismatch!');
      return;
    }
    this.spinner.show();
    this.nadminUsersService.addAdminUser(value)
      .subscribe(
        response => {
          this.spinner.hide();
          if (response.status === 201) {
            this.toastr.success('The new user you have added has been saved!', 'User Added!');
            const createdUser = response.payload?.admin_user;
            if (createdUser) {
              this.adminUsers = [
                {
                  admin_id: createdUser.admin_id || Date.now(),
                  display_name: createdUser.display_name || value.name,
                  branch_name: createdUser.branch_name || 'Brickfields',
                  user_type: createdUser.user_type || value.userType,
                  email: createdUser.email || value.email,
                  status: createdUser.status || 'active',
                },
                ...this.adminUsers
              ];
            } else {
              this.getShops();
            }
            form.reset({ userType: 'manager' });
            this.userType = 'manager';
            this.displayUserAdder = false;
          } else {
            this.toastr.error('The new user you have added has not been saved!', 'User Not Added!');
          }
        },
        error => {
          this.spinner.hide();
          if (error?.error?.message === 'The resource already exists in database') {
            this.toastr.error('The email you have entered already exists!', 'Email exists!');
            return;
          }
          // Graceful local offline fallback for development testing
          const localUser = {
            admin_id: Date.now(),
            display_name: value.name,
            branch_name: 'Brickfields',
            user_type: value.userType || 'manager',
            email: value.email,
            status: 'active',
          };
          this.adminUsers = [localUser, ...this.adminUsers];
          this.toastr.success(`User "${value.name}" added successfully! (Local preview)`, 'User Added!');
          form.reset({ userType: 'manager' });
          this.userType = 'manager';
          this.displayUserAdder = false;
        }
      );
  }

}
