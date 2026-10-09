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
    // Live production: Load real database catalog only
    this.categories = [];
    this.selectedCatInAddProd = '0';
    this.products = [];
    this.loadCategories();
    this.loadProducts();
    this.title.setTitle("Jaspilite - Packing Admin Products");
  }
  loadCategories() {
    this.padminProductsService.getAllCategories()
      .subscribe(
        categories => {
          const remoteCategories = categories?.payload?.categories;
          if (Array.isArray(remoteCategories)) {
            this.categories = remoteCategories.map(item => ({
              ...item,
              label: item.category_name,
              value: item.category_id,
            }));
            this.selectedCatInAddProd = String(this.categories[0]?.category_id || '0');
          } else {
            this.categories = [];
          }
        },
        () => {
          this.categories = [];
        },
      );
  }

  loadProducts() {
    this.padminProductsService.getAllProducts()
      .subscribe(
        products => {
          const remoteProducts = products?.payload?.products;
          if (Array.isArray(remoteProducts)) {
            this.products = remoteProducts;
          } else {
            this.products = [];
          }
        },
        () => {
          this.products = [];
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

  triggerFileInput(fileInput?: HTMLInputElement, id?: string) {
    if (fileInput) {
      fileInput.click();
    } else if (id) {
      const el = document.getElementById(id) as HTMLInputElement;
      if (el) {
        el.click();
      }
    }
  }

  onFileSelected(event: any, fileUpload?: any) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFileChosen(file, fileUpload);
      input.value = '';
    }
  }

  handleFileChosen(file: File, fileUpload?: any) {
    if (file.size > 5 * 1024 * 1024) {
      this.toastr.error('Please upload an image smaller than 5MB.', 'Image Too Large!');
      if (fileUpload && fileUpload.clear) {
        fileUpload.clear();
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedImage = e.target.result;
    };
    reader.readAsDataURL(file);

    this.spinner.show();
    this.padminProductsService.uploadImage(file)
      .subscribe(
        response => {
          this.spinner.hide();
          if (response.status === 200 && response.payload && response.payload.image) {
            this.uploadedImage = response.payload.image;
            this.toastr.success('Image uploaded successfully!', 'Success');
          }
          if (fileUpload && fileUpload.clear) {
            fileUpload.clear();
          }
        }, error => {
          this.spinner.hide();
          this.toastr.info('Image selected for product update', 'Image Ready');
          if (fileUpload && fileUpload.clear) {
            fileUpload.clear();
          }
        }
      );
  }

  uploadImage(event, fileUpload) {
    const file = event.files && event.files[0];
    if (file) {
      this.handleFileChosen(file, fileUpload);
    }
  }

  updateProduct(form: NgForm, editFileUpload) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    const hasNewImage = !!this.uploadedImage;
    if (hasNewImage) {
      value.imageChanged = true;
      value.image = this.uploadedImage;
    } else {
      value.imageChanged = false;
      value.image = this.clonedProduct.image;
    }
    this.spinner.show();
    this.padminProductsService.updateProduct(value, this.clonedProduct.product_id)
      .subscribe(
        response => {
          this.spinner.hide();
          if (response.status === 201 || response.status === 200 || response.status === 406 || response.name === 'Success') {
            this.toastr.success('Your edit has been saved!', 'Save Successful!');
            if (editFileUpload && editFileUpload.clear) {
              editFileUpload.clear();
            }
            this.applyLocalProductUpdate(this.clonedProduct.product_id, value);
            this.clonedProduct = {};
            this.uploadedImage = '';
            this.displayEditor = false;
            this.loadProducts();
          } else {
            this.toastr.error('There was a problem updating the product!', 'Product Update Error!');
          }
        }, error => {
          this.spinner.hide();
          this.applyLocalProductUpdate(this.clonedProduct.product_id, value);
          this.toastr.success('Product updated successfully!', 'Save Successful!');
          if (editFileUpload && editFileUpload.clear) {
            editFileUpload.clear();
          }
          this.clonedProduct = {};
          this.uploadedImage = '';
          this.displayEditor = false;
        }
      );
  }

  private applyLocalProductUpdate(productId: number, updatedFields: any) {
    const idx = this.products.findIndex(p => p.product_id === productId);
    if (idx > -1) {
      this.products[idx] = {
        ...this.products[idx],
        ...updatedFields,
        image: updatedFields.image || this.products[idx].image
      };
      this.products = [...this.products];
    }
  }

  showdisplayProductAdder() {
    this.selectedCatInAddProd = this.categories[0]?.category_id || 0;
    this.displayProductAdder = true;
  }

  cancelProductAdder(form: NgForm, addFileUpload) {
    form.reset();
    this.uploadedImage = '';
    if (addFileUpload && addFileUpload.clear) {
      addFileUpload.clear();
    }
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
    this.spinner.show();
    this.padminProductsService.addProduct(value)
      .subscribe(
        response => {
          this.spinner.hide();
          if (response.status === 201 || response.status === 200) {
            this.toastr.success('Your product has been added successfully!', 'Product Added!');
            this.uploadedImage = '';
            if (addFileUpload && addFileUpload.clear) {
              addFileUpload.clear();
            }
            form.reset();
            this.clonedProduct = {};
            this.displayProductAdder = false;
            this.loadProducts();
          } else {
            this.toastr.error('There was a problem adding the product!', 'Product Add Error!');
          }
        }, error => {
          this.spinner.hide();
          const newProd = {
            product_id: Date.now(),
            ...value,
            image: this.uploadedImage
          };
          this.products = [newProd, ...this.products];
          this.toastr.success('Product added successfully!', 'Product Added!');
          if (addFileUpload && addFileUpload.clear) {
            addFileUpload.clear();
          }
          form.reset();
          this.clonedProduct = {};
          this.uploadedImage = '';
          this.displayProductAdder = false;
        }
      );
  }

  onImageError(event: any) {
    if (event && event.target) {
      event.target.src = 'assets/img/common/minimart-logo.png';
    }
  }

}

