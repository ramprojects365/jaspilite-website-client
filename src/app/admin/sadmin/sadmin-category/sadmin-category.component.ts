import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { faEdit, faCheckCircle, faWindowClose } from '@fortawesome/free-regular-svg-icons';

import { SadminCategoriesService } from './sadmincategories.service';

@Component({
  selector: 'app-sadmin-category',
  templateUrl: './sadmin-category.component.html',
  styleUrls: ['./sadmin-category.component.scss']
})
export class SadminCategoryComponent implements OnInit {

  // Icons
  iconEdit = faEdit;
  save = faCheckCircle;
  cancel = faWindowClose;
  // Icons end
  categories = [];
  cols: any[];
  private clonedCategory: { category_id: any; };

  displayCategoryAdder = false;

  constructor(
    private sadminCategoriesService: SadminCategoriesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title:Title
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'category_id', header: 'ID' },
      { field: 'category_name', header: 'Name' },
      { field: 'category_icon', header: 'Icon' },
    ];
    // Live production: Load categories directly from database
    this.categories = [];
    this.loadCategories();
    this.title.setTitle("Jaspilite - Master Product Categories");
  }

  // Mock demo categories commented out - production loads from database only
  private getMockCategories() {
    return [];
    /*
    return [
      { category_id: 11, category_name: 'Rice & Flour', category_icon: 'pi pi-shopping-bag' },
      { category_id: 12, category_name: 'Spices', category_icon: 'pi pi-star' },
    ];
    */
  }

  loadCategories() {
    this.sadminCategoriesService.getAllCategories()
      .subscribe(
        categories => {
          const remoteCategories = categories?.payload?.categories;
          if (Array.isArray(remoteCategories)) {
            this.categories = remoteCategories;
          } else {
            this.categories = [];
          }
        },
        () => {
          this.categories = [];
        },
      );
  }

  onRowEditInit(category) {
    this.clonedCategory = { ...category };
    // console.log(this.clonedCategory);
  }

  onRowEditSave(category) {
    const modifiedCategory = category;
    // Preloader
    this.spinner.show();
    this.sadminCategoriesService.updateCategory(modifiedCategory)
      .subscribe(response => {
        // console.log(response);
        this.loadCategories();
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('Your edit has been saved!', 'Save Successful!');
        } else if (response.status === 406) {
          this.toastr.warning('You have not changed anything!', 'Nothing to save!');
        } else {
          // console.log(response);
          this.toastr.error('Your edit has not been saved or you have no edits!', 'Save Failed!');
        }
      }, error => {
        this.loadCategories();
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

  onRowEditCancel() {
    const categoryIndex = this.categories.findIndex(item => item.category_id === this.clonedCategory.category_id);
    // console.log(userIndex);
    this.categories[categoryIndex] = this.clonedCategory;
    this.categories = [...this.categories];
    this.clonedCategory = null;
    this.toastr.warning('Your edit has not been saved!', 'Edit Cancelled!');
  }

  showdisplayCategoryAdder() {
    // this.selectedCatInAddProd = this.categories[0].category_id;
    this.displayCategoryAdder = true;
  }

  cancelCategoryAdder(form: NgForm) {
    form.reset();
    // this.clonedProduct = {};
    // this.uploadedImage = '';
    // addFileUpload.clear();
    this.displayCategoryAdder = false;
  }

  addNewCategory(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    this.spinner.show();
    this.sadminCategoriesService.addCatogory(value)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('The new category you have added has been saved.!', 'Category Added!');
          form.reset();
          this.displayCategoryAdder = false;
          this.loadCategories();
        } else {
          //console.log(response);
          this.toastr.error('The new category you have added has not been saved!', 'Category Not Added!');
        }
      }, error => {
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

}
