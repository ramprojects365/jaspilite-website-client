import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

import { UtilityService } from '../../../../services/utilities.service';
import { NadminPromotionsService } from '../nadminpromotions.service';
import { AdminLoginService } from '../../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-addpromotion',
  templateUrl: './nadmin-addpromotion.component.html',
  styleUrls: ['./nadmin-addpromotion.component.scss']
})
export class NadminAddpromotionComponent implements OnInit {
  promoType: any;
  userShops = [];
  shopItems = [];
  promoProducts: Array<{ id: string, percentage: number }> = [];
  userShop: string;
  userBranches = [];
  products = [];
  selectedProducts: Array<{ value: number, shopItem: string, image: string, label: string, price: number, discount: string }> = [];
  cols: any[];
  userBranch: string;
  vStartDate: Date;
  vEndDate: Date;
  uploadedImage: string;
  selectedProduct: string;
  selectedProductTitle: string;
  selectedImage: string;
  selectedBarcode: string;
  constructor(
    public router: Router,
    private nadminPromotionsService: NadminPromotionsService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilityService: UtilityService,
    private title: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.promoType = 0;
    this.getShops();
    this.title.setTitle("Mini Mart | Grocery delivery from Lulu Hypermarket, Modern Stores, UM Stores | Download today");
    this.metaService.addTags([
      { name: 'keywords', content: 'Cyberjaya Food, Petaling Jaya Grocery Delivery, Instant Food Delivery, Same day delivery mobile app' },
      { name: 'description', content: 'Malaysia own Indian e-commerce store. Same day delivery to PJ, Klang, Shah Alam, Kajang, Brickfields, Kuala Lumpur, Selayang, Batu Caves, Klang Valley' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.vStartDate = new Date();
    this.vEndDate = new Date();
    this.uploadedImage = '../../../../assets/img/common/sample-promo.jpg'; 
    this.cols = [
      { field: 'image', header: 'Image' },
      { field: 'label', header: 'Title' },
      { field: 'barcode', header: 'Barcode' }
    ];
  }
  changeShop(event) {
    this.getBranches(event.value);
  }
  changeBranch(event) {
    this.getShopItems(event.value);
  }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminPromotionsService.getAllUsersShops(adminId)
      .subscribe(
        shops => {
          this.userShops = shops.payload.shops.map(item => {
            return { label: item.shop_name, value: item.shop_id };
          });
          this.userShop = this.userShops[0].value;
          // console.log(this.userShops);
          this.getBranches(this.userShops[0].value);
          // const shopIds = shops.payload.shops.map(item => item.shop_id.toString());
        });
  }
  getBranches(shopId) {
    this.nadminPromotionsService.getAllUsersBranches(shopId)
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
          // console.log(this.userBranch);   
          this.getShopItems(this.userBranch);
        }
      );
  }
  getShopItems(branchId) {
    this.nadminPromotionsService.getAllShopItems(branchId)
      .subscribe(
        shopItems => {
          this.shopItems = shopItems.payload.products.map(item => {
            return { label: item.name, shopItem: item.item_id, value: item.product_id, image: item.image, price: item.item_price };
          });
          this.selectedProduct = this.shopItems[0].value;
         });
  }
  changeShopItem(event) {
    if (this.selectedProducts.length > 0) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i].value == event.value) {
          this.toastr.error('Item already been added', 'Duplicate item');
          return;
        }
      }
    }
    const productIndex = this.shopItems.findIndex(item => item.value === event.value);
    this.selectedProducts.push({ value: this.shopItems[productIndex].value, shopItem: this.shopItems[productIndex].shopItem, image: this.shopItems[productIndex].image, label: this.shopItems[productIndex].label, price: this.shopItems[productIndex].price, discount: '' });

    this.selectedProduct = this.shopItems[productIndex].value;
  }
  removePromoItem(item) {
    if (this.selectedProducts.length > 0) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i].value == item.value) {
          this.selectedProducts.splice(i, 1);
        }
      }
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
  addPromo(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
 
    var startDateVar = value.vStartDate;
    startDateVar.setDate(startDateVar.getDate() + 1);
    //this.vStartDate = new Date(startDateVar.toISOString().slice(0, 10));
    this.vStartDate = startDateVar.toISOString().slice(0, 10);
    var endDateVar = value.vEndDate;
    endDateVar.setDate(endDateVar.getDate() + 2);
    //this.vEndDate = new Date(endDateVar.toISOString().slice(0, 10));
    this.vEndDate = endDateVar.toISOString().slice(0, 10);

    var todaydate = new Date();
    todaydate.setDate(todaydate.getDate());
    //var createdDate = new Date(todaydate.toISOString().slice(0, 10));
    var createdDate = todaydate.toISOString().slice(0, 10);

    if (this.uploadedImage != '' && this.uploadedImage != '../../../../assets/img/common/sample-promo.jpg') {

      const promoAll = {
        branch_id: value.userBranch,
        picture: this.uploadedImage,
        title: value.promoTitle,
        description: value.promoDesc,
        start_date: this.vStartDate,
        end_date: this.vEndDate,
        discount: value.promoPercentage,
        created_date: createdDate,
      };
      const promoSelected = {
        branch_id: value.userBranch,
        picture: this.uploadedImage,
        title: value.promoTitle,
        description: value.promoDesc,
        start_date: this.vStartDate,
        end_date: this.vEndDate,
        discount: 0,
        created_date: createdDate,
      };

      if (this.promoType == 0) {
        if (value.promoPercentage < 0 || value.promoPercentage > 99) {
          this.toastr.error('Please check promo percentage.', ' Percentage should be 1 to 99!');
          return;
        } else {
          this.spinner.show();
          this.nadminPromotionsService.addShopPromotion(promoAll)
            .subscribe(
              response => {
                this.spinner.hide();
                console.log(response);
                if (response.status === 201) {
                  this.toastr.success('Promotion has been added successfully!', 'Promotion Added!');
                  this.router.navigate(['admin/nadmin/promotions']);
                } else {
                  this.toastr.error('There was a problem adding the promotion!', 'Promotion Add Error!');
                }
              }, error => {
                this.spinner.hide();
                this.toastr.error(error.error.message, 'Error!');
              }
            );
        }
      } else {
         this.spinner.show();
          this.nadminPromotionsService.addShopPromotion(promoSelected)
            .subscribe(
              response => {
                this.spinner.hide();
                console.log(response);
                if (response.status === 201) {
                  this.toastr.success('Promotion has been added successfully!', 'Promotion Added!');
                  this.router.navigate(['admin/nadmin/promotions']);
                } else {
                  this.toastr.error('There was a problem adding the promotion!', 'Promotion Add Error!');
                }
              }, error => {
                this.spinner.hide();
                this.toastr.error(error.error.message, 'Error!');
              }
            );     
      }
    }
    else {
      this.toastr.error('Please upload image');
    }
  }
  resetForm(form: NgForm) {
    form.reset();
  }
}
