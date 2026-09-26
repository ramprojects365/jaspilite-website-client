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
    this.adminUsers = this.getMockExistingUsers();
    this.loadAdminUsers();
    this.title.setTitle("Mini Mart - Brickfileds Grocery Store for home delivery");
  }

  private getMockExistingUsers() {
    return [
      {
        admin_id: 201,
        display_name: 'Super Admin',
        branch_name: 'HQ',
        user_type: 'sadmin',
        email: 'super.admin@example.com',
        status: 'active',
      },
      {
        admin_id: 202,
        display_name: 'Partner Admin',
        branch_name: 'KL Downtown',
        user_type: 'padmin',
        email: 'partner.admin@example.com',
        status: 'active',
      },
      {
        admin_id: 203,
        display_name: 'N Admin - Brickfields',
        branch_name: 'Brickfields',
        user_type: 'nadmin',
        email: 'nadmin.brickfields@example.com',
        status: 'active',
      },
      {
        admin_id: 204,
        display_name: 'N Admin - PJ',
        branch_name: 'PJ Section 14',
        user_type: 'nadmin',
        email: 'nadmin.pj@example.com',
        status: 'inactive',
      },
      {
        admin_id: 205,
        display_name: 'API User',
        branch_name: 'System',
        user_type: 'api',
        email: 'api.user@example.com',
        status: 'active',
      },
    ];
  }

  loadAdminUsers() {
    // const user: AdminUser = new AdminUser(userData, userData.getToken, userData.refreshToken,
    //   new Date(userData.tokenExpirationDate));

    // this.adminLoginService.adminUser
    //   .subscribe(
    //     userData => {
    //       const user: AdminUser = new AdminUser(userData, userData.getToken, userData.refreshToken,
    //         new Date(userData.tokenExpirationDate));
    //       console.log('Got admin user ...' + JSON.stringify(user.adminId));
    //       this.sadminUsersService.getAllAdminUsers()
    //         .subscribe(
    //           admUsers => {
    //             console.log(admUsers.payload.users);
    //             this.adminUsers = admUsers.payload.users;
    //             // $('.dataTables-example').DataTable();
    //             // this.initializeDataTable();
    //           });
    //     });


    this.sadminUsersService.getAllAdminUsers()
      .subscribe(
        admUsers => {
          const users = admUsers?.payload?.users;
          if (Array.isArray(users) && users.length > 0) {
            this.adminUsers = users;
          }
        },
        () => {
          if (!Array.isArray(this.adminUsers) || this.adminUsers.length === 0) {
            this.adminUsers = this.getMockExistingUsers();
          }
        });
  }


  onRowEditInit(user) {
    this.clonedUser = { ...user };
    this.pass = '';
    // console.log(this.clonedUser);
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
    this.sadminUsersService.updateAdminUser(modifiedUser)
      .subscribe(response => {
        // console.log(response);
        this.loadAdminUsers();
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('Your edit has been saved!', 'Save Successful!');
        } else if (response.status === 406) {
          this.toastr.warning('You have not changed anything!', 'Nothing to save!');
        } else {
          //console.log(response);
          this.toastr.error('Your edit has not been saved or you have no edits!', 'Save User Failed!');
        }
      }, error => {
        this.loadAdminUsers();
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
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

  showdisplayUserAdder() {
    // this.selectedCatInAddProd = this.categories[0].category_id;
    this.userType = 'nadmin';
    this.displayUserAdder = true;
  }

  cancelUserAdder(form: NgForm) {
    form.reset();
    // this.clonedProduct = {};
    // this.uploadedImage = '';
    // addFileUpload.clear();
    this.displayUserAdder = false;
  }

  addNewUser(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    // console.log(value);
    if (value.passwd === value.confirmpasswd) {
      this.spinner.show();
      this.sadminUsersService.addAdminUser(value)
        .subscribe(response => {
          // console.log(response);
          this.spinner.hide();
          // this.loadAdminUsers();
          if (response.status === 201) {
            this.toastr.success('The new user you have added has been saved.!', 'Used Added!');
            form.reset({
              userType: 'nadmin'
            });
            this.userType = 'nadmin';
            this.displayUserAdder = false;
            this.loadAdminUsers();
          } else {
            //console.log(response);
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
