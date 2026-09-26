import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title, Meta  } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { NadminPromotionsService } from '../nadmin-promotions/nadminpromotions.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';
import { UtilityService } from '../../../services/utilities.service';

@Component({
  selector: 'app-nadmin-promotions',
  templateUrl: './nadmin-promotions.component.html',
  styleUrls: ['./nadmin-promotions.component.scss']
})
export class NadminPromotionsComponent implements OnInit {

  cols: any[];
  userShops = [];
  userShop: string;
  userBranches = [];
  userBranch: string;
  uploadedImage: string;
  promotions = [];
  promoDiscount: any;
  branchId: any;
  promoId: any;
  //promoPicture: any;
  clonedProduct: any;
  eStartDate: Date;
  eEndDate: Date;
  newStartDate: Date;
  newEndDate: Date;
  displayPromotionEditModal = false;

  constructor(
    public router: Router,
    private nadminPromotionsService: NadminPromotionsService,
    private adminLoginService: AdminLoginService,
    private title:Title,
    private metaService: Meta,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'start_date', header: 'Start Date' },
      { field: 'end_date', header: 'End Date' },
    ];
    this.userShops = this.getMockShops();
    this.userShop = this.userShops[0]?.value;
    this.userBranches = this.getMockBranches(this.userShop);
    this.userBranch = this.userBranches[0]?.value;
    this.promotions = this.getMockPromotions(this.userBranch);
    this.getShops();
    this.uploadedImage = '../../../../assets/img/common/sample-promo.jpg'; 
    this.eStartDate = new Date();
    this.eEndDate = new Date();
    this.newStartDate = new Date();
    this.newEndDate = new Date();    
    this.clonedProduct = {};
    this.title.setTitle("Mini Mart | Grocery delivery from Lulu Hypermarket, Modern Stores, UM Stores | Download today");
    this.metaService.addTags([
      {name: 'keywords', content: 'Cyberjaya Food, Petaling Jaya Grocery Delivery, Instant Food Delivery, Same day delivery mobile app'},
      {name: 'description', content: 'Malaysia own Indian e-commerce store. Same day delivery to PJ, Klang, Shah Alam, Kajang, Brickfields, Kuala Lumpur, Selayang, Batu Caves, Klang Valley'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
  addPromotion(){
    this.router.navigate(['admin/nadmin/addpromotion']);
  }
  changeShop(event) {
    this.getBranches(event.value);
  }
  changeBranch(event) { 
    this.promotions = this.getMockPromotions(event.value);
    this.getPromotions(event.value);
  }
  cancelPromo(promo){
    var r = confirm("Are you sure you want to cancel this promotion? This cannot be undone!");
    if (r == true) {
      this.nadminPromotionsService.cancelPromotion(promo.promo_id)
        .subscribe(
          data => {
            //console.log(JSON.stringify(data));
            this.getPromotions(promo.branch_id);
          });
    } else {
       console.log("You pressed Cancel!");
    }
  }
  uploadImage(event, addFileUpload) {
    if (event.files[0].size < 60000) {
      this.spinner.show();
      this.nadminPromotionsService.uploadImage(event.files[0])
        .subscribe(
          response => {
            this.spinner.hide();
            // console.log(response);
            if (response.status === 200) {
              addFileUpload.clear();
              this.uploadedImage = response.payload.image;
            } else {
              // console.log(response);
              this.toastr.error('There was a problem uploading your image!', 'Image Upload Error!');
            }
          }, error => {
            this.spinner.hide();
            this.toastr.error(error.error.message, 'Error!');
          }
        );
    } else {
      this.toastr.error('Please upload the small size image.', 'Image Size Bigger!');
      addFileUpload.clear();
    }
  }
  addPromoProducts(promo){
    this.nadminPromotionsService.PromoId = promo;   
    this.router.navigate(['admin/nadmin/addpromoproducts']);
  }
  EditPromotionModal(promo) { 
    this.clonedProduct = { ...promo }; 

    this.newStartDate = new Date(this.clonedProduct.startdate);
    this.newEndDate =  new Date(this.clonedProduct.enddate);

    this.uploadedImage = promo.picture;

    this.branchId = promo.branch_id;
    this.promoId = promo.promo_id; 
    this.promoDiscount = promo.discount;
 
    this.displayPromotionEditModal = true;
  }
  updatePromotion(form: NgForm){
    if (!form.valid) {
      return;
    }
    const value = form.value;

    var startDateVar = value.eStartDate;
    startDateVar.setDate(startDateVar.getDate() + 1);
    //this.eStartDate = new Date(startDateVar.toISOString().slice(0, 10));
    this.eStartDate = startDateVar.toISOString().slice(0, 10);
    var endDateVar = value.eEndDate;
    endDateVar.setDate(endDateVar.getDate() + 2);
    //this.eEndDate = new Date(endDateVar.toISOString().slice(0, 10));
    this.eEndDate = endDateVar.toISOString().slice(0, 10);

    const promo = {  
      title: value.title,
      description: value.description,
      start_date: this.eStartDate,
      end_date: this.eEndDate,
      discount: this.promoDiscount,
      branch_id: this.branchId,
      picture: this.uploadedImage,
    };
 
    this.spinner.show();
    this.nadminPromotionsService.editPromotion(promo, this.promoId)
      .subscribe(
        response => {
          this.spinner.hide();
          if (response.status === 201) {
            this.toastr.success('Your promoiton has been updated successfully!', 'Promotion Updated!');
            form.reset();
            this.clonedProduct = {};
            this.displayPromotionEditModal = false;
            this.getPromotions(this.branchId);
          } else {
            this.toastr.error('There was a problem editing the promotion!', 'Promotion Edit Error!');
          }
        }, error => {
          console.log(error.error.message);
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }
  cancelPromoEditModal(form: NgForm) {
    form.reset();
    this.displayPromotionEditModal = false;
  }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminPromotionsService.getAllUsersShops(adminId)
      .subscribe(
        shops => {
          const remoteShops = shops?.payload?.shops;
          if (Array.isArray(remoteShops) && remoteShops.length > 0) {
            this.userShops = remoteShops.map(item => {
              return { label: item.shop_name, value: item.shop_id };
            });
            this.userShop = this.userShops[0]?.value;
            this.getBranches(this.userShop);
          } else {
            this.userShops = this.getMockShops();
            this.userShop = this.userShops[0]?.value;
            this.userBranches = this.getMockBranches(this.userShop);
            this.userBranch = this.userBranches[0]?.value;
            this.getPromotions(this.userBranch);
          }
        },
        () => {
          this.userShops = this.getMockShops();
          this.userShop = this.userShops[0]?.value;
          this.userBranches = this.getMockBranches(this.userShop);
          this.userBranch = this.userBranches[0]?.value;
          this.getPromotions(this.userBranch);
        },
      );
  }
  getBranches(shopId) {
    this.nadminPromotionsService.getAllUsersBranches(shopId)
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
          this.userBranch = this.userBranches[0] ? this.userBranches[0].value : '0';
          // console.log(this.userBranch);   
          this.getPromotions(this.userBranch);     
        },
        () => {
          this.userBranches = this.getMockBranches(shopId);
          this.userBranch = this.userBranches[0] ? this.userBranches[0].value : '0';
          this.getPromotions(this.userBranch);
        },
      );
  }

  private getMockShops() {
    return [
      { label: 'Mini Mart', value: '1' },
      { label: 'Fresh Basket', value: '2' },
      { label: 'Daily Needs', value: '3' },
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
      '3': [
        { label: 'Ampang', value: '301' },
        { label: 'Setapak', value: '302' },
      ],
    };

    return map[shopId] || [{ label: 'Default Branch', value: '0' }];
  }
  getPromotions(branchId) {
    this.nadminPromotionsService.getAllPromotions(branchId)
    .subscribe(
      data => {
        const remotePromotions = data?.payload?.promotions;
        if (Array.isArray(remotePromotions) && remotePromotions.length > 0) {
          this.promotions = remotePromotions.map(item => {
            item.startdate = this.utilityService.getDateTimeFormattedShort(item.start_date);
            item.enddate = this.utilityService.getDateTimeFormattedShort(item.end_date);
            return item;
          });
        } else if (!Array.isArray(this.promotions) || this.promotions.length === 0) {
          this.promotions = this.getMockPromotions(branchId);
        }
        //console.log('sales with remarks ' + JSON.stringify(this.promotions));
      },
      () => {
        if (!Array.isArray(this.promotions) || this.promotions.length === 0) {
          this.promotions = this.getMockPromotions(branchId);
        }
      },
    );
  }

  private getMockPromotions(branchId: string) {
    const now = Date.now();
    const start1 = new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString();
    const end1 = new Date(now + 5 * 24 * 60 * 60 * 1000).toISOString();
    const start2 = new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString();
    const end2 = new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString();
    const start3 = new Date(now + 1 * 24 * 60 * 60 * 1000).toISOString();
    const end3 = new Date(now + 8 * 24 * 60 * 60 * 1000).toISOString();

    return [
      {
        promo_id: 7001,
        branch_id: branchId,
        title: 'Ramadan Deals',
        description: 'Flat discount across selected items',
        start_date: start1,
        end_date: end1,
        discount: 10,
        status: 1,
        picture: '../../../../assets/img/common/sample-promo.jpg',
        startdate: this.utilityService.getDateTimeFormattedShort(start1),
        enddate: this.utilityService.getDateTimeFormattedShort(end1),
      },
      {
        promo_id: 7002,
        branch_id: branchId,
        title: 'Weekend Special',
        description: 'Limited time offer',
        start_date: start2,
        end_date: end2,
        discount: 0,
        status: 0,
        picture: '../../../../assets/img/common/sample-promo.jpg',
        startdate: this.utilityService.getDateTimeFormattedShort(start2),
        enddate: this.utilityService.getDateTimeFormattedShort(end2),
      },
      {
        promo_id: 7003,
        branch_id: branchId,
        title: 'New Arrivals Promo',
        description: 'Discount on new arrivals',
        start_date: start3,
        end_date: end3,
        discount: 5,
        status: 1,
        picture: '../../../../assets/img/common/sample-promo.jpg',
        startdate: this.utilityService.getDateTimeFormattedShort(start3),
        enddate: this.utilityService.getDateTimeFormattedShort(end3),
      },
      {
        promo_id: 7004,
        branch_id: branchId,
        title: 'Clearance Sale',
        description: 'While stocks last',
        start_date: start2,
        end_date: end1,
        discount: 15,
        status: 2,
        picture: '../../../../assets/img/common/sample-promo.jpg',
        startdate: this.utilityService.getDateTimeFormattedShort(start2),
        enddate: this.utilityService.getDateTimeFormattedShort(end1),
      },
    ];
  }


}
