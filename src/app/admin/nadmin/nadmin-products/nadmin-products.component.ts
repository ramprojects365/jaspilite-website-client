import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { NadminProductsService } from './nadminproducts.service';
import { SadminCostingExcelService } from '../../sadmin/sadmin-costing/sadmin-costing-excel.service';
import { AdminLoginService } from '../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-products',
  templateUrl: './nadmin-products.component.html',
  styleUrls: ['./nadmin-products.component.scss']
})
export class NadminProductsComponent implements OnInit {

  shopItems = [];
  userShops = [];
  userShop: string;
  userBranches = [];
  userBranch: string;
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
  excelData = [];

  constructor(
    private nadminProductsService: NadminProductsService,
    private SadminCostingExcelService: SadminCostingExcelService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'image', header: 'Image' },
      { field: 'category_name', header: 'Category' },
      { field: 'item_price', header: 'Price' },
      { field: 'max_quantity', header: 'Max Quantity' },
      { field: 'discount', header: 'Discount' },
      { field: 'item_qr_code', header: 'Barcode' },
      { field: 'articleNumber', header: 'Article No' },
      { field: 'availability', header: 'Availability' },
      { field: 'remarks', header: 'Remarks' }
    ];
    this.categories = [
      { label: 'All', value: 'All' },
      { label: 'Baby Care', value: 'Baby Care' },
      { label: 'Baby Food', value: 'Baby Food' },
      { label: 'Bakery', value: 'Bakery' },
      { label: 'Coffee', value: 'Coffee' },
      { label: 'Cooking Gas', value: 'Cooking Gas' },
      { label: 'Dental Care', value: 'Dental Care' },
      { label: 'Dish Wash', value: 'Dish Wash' },
      { label: 'Dry Fruits', value: 'Dry Fruits' },
      { label: 'Electronics', value: 'Electronics' },
      { label: 'Ice Cream', value: 'Ice Cream' },
      { label: 'Frozen Food', value: 'Frozen Food' },
      { label: 'Ghee', value: 'Ghee' },
      { label: 'Hair Care', value: 'Hair Care' },
      { label: 'Laundry Detergent', value: 'Laundry Detergent' },
      { label: 'Meat', value: 'Meat' },
      { label: 'Milk', value: 'Milk' },
      { label: 'Non Veg Curries', value: 'Non Veg Curries' },
      { label: 'Oil', value: 'Oil' },
      { label: 'Pest Control', value: 'Pest Control' },
      { label: 'Pickles', value: 'Pickles' },
      { label: 'Pooja Items', value: 'Pooja Items' },
      { label: 'Ready To Eat', value: 'Ready To Eat' },
      { label: 'Rice Items', value: 'Rice Items' },
      { label: 'Rice', value: 'Rice' },
      { label: 'Sanitary Napkins', value: 'Sanitary Napkins' },
      { label: 'Seafood', value: 'Seafood' },
      { label: 'Sauces', value: 'Sauces' },
      { label: 'Snacks Items', value: 'Snacks Items' },
      { label: 'Soap', value: 'Soap' },
      { label: 'Spices', value: 'Spices' },
      { label: 'Starters', value: 'Starters' },
      { label: 'Sweets', value: 'Sweets' },
      { label: 'Tea', value: 'Tea' },
      { label: 'Veg Curries', value: 'Veg Curries' },
      { label: 'Vegetables', value: 'Vegetables' },
      { label: 'Vermicelli', value: 'Vermicelli' },
    ];
    this.selectedCategory = 'All';
    this.selectedBarcode = 'xxxxxxxxxxxx';
    this.shopItems = this.getMockShopItems();
    const mockProductsTemp = this.getMockProductsTemp();
    this.productsTemp = mockProductsTemp;
    this.products = mockProductsTemp.map(item => {
      return { label: item.name, value: item.product_id, image: item.image, barcode: item.sku };
    });
    this.selectedproduct = this.products[0]?.value;
    this.selectedImage = this.products[0]?.image;
    this.selectedBarcode = this.products[0]?.barcode || 'xxxxxxxxxxxx';
    this.userShops = this.getMockShops();
    this.userShop = this.userShops[0]?.value;
    this.userBranches = this.getMockBranches(this.userShop);
    this.userBranch = this.userBranches[0]?.value;
    this.loadProducts();

    this.getShops();
    this.title.setTitle("Mini Mart: Little India Grocery in Malaysia | Download today");
    this.metaService.addTags([
      { name: 'keywords', content: 'fresh vegetables, household grocery, Indian supermarket, Puchong Shooping, Stayhome, Stay Safe' },
      { name: 'description', content: '24 hours Online Indian Grocery Store. Get Your Indian Groceries Anything Anytime Anywhere. All kind of groceries directly from India. Download our Mobile Apps for iOS and Android.' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
  logout() {
    this.adminLoginService.adminLogout();
  }
  onRightClick(event) {
    return false;
  }
  loadProducts() {
    this.nadminProductsService.getAllProducts()
      .subscribe(
        products => {
          //console.log('add products list' + products.payload.products.length);
          const remoteProducts = products?.payload?.products;
          const finalProducts = (Array.isArray(remoteProducts) && remoteProducts.length > 0)
            ? remoteProducts
            : this.getMockProductsTemp();
          this.productsTemp = finalProducts;
          this.products = finalProducts.map(item => {
            return { label: item.name, value: item.product_id, image: item.image, barcode: item.sku };
          });
          this.selectedproduct = this.products[0]?.value;
          this.selectedImage = this.products[0]?.image;
          this.selectedBarcode = this.products[0]?.barcode || 'xxxxxxxxxxxx';
        },
        () => {
          const finalProducts = this.getMockProductsTemp();
          this.productsTemp = finalProducts;
          this.products = finalProducts.map(item => {
            return { label: item.name, value: item.product_id, image: item.image, barcode: item.sku };
          });
          this.selectedproduct = this.products[0]?.value;
          this.selectedImage = this.products[0]?.image;
          this.selectedBarcode = this.products[0]?.barcode || 'xxxxxxxxxxxx';
        },
      );
  }
  changeProduct(event) {
    //console.log(event.value);
    const productIndex = this.products.findIndex(item => item.value === event.value);
    this.selectedproduct = this.products[productIndex].value;
    this.selectedImage = this.products[productIndex].image;
    this.selectedBarcode = this.products[productIndex].barcode;
    if (this.selectedBarcode == null) {
      this.selectedBarcode = 'xxxxxxxxxxxx';
    }
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
  exportShopProducts() {
    //console.log('shop items'+JSON.stringify(this.shopItems));
    this.excelData = this.shopItems.map(item => {
      return { 'Product Name': item.name, 'Category': item.category_name, 'Price': item.item_price, 'Max Quantity': item.max_quantity, 'Barcode': item.item_qr_code, 
        'Artical Number': item.articleNumber };
    });
    this.SadminCostingExcelService.generateExcel(this.excelData, 'Minimart-Products');
   }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminProductsService.getAllUsersShops(adminId)
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
            this.getShopItems(this.userBranch);
          }
        },
        () => {
          this.userShops = this.getMockShops();
          this.userShop = this.userShops[0]?.value;
          this.userBranches = this.getMockBranches(this.userShop);
          this.userBranch = this.userBranches[0]?.value;
          this.getShopItems(this.userBranch);
        },
      );
  }

  getBranches(shopId) {
    this.nadminProductsService.getAllUsersBranches(shopId)
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
          this.getShopItems(this.userBranch);
        },
        () => {
          this.userBranches = this.getMockBranches(shopId);
          this.userBranch = this.userBranches[0] ? this.userBranches[0].value : '0';
          this.getShopItems(this.userBranch);
        },
      );
  }

  getShopItems(branchId) {
    this.nadminProductsService.getAllShopItems(branchId)
      .subscribe(
        shops => {
          const remoteItems = shops?.payload?.products;
          if (Array.isArray(remoteItems) && remoteItems.length > 0) {
            this.shopItems = remoteItems;
            console.log(this.shopItems);
          } else if (!Array.isArray(this.shopItems) || this.shopItems.length === 0) {
            this.shopItems = this.getMockShopItems();
          }
        },
        () => {
          if (!Array.isArray(this.shopItems) || this.shopItems.length === 0) {
            this.shopItems = this.getMockShopItems();
          }
        },
      );
  }

  private getMockShopItems() {
    return [
      {
        item_id: 8001,
        name: 'Basmati Rice 5kg',
        category_name: 'Rice',
        item_price: '24.90',
        max_items_per_order: 5,
        item_qr_code: 'RICE-BAS-5KG',
        articleNumber: 'A-1001',
        image: 'assets/img/products/basmati-rice.png',
        availability: true,
        hidden: false,
        remarks: '',
      },
      {
        item_id: 8002,
        name: 'Wheat Flour 1kg',
        category_name: 'Rice Items',
        item_price: '6.50',
        max_items_per_order: 10,
        item_qr_code: 'FLOUR-WHT-1KG',
        articleNumber: 'A-1002',
        image: 'assets/img/products/wheat-flour.png',
        availability: true,
        hidden: false,
        remarks: '',
      },
      {
        item_id: 8003,
        name: 'Garam Masala 100g',
        category_name: 'Spices',
        item_price: '5.20',
        max_items_per_order: 8,
        item_qr_code: 'SPC-GMAS-100G',
        articleNumber: 'A-1003',
        image: 'assets/img/products/garam-masala.png',
        availability: true,
        hidden: false,
        remarks: 'Promo',
      },
      {
        item_id: 8004,
        name: 'Banana Chips 200g',
        category_name: 'Snacks Items',
        item_price: '7.90',
        max_items_per_order: 6,
        item_qr_code: 'SNK-BCHP-200G',
        articleNumber: 'A-1004',
        image: 'assets/img/products/banana-chips.png',
        availability: false,
        hidden: true,
        remarks: 'Out of stock',
      },
      {
        item_id: 8005,
        name: 'Masala Tea 250g',
        category_name: 'Tea',
        item_price: '10.00',
        max_items_per_order: 4,
        item_qr_code: 'BEV-MTEA-250G',
        articleNumber: 'A-1005',
        image: 'assets/img/products/masala-tea.png',
        availability: true,
        hidden: false,
        remarks: '',
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

  private getMockProductsTemp() {
    return [
      {
        product_id: 501,
        category_id: 11,
        category_name: 'Rice',
        company: 'Mini Mart Select',
        name: 'Basmati Rice 5kg',
        image: 'assets/img/products/basmati-rice.png',
        description: '',
        weight: '5.000',
        sku: 'RICE-BAS-5KG',
      },
      {
        product_id: 503,
        category_id: 12,
        category_name: 'Spices',
        company: 'Spice Hub',
        name: 'Garam Masala 100g',
        image: 'assets/img/products/garam-masala.png',
        description: '',
        weight: '0.100',
        sku: 'SPC-GMAS-100G',
      },
      {
        product_id: 505,
        category_id: 14,
        category_name: 'Tea',
        company: 'Tea Time',
        name: 'Masala Tea 250g',
        image: 'assets/img/products/masala-tea.png',
        description: '',
        weight: '0.250',
        sku: 'BEV-MTEA-250G',
      },
    ];
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

    if (this.userBranches.length > 1) {
      this.branchSelectReason = 'editProduct';
      this.displaySelectBranchForAddUpdt = true;
    } else {
      let branchesToAdd = [this.userBranches[0].value];
      //console.log(branchesToAdd);
      this.editProductAfterConfirm(this.modifiedProduct, branchesToAdd);
    }
  }

  editProductAfterConfirm(modifiedProduct, branchesToAdd) {
    if(modifiedProduct.max_items_per_order == ''){
      modifiedProduct.max_items_per_order = 0;
    } 
    this.spinner.show();
    this.nadminProductsService.updateShopItem(modifiedProduct, branchesToAdd)
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
    this.nadminProductsService.updateShopItemAvailability(product, this.userBranch, value)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('Your update has been saved!', 'Save Successful!');
          this.getShopItems(this.userBranch);
        } else if (response.status === 406) {
          this.toastr.warning('You have not changed anything!', 'Nothing to save!');
        } else {
          // console.log(response);
          this.toastr.error('Your update has not been saved or you have no edits!', 'Save User Failed!');
        }
      }, error => {
        this.getShopItems(this.userBranch);
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

  changeHidden(value, product) {
    this.spinner.show();
    this.nadminProductsService.updateShopItemHidded(product, this.userBranch, value)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('Your update has been saved!', 'Save Successful!');
          this.getShopItems(this.userBranch);
        } else if (response.status === 406) {
          this.toastr.warning('You have not changed anything!', 'Nothing to save!');
        } else {
          // console.log(response);
          this.toastr.error('Your update has not been saved or you have no edits!', 'Save User Failed!');
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
    if (!Array.isArray(this.products) || this.products.length === 0) {
      const mockProductsTemp = this.getMockProductsTemp();
      this.productsTemp = mockProductsTemp;
      this.products = mockProductsTemp.map(item => {
        return { label: item.name, value: item.product_id, image: item.image, barcode: item.sku };
      });
    }
    this.selectedproduct = this.products[0]?.value;
    this.selectedImage = this.products[0]?.image;
    this.selectedBarcode = this.products[0]?.barcode || 'xxxxxxxxxxxx';
    if (!Array.isArray(this.userShops) || this.userShops.length === 0) {
      this.userShops = this.getMockShops();
      this.userShop = this.userShops[0]?.value;
    }
    if (!Array.isArray(this.userBranches) || this.userBranches.length === 0) {
      this.userBranches = this.getMockBranches(this.userShop);
      this.userBranch = this.userBranches[0]?.value;
    }
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
  addProduct(form: NgForm) {
    if (!form.valid) {
      return;
    }
    if (!Array.isArray(this.userBranches) || this.userBranches.length === 0) {
      this.userBranches = this.getMockBranches(this.userShop);
      this.userBranch = this.userBranches[0]?.value;
    }
    if (this.userBranches.length > 1) {
      this.branchSelectReason = 'addProduct';
      this.displaySelectBranchForAddUpdt = true;
    } else {
      let branchesToAdd = [this.userBranches[0].value];
      // console.log(branchesToAdd);
      this.addProductAfterConfirm(form.value, branchesToAdd, form);
    }
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
        // console.log("edit------" + branchesToAdd);
        this.editProductAfterConfirm(this.modifiedProduct, branchesToAdd);
      }
    }
  }
  addProductAfterConfirm(item, branchesToAdd, form) {
    // console.log(item);
    if(item.max_items_per_order == ''){
      item.max_items_per_order = 0;
    }    
    this.spinner.show();
    this.nadminProductsService.addShopItem(item, branchesToAdd)
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
