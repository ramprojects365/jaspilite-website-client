import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title, Meta } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

import { NadminPromotionsService } from '../../nadmin-promotions/nadminpromotions.service';

@Component({
  selector: 'app-nadmin-addpromoproducts',
  templateUrl: './nadmin-addpromoproducts.component.html',
  styleUrls: ['./nadmin-addpromoproducts.component.scss']
})
export class NadminAddpromoproductsComponent implements OnInit {
  promoProducts: any;
  shopItems: any;
  promoId: any;
  cols: any[];
  existingPromotions = [];
  selectedProduct: string;
  selectedProductName: string;
  displayPromoProductModal = false;
  selectedProducts: Array<{ value: number, shopItem: string, image: string, label: string, price: number, discount: string }> = [];
  constructor(
    public router: Router,
    private title: Title,
    private location: Location,
    private metaService: Meta,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private nadminPromotionsService: NadminPromotionsService,
  ) { }

  ngOnInit() {
    this.promoProducts = [];
    this.shopItems = [];
    this.cols = [
      { field: 'name', header: 'Title' },
      { field: 'price', header: 'Price' },
      { field: 'discount_percentage', header: 'Discount' }
    ];
    if (this.nadminPromotionsService.promo === undefined) {
      this.location.back();
    } else {
      this.promoProducts = this.nadminPromotionsService.promo;
      this.getShopItems(this.promoProducts.branch_id);
      this.getPromoItems(this.promoProducts.promo_id);
      this.promoId = this.promoProducts.promo_id;
    }
    this.title.setTitle("Mini Mart | Grocery Promotions in Kuala Lumpur | Download today");
    this.metaService.addTags([
      { name: 'keywords', content: 'Cyberjaya Food, Petaling Jaya Grocery Delivery, Instant Food Delivery, Same day delivery mobile app' },
      { name: 'description', content: 'Malaysia own Indian e-commerce store. Same day delivery to PJ, Klang, Shah Alam, Kajang, Brickfields, Kuala Lumpur, Selayang, Batu Caves, Klang Valley' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
  getPromoItems(promoId) {
    this.spinner.show();
    this.nadminPromotionsService.getPromoItems(promoId)
      .subscribe(
        response => {
          this.spinner.hide();
          if (response.status === 200) {
            this.existingPromotions = response.payload.promotions;
            console.log('existing promo products '+ JSON.stringify(this.existingPromotions));
          }
        }, error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }
  getShopItems(branchId) {
    this.nadminPromotionsService.getAllShopItems(branchId)
      .subscribe(
        shopItems => {
          this.shopItems = shopItems.payload.products.map(item => {
            return { label: item.name, shopItem: item.item_id, value: item.item_id, image: item.image, price: item.item_price };
          });
          this.selectedProduct = this.shopItems[0].shopItem;
        });
  }
  changeShopItem(event) {
   if (this.existingPromotions.length > 0) {
      for (let i = 0; i < this.existingPromotions.length; i++) {
        if (this.existingPromotions[i].shop_items_id === event.value) {
          this.toastr.error('Item already been added to promo.', 'Duplicate item.');
          return;
        }
      }
    }
    const productIndex = this.shopItems.findIndex(item => item.value === event.value);
  
    this.selectedProduct = this.shopItems[productIndex].shopItem;
    this.selectedProductName = this.shopItems[productIndex].label;
    this.displayPromoProductModal = true;
  }
  removePromoItem(promo) {
    this.nadminPromotionsService.removePromoItem(promo.promo_items_id)
      .subscribe(
        response => {
         if (response.status === 204) {
           this.toastr.success('Product has been removed successfully!', 'Product Removed!');
           this.getPromoItems(promo.promo_id);
          }
        }, error => {
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }
  addPromoProduct(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;

    const promo = {
      product_id: this.selectedProduct,
      percentage: value.promoPercentage,
      promoId: this.promoId,
    };

    this.spinner.show();
    this.nadminPromotionsService.addPromoProduct(promo)
      .subscribe(
        response => {
          this.spinner.hide();
          console.log(response);
          if (response.status === 201) {
            this.toastr.success('Product has been added successfully!', 'Product Added!');
            this.displayPromoProductModal = false;
            this.getPromoItems(this.promoId);
          } else {
            this.toastr.error('There was a problem adding the product!', 'Product Add Error!');
          }
        }, error => {
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }
  cancelPromoProductModal(form: NgForm) {
    form.reset();
    this.displayPromoProductModal = false;
  }

}
