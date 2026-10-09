import { Component, OnInit, NgZone, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, NgForm } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta  } from '@angular/platform-browser';

import { AdminLoginService } from '../../../../services/admin/admin-login/adminlogin.service';
import { NadminSettingsService } from '../nadminsettings.service';

@Component({
  selector: 'app-nadmin-addbranch',
  templateUrl: './nadmin-addbranch.component.html',
  styleUrls: ['./nadmin-addbranch.component.scss']
})
export class NadminAddbranchComponent implements OnInit {

  public searchControl: FormControl;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  private address: string;
  private geoCoder;
  // private theme: any;

  userShops: any[] = [];
  shopCategories: any[] = [];
  userShop: string = null;
  shopCategory: string = null;
  currencies = [];
  countryCodes = [];
  currency: string;
  countryCode: string;
  uploadedImage: string;
  isPosEnabled = false;
  track_stock = false;
  isAdminDelivery = false;

  theme = { themes: '1' };

  timeOptions = [];
  opening_time = '09:00';
  closing_time = '22:00';

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router,
    private ngZone: NgZone,
    private adminLoginService: AdminLoginService,
    private nadminSettingsService: NadminSettingsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title:Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.title.setTitle("Jaspilite | Registering the new shops in Jaspilite | Download today");
    this.metaService.updateTag(
      { name: 'keywords', content: 'Food Sharing App, Maybank Mobile App, Delivery business in Malaysia, Little Indian Shopping, Masid India Shopping, Banga Home Groceries, Srilakan Grocery Shops' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'FRESH GROCERIES PRODUCTS. Price Review Everyday. Shop Now. Online Groceries ... Products from India. 1 Products · Snacks, Biscuits & Sweets.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
    this.uploadedImage = '';
    this.currencies = [
      { label: 'MYR (Malaysian Ringgit)', value: 'MYR' },
    ];
    this.countryCodes = [
      { label: '+60 (Malaysia)', value: '+60' },
    ];
    this.currency = 'MYR';
    this.countryCode = '+60';
    this.timeOptions = this.generateTimeOptions();
    this.opening_time = '09:00';
    this.closing_time = '22:00';
    if (isPlatformBrowser(this.platformId)) {
      // MouseEvent code
      this.initGoogleServices();
      this.getShops();
      this.getShopCategories();
    }

  }

  generateTimeOptions() {
    const options = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        const val = `${hh}:${mm}`;
        const period = h < 12 ? 'AM' : 'PM';
        const displayH = h % 12 === 0 ? 12 : h % 12;
        const displayHH = String(displayH).padStart(2, '0');
        options.push({
          label: `${val} (${displayHH}:${mm} ${period})`,
          value: val
        });
      }
    }
    return options;
  }
  changeCode(event) {
    console.log(event.value);
  }
  getShops() {
    const adminUser = this.adminLoginService.adminUser.getValue();
    const adminId = adminUser ? adminUser.adminId : null;
    this.nadminSettingsService.getAllUsersShops(adminId)
      .subscribe(
        shops => {
          const list = shops?.payload?.shops || [];
          this.userShops = list.map(item => {
            return { label: item.shop_name, value: item.shop_id };
          });
          if (this.userShops.length > 0) {
            this.userShop = this.userShops[0].value;
          } else {
            this.userShop = null;
          }
        },
        err => {
          console.error('Error fetching shops:', err);
          this.userShops = [];
          this.userShop = null;
        }
      );
  }
  getShopCategories() {
    this.nadminSettingsService.getShopCategories()
      .subscribe(
        categories => {
          let list = categories?.payload?.categories || [];
          if (list.length === 0) {
            list = [
              { category_id: 1, category_name: 'Groceries' },
              { category_id: 2, category_name: 'Restaurants' },
              { category_id: 3, category_name: 'Beauty' },
              { category_id: 4, category_name: 'Electronics' },
              { category_id: 5, category_name: 'Charity' },
              { category_id: 6, category_name: 'Jewellery' }
            ];
          }
          this.shopCategories = list.map(item => {
            return { label: item.category_name, value: item.category_id };
          });
          if (this.shopCategories.length > 0) {
            this.shopCategory = this.shopCategories[0].value;
          } else {
            this.shopCategory = null;
          }
        },
        err => {
          console.error('Error fetching shop categories:', err);
          this.shopCategories = [
            { label: 'Groceries', value: 1 },
            { label: 'Restaurants', value: 2 },
            { label: 'Beauty', value: 3 },
            { label: 'Electronics', value: 4 },
            { label: 'Charity', value: 5 },
            { label: 'Jewellery', value: 6 }
          ];
          this.shopCategory = '1';
        }
      );
  }
  initGoogleServices() {
    this.zoom = 15;
    this.latitude = 3.129225;
    this.longitude = 101.6861389;

    const g = (window as any).google;
    if (g && g.maps && g.maps.places && this.searchElementRef) {
      try {
        this.setCurrentLocation();
        this.geoCoder = new g.maps.Geocoder();
        const autocomplete = new g.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: []
        });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place = autocomplete.getPlace();
            if (place && place.geometry && place.geometry.location) {
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();
              this.zoom = 15;
            }
          });
        });
      } catch (e) {
        console.warn('Google maps autocomplete error:', e);
      }
    } else {
      this.setCurrentLocation();
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
      },
        (error) => {
          this.zoom = 16;
          this.latitude = 3.129225;
          this.longitude = 101.6861389;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              break;
            default:
              console.log("An unknown error occurred.");
              break;
          }
        });
    }
  }

  markerDragEnd($event: any) {
    if ($event && $event.coords) {
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
    }
  }

  uploadImage(event, addFileUpload) {
    if (event.files && event.files[0] && event.files[0].size <= 5 * 1024 * 1024) {
      this.spinner.show();
      this.nadminSettingsService.uploadImage(event.files[0])
        .subscribe(
          response => {
            this.spinner.hide();
            if (response.status === 200) {
              if (addFileUpload && addFileUpload.clear) {
                addFileUpload.clear();
              }
              this.uploadedImage = response.payload.image;
            } else {
              this.toastr.error('There was a problem uploading your image!', 'Image Upload Error!');
            }
          }, error => {
            this.spinner.hide();
            this.toastr.error(error.error?.message || 'Error!', 'Error!');
          }
        );
    } else {
      this.toastr.error('Please upload an image smaller than 5MB.', 'Image Too Large!');
      if (addFileUpload && addFileUpload.clear) {
        addFileUpload.clear();
      }
    }
  }

  addBranch(form: NgForm, addFileUpload) {
    // TODO Add insert branch code and move image in server
    if (!form.valid) {
      this.toastr.warning('Please fill all the details!', 'Add All Details.');
      return;
    }
    
    const value = form.value;
    if (value.phone.length < 9 || value.phone.length > 10) {
      this.toastr.warning('Please check the phone number', 'Invalid Phone Number');
      return;
    }
    if (value.maxdistance > 30 ) {
      this.toastr.warning('Radius should not be more than 30', 'Please check the Radius');
      return;
    }
    if (value.welcomeMessage.length > 400 ) {
      this.toastr.warning('Please check the welcome message', 'Lenght Exceeded');
      return;
    }
    if (this.uploadedImage === '') {
      this.toastr.warning('Please select an image!', 'Select Image');
      return;
    }
    
    value.image = this.uploadedImage;
    value.latitude = this.latitude;
    value.longitude = this.longitude;
    value.isAdminDelivery = this.isAdminDelivery;
    console.log(value);
    this.spinner.show();
    this.nadminSettingsService.addBranch(value)
      .subscribe(
        response => {
          this.spinner.hide();
          // console.log(response);
          if (response.status === 201) {
            this.toastr.success('Your branch has been added successfully!', 'Branch Added!');
            this.router.navigate(['admin/nadmin/settings']);
            this.uploadedImage = '';
            addFileUpload.clear();
            form.reset();           
          } else {
            this.toastr.error('There was a problem adding the branch!', 'Branch Add Error!');
          }
        }, error => {
          addFileUpload.clear();
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }

}
