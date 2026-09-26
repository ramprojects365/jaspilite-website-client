import { Component, OnInit, NgZone, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, NgForm } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta  } from '@angular/platform-browser';

import { AdminLoginService } from '../../../../services/admin/admin-login/adminlogin.service';
import { NadminSettingsService } from '../nadminsettings.service';

@Component({
  selector: 'app-nadmin-editbranch',
  templateUrl: './nadmin-editbranch.component.html',
  styleUrls: ['./nadmin-editbranch.component.scss']
})
export class NadminEditbranchComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;
  private geoCoder;

  userShops = [];
  userShop: string;
  shopCategory: string;
  currencies = [];
  selectedCurrency = "";
  opening_time: any;
  closing_time: any;
  uploadedImage: string;
  isPosEnabled = false;
  track_stock = false;
  isAdminDelivery = false;

  theme = { themes: '1' };
  branchId: string;
  branchDetails?: any;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private adminLoginService: AdminLoginService,
    private nadminSettingsService: NadminSettingsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title:Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart | Indian grocery shopping in Malaysia | Download today");
    this.metaService.updateTag(
      { name: 'keywords', content: 'Big basket, freshly handpicked groceries, Indian grocery shopping in Malaysia, online grocery shopping app, grocery home delivery, Food and grocery in Malaysia' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'Malaysia No. 1 Indian, local and international grocery and F&B online store. From rice, lentils, spice blends to ready-to-eat instant mixes and snacks imported.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
    this.branchDetails = {};
    this.uploadedImage = '';
    this.currencies = [
      { label: 'BND', value: 'BND' },
      { label: 'INR', value: 'INR' },
      { label: 'RM', value: 'RM' },     
      { label: 'USD', value: 'USD' },
    ];
    this.branchId = this.route.snapshot.paramMap.get('branch');
    if (isPlatformBrowser(this.platformId)) {
      // MouseEvent code
      this.getBranchDetails();
      this.getShops();
      this.shopCategories();
    }
  }
  getShops() {
    const adminId = this.adminLoginService.adminUser.getValue().adminId;
    this.nadminSettingsService.getAllUsersShops(adminId)
      .subscribe(
        shops => {
          this.userShops = shops.payload.shops.map(item => {
            return { label: item.shop_name, value: item.shop_id };
          });
          // this.userShop = this.userShops[0].value;
          // console.log(this.userShops);
        });
  }
  shopCategories(){
    this.nadminSettingsService.getShopCategories()
    .subscribe(
      categories => {
        this.shopCategories = categories.payload.categories.map(item => {
          return { label: item.category_name, value: item.category_id };
        });
        //this.shopCategory = this.shopCategories[0].value;
        //console.log(JSON.stringify(categories.payload));
      });
  }
  getBranchDetails() {
    this.nadminSettingsService.getBranchDetails(this.branchId)
      .subscribe(
        shops => {
          this.branchDetails = shops.payload.branchdetails[0];
          //console.log('branch details -------'+JSON.stringify(this.branchDetails));
          this.userShop = this.branchDetails.shop_id;
          this.shopCategory = this.branchDetails.branch_cat_id;
          this.selectedCurrency = this.branchDetails.currency;
          this.opening_time = new Date('01-01-2019 ' + this.branchDetails.open_time);
          this.closing_time = new Date('01-01-2019 ' + this.branchDetails.close_time);
          this.theme = { themes: this.branchDetails.home_screen_theme.toString() };
          this.isPosEnabled = this.branchDetails.isPosEnabled;
          this.track_stock = this.branchDetails.track_stock;
          this.isAdminDelivery = this.branchDetails.isAdminDelivery;
          this.latitude = parseFloat(this.branchDetails.latitude);
          this.longitude = parseFloat(this.branchDetails.longitude);
          this.initGoogleServices();
        });
  }

  initGoogleServices() {
    // console.log(this.branchDetails.latitude);
    // console.log(this.branchDetails.longitude);
    this.zoom = 15;
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }
  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }
  uploadImage(event, addFileUpload) {
    // console.log(event.files[0]);
    if(event.files[0].size < 60000){
      this.spinner.show();
    this.nadminSettingsService.uploadImage(event.files[0])
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
    }else {
      this.toastr.error('Please upload the small size image.', 'Image Size Bigger!');
      addFileUpload.clear();
    } 
  }
  updateBranch(form: NgForm, addFileUpload) {
    if (!form.valid) {
      this.toastr.warning('Please fill all the details!', 'Add All Details.');
      return;
    }
    const value = form.value;

    if (value.phone.length < 12 || value.phone.length > 13 || value.phone[0] !== '+') {
      this.toastr.warning('Please check the + and country code', 'Invalid Phone Number');
      return;
    }
    if (value.maxdistance > 30 ) {
      this.toastr.warning('Radius should not be more than 30', 'Please check the Radius');
      return;
    }
    if(value.welcomeMessage !== null){
      if (value.welcomeMessage.length > 400 ) {
        this.toastr.warning('Please check the welcome message', 'Lenght exceeded');
        return;
      }
    }
    if (this.uploadedImage !== '') {
      value.imageChanged = true;
      value.image = this.uploadedImage;
    } else {
      value.imageChanged = false;
      value.image = this.branchDetails.image;
    }

    if(value.minamount <5){
      this.toastr.warning('Minimum amount should not be less than 5', 'Please check the Minimum Amount');
      return;
    }
    value.delchargless3 = value.delchargless3.toString();
    value.delchargless5 = value.delchargless5.toString();
    value.delchargless10 = value.delchargless10.toString();
    value.delchargless15 = value.delchargless15.toString();
    value.delchargless20 = value.delchargless20.toString();
    value.latitude = this.latitude;
    value.longitude = this.longitude;
    value.isAdminDelivery = this.isAdminDelivery;
    value.branch_id = this.branchDetails.branch_id;
    // console.log(value);
    this.spinner.show();
    this.nadminSettingsService.updateBranch(value)
      .subscribe(
        response => {
          this.spinner.hide();
          // console.log(response);
          if (response.status === 201) {
            this.toastr.success('Your branch has been updated successfully!', 'Branch Updated!');
            this.uploadedImage = '';
            this.router.navigate(['admin/nadmin/settings']);
          } else if (response.status === 406) {
            this.toastr.warning('You have not changed anything!', 'Nothing to save!');
          } else {
            this.toastr.error('There was a problem updating the branch!', 'Branch Add Error!');
          }
        }, error => {
          // addFileUpload.clear();
          this.spinner.hide();
          this.toastr.error(error.error.message, 'Error!');
        }
      );
  }
}
