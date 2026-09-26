import { Component, OnInit } from '@angular/core';
import { NadminVoucherService } from './nadminvoucher.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// declare var jquery: any;
// declare var $: any;
@Component({
  selector: 'app-nadmin-voucher',
  templateUrl: './nadmin-voucher.component.html',
  styleUrls: ['./nadmin-voucher.component.css']
})
export class NadminVoucherComponent implements OnInit {

  userShops = [];
  userShop: string;
  userBranches = [];
  vCategories = [];
  vTypes = [];
  vCategory: string;
  vType: string;
  userBranch: string;
  uploadedImage: string;
  branches = [];
 
  shop_name = '';
  shop_id = '';
  branch_id = '';
  branch_name = '';
  vouchers = [];
  imageText = 'Please upload Image';
  imagePath = '';
  imageChanged = 'false';
  vTitle = '';
  vDesc = '';
  vValue;
  vMin_Purch_Amt;
  vMax_use_Per_Cust;
  vDaily_Limit;
  vMax_Limit;
  vStartDate: Date;
  vEndDate: Date;

  constructor(private title:Title,
    private nadminVoucherService: NadminVoucherService, 
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    //this.getShopsInit();
    this.vCategories = [
      {label: 'App Promotion', value: 'App Promotion'}
    ];
    this.vCategory = this.vCategories[0].value;
    this.vTypes = [
      {label: 'Discount', value: 'Discount'}
    ];
    this.vType = this.vTypes[0].value;
    this.vStartDate = new Date();
    this.vEndDate = new Date();
    this.uploadedImage = '../../../../assets/img/common/sample-promo.jpg'; 
    
    this.getShops();
    this.title.setTitle("Mini Mart - Modern Stores in Brickfields, Malaysia");
    //this.initializeUploader();
  }
  changeShop(event) {
    this.getBranches(event.value);
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminVoucherService.getAllUsersShops(adminId)
      .subscribe(
        shops => {
          this.userShops = shops.payload.shops.map(item => {
            return { label: item.shop_name, value: item.shop_id };
          });
          this.userShop = this.userShops[0].value;
          // console.log(this.userShops);
          this.getBranches(this.userShops[0].value);
        });
  }
  getBranches(shopId) {   
    this.nadminVoucherService.getAllUsersBranches(shopId)
      .subscribe(
        branches => {         
          this.userBranches = branches.payload.branches.map(item => {
            return { label: item.branch_name, value: item.branch_id };
          });
          if (this.userBranches[0]) {
            this.userBranch = this.userBranches[0].value;
          } else {
            this.userBranch = '0';
          }
          
        
        }
      );
  }

    // initializeUploader() {
    //   const thisPath = this;
    //   $('#voucherImage').change(function () {
    //     const files = this.files;
    //     let file;
    //     if (!files.length) { return; }
    //     file = files[0];
    //     if (/^image\/\w+$/.test(file.type)) {
    //       thisPath.uploadFile(file);
    //     } else {
    //       $.notify({
    //         icon: 'pe-7s-info',
    //         message: 'Please choose an image file'
    //       }, {
    //           type: 'danger',
    //           timer: 4000
    //       });
    //     }
    //   });
    // }
    uploadImage(event, addFileUpload) {
      // console.log(event.files[0]);
      this.spinner.show();
      this.nadminVoucherService.uploadImage(event.files[0])
        .subscribe(
          response => {
            this.spinner.hide();
            if (response.status === 200) {
              addFileUpload.clear();
              this.uploadedImage = response.payload.image;
            } else {
            this.toastr.error('There was a problem uploading your image!', 'Image Upload Error!');
            }
          }, error => {
            this.spinner.hide();
            this.toastr.error(error.error.message, 'Error!');
          }
        );
    }
    
     addVoucher(form: NgForm) {
      const value = form.value;  
      
      var startDateVar = value.vStartDate;
      startDateVar.setDate(startDateVar.getDate());  
      this.vStartDate =  new Date(startDateVar.toISOString().slice(0, 10));
      var endDateVar = value.vEndDate;
      endDateVar.setDate(endDateVar.getDate());  
      this.vEndDate =  new Date(endDateVar.toISOString().slice(0, 10));
   
          if(this.uploadedImage != '' && this.uploadedImage != '../../../../assets/img/common/sample-promo.jpg'){
            const voucher = {        
              branch_id: value.userBranch,
              title: value.vTitle,
              description: value.vDesc,
              type: this.vType,
              picture: this.uploadedImage,
              value: value.vValue,
              start_date: this.vStartDate,
              end_date:  this.vEndDate,
              min_purchase_amt: value.vMin_Purch_Amt,
              max_use_per_customer: value.vMax_use_Per_Cust,
              daily_limit: value.vDaily_Limit,
              max_limit: value.vMax_Limit,
              category: this.vCategory,
              source: 'web' 
            };
            console.log(JSON.stringify(voucher));
            this.nadminVoucherService.addVoucher(voucher)
            .subscribe(
              vouchers => {   
                this.vouchers = vouchers.payload.vouchers;
                this.getVoucher (voucher.branch_id);  
                // if(vouchers.text === 'success'){
                //   this.toastr.success('Voucher created successfully', 'Voucher Created!');
                // }else {
                //   this.toastr.error('There was a problem creating the voucher!', 'Voucher Add Error!');
                // }
                this.vStartDate = new Date();
                this.vEndDate = new Date();
              }
            );
          }
          else {
            this.toastr.error('Please upload image');
          }
     }
     getVoucher(branchId) {
      this.nadminVoucherService.getVouchers(branchId)
      .subscribe(
        vouchers => {   
          this.vouchers = vouchers.payload.vouchers;     
        }
      );
    }  
}
