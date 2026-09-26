import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ManagerProductsService } from './managerproducts.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';


@Component({
  selector: 'app-manager-products',
  templateUrl: './manager-products.component.html',
  styleUrls: ['./manager-products.component.scss']
})
export class ManagerProductsComponent implements OnInit {

  shopItems = [];
  userShops = [];
  userShop: string;
  userBranches = [];
  userBranch: any;
  products = [];
  productsTemp = [];
  categories = [];
  selectedCategory: string;
  selectedProductsArr = [];
  cols: any[];
  clonedProduct: any;
  displayProductAdder = false;
  displaySelectBranchForAddUpdt = false;
  branchSelectReason = '';
  selectedproduct: string;
  selectedImage: string;
  selectedBarcode: string;
  modifiedProduct: any;

  constructor(
    private managerProductsService: ManagerProductsService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart | Fresh vegetables delivery in Kualalumpur and Selangor");
    this.cols = [
      { field: 'company', header: 'Image' },
      { field: 'category_name', header: 'Category' },
      { field: 'item_price', header: 'Price' },
      { field: 'item_discount', header: 'Discount' },
      { field: 'item_qr_code', header: 'Barcode' },
      { field: 'articleNumber', header: 'Article No' },
      { field: 'availability', header: 'Availability' },
    ];
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.categories = [
      { label: 'All', value: 'All' },
      { label: 'Baby Care', value: 'Baby Care' },
      { label: 'Baby Food', value: 'Baby Food' },
      { label: 'Coffee', value: 'Coffee' },
      { label: 'Cooking Gas', value: 'Cooking Gas' },
      { label: 'Dish Wash', value: 'Dish Wash' },
      { label: 'Dry Fruits & Nuts', value: 'Dry Fruits & Nuts' },
      { label: 'Electronics', value: 'Electronics' },
      { label: 'Ice Cream', value: 'Ice Cream' },
      { label: 'Frozen Food', value: 'Frozen Food' },
      { label: 'Ghee', value: 'Ghee' },
      { label: 'Meat', value: 'Meat' },
      { label: 'Laundry Detergent', value: 'Laundry Detergent' },
      { label: 'Oil', value: 'Oil' },
      { label: 'Pest Control', value: 'Pest Control' },
      { label: 'Pickles', value: 'Pickles' },
      { label: 'Pooja Items', value: 'Pooja Items' },
      { label: 'Ready To Eat', value: 'Ready To Eat' },
      { label: 'Restaurant Items', value: 'Food & Drinks' },
      { label: 'Rice', value: 'Rice' },
      { label: 'Sanitary Napkins', value: 'Sanitary Napkins' },
      { label: 'Seafood', value: 'Seafood' },
      { label: 'Soap', value: 'Soap' },
      { label: 'Tea', value: 'Tea' },
      { label: 'Vegetables', value: 'Vegetables' },
      { label: 'Vermicelli', value: 'Vermicelli' },
    ];
    this.selectedCategory = 'All';
    this.managerProductsService.getMyBranch(adminId)
      .subscribe(
        branch => {
          this.userBranch = branch.payload.branchdetails[0].branch_id || null;
          this.getShopItems(this.userBranch);
          this.loadProducts();
          this.getShops();
        });
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
  loadProducts() {
    this.managerProductsService.getAllProducts()
      .subscribe(
        products => {
          this.productsTemp = products.payload.products;
          this.products = products.payload.products.map(item => {
            return { label: item.name, value: item.product_id, image: item.image, barcode: item.sku };
          });
          this.selectedproduct = this.products[0].value;
          this.selectedImage = this.products[0].image;
          this.selectedBarcode = this.products[0].barcode;
        });
  }
  changeCategory(category) {
    this.selectedProductsArr = [];
    if (category.value !== 'All') {
      for (let i = 0; i < this.productsTemp.length; i++) {
        if (this.productsTemp[i].category_name == category.value) {
          this.selectedProductsArr.push({
            product_id: this.productsTemp[i].product_id,
            category_id: this.productsTemp[i].category_id,
            category_name: this.productsTemp[i].category_name,
            company: this.productsTemp[i].company,
            name: this.productsTemp[i].name,
            image: this.productsTemp[i].image,
            description: this.productsTemp[i].description,
            weight: this.productsTemp[i].weight,
            sku: this.productsTemp[i].sku
          })
        }
      }
      this.products = this.selectedProductsArr.map(item => {
        return { label: item.name, value: item.product_id, image: item.image, barcode: item.sku };
      });
      this.selectedproduct = this.products[0].value;
      this.selectedImage = this.products[0].image;
      this.selectedBarcode = this.products[0].barcode;
    } else {
      this.products = this.productsTemp.map(item => {
        return { label: item.name, value: item.product_id, image: item.image, barcode: item.sku };
      });
      this.selectedproduct = this.products[0].value;
      this.selectedImage = this.products[0].image;
      this.selectedBarcode = this.products[0].barcode;
    }
  }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.managerProductsService.getAllUsersShops(adminId)
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
    this.managerProductsService.getAllUsersBranches(shopId)
      .subscribe(
        branches => {
          this.userBranches = branches.payload.branches.map(item => {
            return { label: item.branch_name, value: item.branch_id, itemSelected: false };
          });
        }
      );
  }

  getShopItems(branchId) {
    this.managerProductsService.getAllShopItems(branchId)
      .subscribe(
        shops => {
          this.shopItems = shops.payload.products;
          //console.log(this.shopItems);
        });
  }

  onRowEditInit(product) {
    this.clonedProduct = { ...product };
    // console.log(this.clonedProduct);
  }

  onRowEditCancel(user, index: number) {
    const itemIndex = this.shopItems.findIndex(item => item.item_id === this.clonedProduct.item_id);
    // console.log(itemIndex);
    this.shopItems[itemIndex] = this.clonedProduct;
    // this.shopItems = [...this.shopItems];
    this.clonedProduct = null;
    this.toastr.warning('Your edit has not been saved!', 'Edit Cancelled!');
  }

  onRowEditSave(item) {
    this.modifiedProduct = item;
    // console.log(this.modifiedProduct);

    let branchesToAdd = [this.userBranch];
    this.editProductAfterConfirm(this.modifiedProduct, branchesToAdd);

    // if (this.userShop == '52') {
    //   let branchesToAdd = [this.userBranch];
    //   this.editProductAfterConfirm(this.modifiedProduct, branchesToAdd);
    // } else {
    //   if (this.userBranches.length > 1) {
    //     this.branchSelectReason = 'editProduct';
    //     this.displaySelectBranchForAddUpdt = true;
    //   } else {
    //     let branchesToAdd = [this.userBranches[0].value];
    //     this.editProductAfterConfirm(this.modifiedProduct, branchesToAdd);
    //   }
    // }
  }

  editProductAfterConfirm(modifiedProduct, branchesToAdd) {
    // Preloader
    this.spinner.show();
    this.managerProductsService.updateShopItem(modifiedProduct, branchesToAdd)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('Your edit has been saved!', 'Save Successful!');
          this.displayProductAdder = false;
          this.displaySelectBranchForAddUpdt = false;
          this.getShopItems(this.userBranch);
        } else if (response.status === 406) {
          this.toastr.warning('You have not changed anything!', 'Nothing to save!');
        } else {
          // console.log(response);
          this.toastr.error('Your edit has not been saved or you have no edits!', 'Save User Failed!');
        }
      }, error => {
        this.getShopItems(this.userBranch);
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

  changeAvailability(value, product) {
    this.spinner.show();
    this.managerProductsService.updateShopItemAvailability(product, this.userBranch, value)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('Your edit has been saved!', 'Save Successful!');
          this.getShopItems(this.userBranch);
        } else if (response.status === 406) {
          this.toastr.warning('You have not changed anything!', 'Nothing to save!');
        } else {
          // console.log(response);
          this.toastr.error('Your edit has not been saved or you have no edits!', 'Save User Failed!');
        }
      }, error => {
        this.getShopItems(this.userBranch);
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

  changeHidden(value, product) {
    this.spinner.show();
    this.managerProductsService.updateShopItemHidded(product, this.userBranch, value)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('Your edit has been saved!', 'Save Successful!');
          this.getShopItems(this.userBranch);
        } else if (response.status === 406) {
          this.toastr.warning('You have not changed anything!', 'Nothing to save!');
        } else {
          // console.log(response);
          this.toastr.error('Your edit has not been saved or you have no edits!', 'Save User Failed!');
        }
      }, error => {
        this.getShopItems(this.userBranch);
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

  changeShop(event) {
    this.getBranches(event.value);
  }

  changeBranch(event) {
    this.getShopItems(event.value);
  }

  showdisplayProductAdder() {
    // this.userShop = this.userShops[0].value;
    // this.userBranch = this.userBranches[0].value;
    this.selectedproduct = this.products[0].value;
    this.selectedImage = this.products[0].image;
    this.selectedBarcode = this.products[0].barcode;
    this.displayProductAdder = true;
  }

  cancelProductAdder(form: NgForm) {
    const tempShop = this.userShop;
    const tempBranch = this.userBranch;
    form.reset({
      userShop: tempShop,
      userBranch: tempBranch,
    });
    // this.clonedProduct = {};
    // this.uploadedImage = '';
    // addFileUpload.clear();
    this.displayProductAdder = false;
    this.loadProducts();
  }

  changeProduct(event) {
    // console.log(event.value);
    const productIndex = this.products.findIndex(item => item.value === event.value);
    // console.log(productIndex);
    this.selectedproduct = this.products[productIndex].value;
    this.selectedImage = this.products[productIndex].image;
    this.selectedBarcode = this.products[productIndex].barcode;
    if (this.selectedBarcode == null) {
      this.selectedBarcode = '000000000';
    }
    // console.log(this.products[productIndex].label);
  }
  // displaySelectBranchForAddUpdt = false;
  addProduct(form: NgForm) {
    if (!form.valid) {
      return;
    }
    // console.log(this.userBranches.length); 

    let branchesToAdd = [this.userBranch];
    this.addProductAfterConfirm(form.value, branchesToAdd, form);

    // if (this.userShop == '52') {
    //   let branchesToAdd = [this.userBranch];
    //   this.addProductAfterConfirm(form.value, branchesToAdd, form);
    // }else {
    //   if (this.userBranches.length > 1) {
    //     this.branchSelectReason = 'addProduct';
    //     this.displaySelectBranchForAddUpdt = true;
    //   } else {
    //     let branchesToAdd = [this.userBranches[0].value];
    //     this.addProductAfterConfirm(form.value, branchesToAdd, form);
    //   }
    // }
  }

  addProdBranchChange(branch, event) {
    // console.log(branch);
    // console.log(event);
  }
  cancelAaddProdBranchSelection() {
    this.branchSelectReason = '';
    this.displaySelectBranchForAddUpdt = false;
  }
  addAddProdBranchSelection(form: NgForm) {
    // console.log(this.userBranches);
    let branchesToAdd = [];
    for (var i = 0; i < this.userBranches.length; i++) {
      if (this.userBranches[i].itemSelected == true) {
        branchesToAdd.push(this.userBranches[i].value);
      }
    }
    // console.log(branchesToAdd);
    if (branchesToAdd.length > 0) {
      if (this.branchSelectReason == 'addProduct') {
        this.addProductAfterConfirm(form.value, branchesToAdd, form);
      } else if (this.branchSelectReason == 'editProduct') {
        console.log("edit------" + branchesToAdd);
        this.editProductAfterConfirm(this.modifiedProduct, branchesToAdd);
      }
    }
  }
  addProductAfterConfirm(item, branchesToAdd, form) {
    const value = form.value;
    //console.log(value);
    this.spinner.show();
    this.managerProductsService.addShopItem(value, branchesToAdd)
      .subscribe(
        response => {
          this.spinner.hide();
          // console.log(response);
          if (response.status === 201) {
            this.toastr.success('Your product has been added successfully!', 'Product Added!');
            const tempShop = this.userShop;
            const tempBranch = this.userBranch;
            form.reset({
              userShop: tempShop,
              userBranch: tempBranch,
            });
            this.displayProductAdder = false;
            this.displaySelectBranchForAddUpdt = false;
            this.getShopItems(this.userBranch);
            this.loadProducts();
          } else {
            this.toastr.error('There was a problem adding the product!', 'Product Add Error!');
          }
        }, error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }

}
