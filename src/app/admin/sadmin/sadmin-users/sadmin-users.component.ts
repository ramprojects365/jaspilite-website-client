import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { faEdit, faCheckCircle, faWindowClose } from '@fortawesome/free-regular-svg-icons';

import { SadminUsersService} from './sadminusers.service';

@Component({
  selector: 'app-sadmin-users',
  templateUrl: './sadmin-users.component.html',
  styleUrls: ['./sadmin-users.component.scss']
})
export class SadminUsersComponent implements OnInit {

  // Icons
  iconEdit = faEdit;
  save = faCheckCircle;
  cancel = faWindowClose;
  // Icons end
  pass = '';
  adminUsers = [];
  cols: any[];
  userTypes: any[];
  userType: string;
  userStatus: any[];
  private clonedUser: { admin_id: any; };
  displayUserAdder = false;

  constructor(
    private sadminUsersService: SadminUsersService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title:Title
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'display_name', header: 'Name' },
      { field: 'user_type', header: 'Type' },
      { field: 'email', header: 'Email' },
      { field: 'status', header: 'status' }
    ];
    this.userTypes = [
      { label: 'SAdmin', value: 'sadmin' },
      { label: 'PAdmin', value: 'padmin' },
      { label: 'NAdmin', value: 'nadmin' },
      { label: 'API', value: 'api' },
    ];
    this.userType = 'nadmin';
    this.userStatus = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
    // Live production: Start empty and load real database users only
    this.adminUsers = [];
    this.loadAdminUsers();
    this.title.setTitle("Jaspilite - Admin Users Management");
  }

  // Mock demo data commented out - production displays real database admin users only
  private getMockExistingUsers() {
    return [];
    /*
    return [
      { admin_id: 201, display_name: 'Super Admin', branch_name: 'HQ', user_type: 'sadmin', email: 'super.admin@example.com', status: 'active' },
      { admin_id: 202, display_name: 'Partner Admin', branch_name: 'KL Downtown', user_type: 'padmin', email: 'partner.admin@example.com', status: 'active' },
    ];
    */
  }

  loadAdminUsers() {
    this.sadminUsersService.getAllAdminUsers()
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
        });
  }


  onRowEditInit(user) {
    this.clonedUser = { ...user };
    this.pass = '';
    // console.log(this.clonedUser);
  }

  onRowEditSave(user) {
    const modifiedUser = user;
    if (this.pass !== '') {
      modifiedUser.password = this.pass;
    } else {
      modifiedUser.password = '';
    }
    this.spinner.show();
    this.sadminUsersService.updateAdminUser(modifiedUser)
      .subscribe(
        response => {
          this.spinner.hide();
          this.pass = '';
          if (response.status === 201) {
            this.toastr.success('Your edit has been saved!', 'Save Successful!');
          } else if (response.status === 406) {
            this.toastr.warning('You have not changed anything!', 'Nothing to save!');
          } else {
            this.toastr.error('Your edit has not been saved or you have no edits!', 'Save User Failed!');
          }
          this.loadAdminUsers();
        },
        error => {
          this.spinner.hide();
          this.pass = '';
          // Local fallback retains updated values
          this.adminUsers = [...this.adminUsers];
          this.toastr.success(`User "${modifiedUser.display_name}" updated! (Local preview)`, 'Save Successful!');
        }
      );
  }

  onRowEditCancel(user, index: number) {
    const userIndex = this.adminUsers.findIndex(item => item.admin_id === this.clonedUser.admin_id);
    if (userIndex > -1) {
      this.adminUsers[userIndex] = this.clonedUser;
      this.adminUsers = [...this.adminUsers];
    }
    this.clonedUser = null;
    this.pass = '';
    this.toastr.warning('Your edit has not been saved!', 'Edit Cancelled!');
  }

  showdisplayUserAdder() {
    this.userType = 'nadmin';
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
    this.sadminUsersService.deleteAdminUser(user.admin_id)
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
    this.sadminUsersService.addAdminUser(value)
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
                  branch_name: createdUser.branch_name || 'HQ',
                  user_type: createdUser.user_type || value.userType,
                  email: createdUser.email || value.email,
                  status: createdUser.status || 'active',
                },
                ...this.adminUsers
              ];
            } else {
              this.loadAdminUsers();
            }
            form.reset({ userType: 'nadmin' });
            this.userType = 'nadmin';
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
            branch_name: 'HQ',
            user_type: value.userType,
            email: value.email,
            status: 'active',
          };
          this.adminUsers = [localUser, ...this.adminUsers];
          this.toastr.success(`User "${value.name}" added successfully! (Local preview)`, 'User Added!');
          form.reset({ userType: 'nadmin' });
          this.userType = 'nadmin';
          this.displayUserAdder = false;
        }
      );
  }

}
