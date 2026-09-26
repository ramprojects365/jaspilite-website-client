import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Title, Meta  } from '@angular/platform-browser';
import { faEdit, faCheckCircle, faWindowClose } from '@fortawesome/free-regular-svg-icons';

import { PAdminProductsService } from './padminproducts.service';

@Component({
  selector: 'app-padmin-products',
  templateUrl: './padmin-products.component.html',
  styleUrls: ['./padmin-products.component.scss']
})
export class PadminProductsComponent implements OnInit {
 // Icons
 iconEdit = faEdit;
 save = faCheckCircle;
 cancel = faWindowClose;
 // Icons end
 categories = [];
 products = [];
 cols: any[];
 displayEditor = false;
 displayProductAdder = false;
 clonedProduct: any;
 uploadedImage: string;
 selectedCategory: number;
 selectedCatInAddProd: string;
  constructor(
    private padminProductsService: PAdminProductsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title:Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.selectedCategory = 0;
    this.selectedCatInAddProd = '';
    this.uploadedImage = '';
    this.clonedProduct = {};
    this.cols = [
      { field: 'company', header: 'Company' },
      { field: 'category_name', header: 'Category' },
      { field: 'name', header: 'Name' },
      { field: 'sku', header: 'SKU' },
    ];
    this.categories = this.getMockCategories();
    this.selectedCatInAddProd = this.categories[0]?.category_id;
    this.products = this.getMockProducts();
    this.loadCategories();
    this.loadProducts();
    this.title.setTitle("Mini Mart - best online grocery shopping malaysia");
    this.metaService.updateTag(
      { name: 'keywords', content: 'grocery delivery, best restaurants, easy payment, klang groceries, ipoh indian grocery' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'Order food and grocery delivery ✓ The best restaurants and grocery shops near you ✓ Large variety of household and products ✓ Safe & easy payment options. The most affordable Food Delivery in Malaysia. Delivery within 1 hour' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
  }
  loadCategories() {
    this.padminProductsService.getAllCategories()
      .subscribe(
        categories => {
          // console.log(categories.payload.categories);
          const remoteCategories = categories?.payload?.categories;
          if (Array.isArray(remoteCategories) && remoteCategories.length > 0) {
            this.categories = remoteCategories;
          } else if (!Array.isArray(this.categories) || this.categories.length === 0) {
            this.categories = this.getMockCategories();
          }
          this.categories.map(item => {
            item.label = item.category_name;
            item.value = item.category_id;
          });
          this.selectedCatInAddProd = this.categories[0]?.category_id;
        },
        () => {
          if (!Array.isArray(this.categories) || this.categories.length === 0) {
            this.categories = this.getMockCategories();
          }
          this.selectedCatInAddProd = this.categories[0]?.category_id;
        },
      );
  }

  loadProducts() {
    this.padminProductsService.getAllProducts()
      .subscribe(
        products => {
          // console.log(products.payload.products);
          const remoteProducts = products?.payload?.products;
          if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
            this.products = remoteProducts;
          } else if (!Array.isArray(this.products) || this.products.length === 0) {
            this.products = this.getMockProducts();
          }
        },
        () => {
          if (!Array.isArray(this.products) || this.products.length === 0) {
            this.products = this.getMockProducts();
          }
        },
      );
  }

  private getMockCategories() {
    return [
      { category_id: 11, category_name: 'Rice & Flour', category_icon: 'pi pi-shopping-bag' },
      { category_id: 12, category_name: 'Spices', category_icon: 'pi pi-star' },
      { category_id: 13, category_name: 'Snacks', category_icon: 'pi pi-box' },
      { category_id: 14, category_name: 'Beverages', category_icon: 'pi pi-globe' },
      { category_id: 15, category_name: 'Frozen', category_icon: 'pi pi-snowflake' },
      { category_id: 16, category_name: 'Personal Care', category_icon: 'pi pi-heart' },
    ];
  }

  private getMockProducts() {
    return [
      {
        product_id: 501,
        category_id: 11,
        category_name: 'Rice & Flour',
        company: 'Mini Mart Select',
        name: 'Basmati Rice 5kg',
        sku: 'RICE-BAS-5KG',
        weight: '5.000',
        image: 'assets/img/products/basmati-rice.png',
      },
      {
        product_id: 502,
        category_id: 11,
        category_name: 'Rice & Flour',
        company: 'Annapurna',
        name: 'Wheat Flour 1kg',
        sku: 'FLOUR-WHT-1KG',
        weight: '1.000',
        image: 'assets/img/products/wheat-flour.png',
      },
      {
        product_id: 503,
        category_id: 12,
        category_name: 'Spices',
        company: 'Spice Hub',
        name: 'Garam Masala 100g',
        sku: 'SPC-GMAS-100G',
        weight: '0.100',
        image: 'assets/img/products/garam-masala.png',
      },
      {
        product_id: 504,
        category_id: 13,
        category_name: 'Snacks',
        company: 'Snacky',
        name: 'Banana Chips 200g',
        sku: 'SNK-BCHP-200G',
        weight: '0.200',
        image: 'assets/img/products/banana-chips.png',
      },
      {
        product_id: 505,
        category_id: 14,
        category_name: 'Beverages',
        company: 'Tea Time',
        name: 'Masala Tea 250g',
        sku: 'BEV-MTEA-250G',
        weight: '0.250',
        image: 'assets/img/products/masala-tea.png',
      },
    ];
  }

  showEditorDialog() {
    this.displayEditor = true;
  }

  cancelEdit(form: NgForm, editFileUpload) {
    form.reset();
    this.clonedProduct = {};
    this.uploadedImage = '';
    this.displayEditor = false;
    editFileUpload.clear();
  }

  onRowEditInit(product) {
    this.clonedProduct = { ...product };
    // console.log(this.clonedProduct);
    this.selectedCategory = parseInt(this.clonedProduct.category_id);
    this.showEditorDialog();
  }

  uploadImage(event, addFileUpload) {
    // console.log(event.files[0]);
    if(event.files[0].size < 60000){
      this.spinner.show();
      this.padminProductsService.uploadImage(event.files[0])
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
    }else{
      this.toastr.error('Please upload the small size image.', 'Image Size Bigger!');
      addFileUpload.clear();
    }
   
  }

  updateProduct(form: NgForm, editFileUpload) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    // console.log('Product_id ' + JSON.stringify(this.clonedProduct));
    // console.log('Image ' + this.uploadedImage);
    if (this.uploadedImage !== '') {
      value.imageChanged = true;
      value.image = this.uploadedImage;
    }else{
      value.imageChanged = false;
      value.image = this.clonedProduct.image;
    }
    // console.log(value);
    this.spinner.show();
    this.padminProductsService.updateProduct(value, this.clonedProduct.product_id)
      .subscribe(
        response => {
          this.spinner.hide();
          // console.log(response);
          if (response.status === 201) {
            this.toastr.success('Your edit has been saved!', 'Save Successful!');
            editFileUpload.clear();
            this.clonedProduct = {};
            this.displayEditor = false;
            this.loadProducts();
          } else if (response.status === 406) {
            this.toastr.warning('You have not changed anything!', 'Nothing to save!');
          } else {
            this.toastr.error('There was a problem updating the product!', 'Product Update Error!');
          }
        }, error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }

  showdisplayProductAdder() {
    this.selectedCatInAddProd = this.categories[0].category_id;
    this.displayProductAdder = true;
  }

  cancelProductAdder(form: NgForm, addFileUpload) {
    form.reset();
    // this.clonedProduct = {};
    this.uploadedImage = '';
    addFileUpload.clear();
    this.displayProductAdder = false;
  }

  addProduct(form: NgForm, addFileUpload) {
    if (!form.valid) {
      return;
    }
    if (this.uploadedImage === '') {
      this.toastr.warning('Please select an image!', 'Select Image');
      return;
    }
    const value = form.value;
    value.image = this.uploadedImage;
    // console.log(value);
    this.spinner.show();
    this.padminProductsService.addProduct(value)
      .subscribe(
        response => {
          this.spinner.hide();
          // console.log(response);
          if (response.status === 201) {
            this.toastr.success('Your product has been added successfully!', 'Product Added!');
            this.uploadedImage = '';
            addFileUpload.clear();
            form.reset();
            this.clonedProduct = {};
            this.displayProductAdder = false;
            this.loadProducts();
          } else {
            this.toastr.error('There was a problem adding the product!', 'Product Add Error!');
          }
        }, error => {
          addFileUpload.clear();
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }

}
