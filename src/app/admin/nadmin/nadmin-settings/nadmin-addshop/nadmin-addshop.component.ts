import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title, Meta  } from '@angular/platform-browser';

import { NadminSettingsService } from '../nadminsettings.service';
import { AdminLoginService } from '../../../../services/admin/admin-login/adminlogin.service';

@Component({
  selector: 'app-nadmin-addshop',
  templateUrl: './nadmin-addshop.component.html',
  styleUrls: ['./nadmin-addshop.component.scss']
})
export class NadminAddshopComponent implements OnInit {

  constructor(
    public router: Router,
    private adminLoginService: AdminLoginService,
    private nadminSettingsService: NadminSettingsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title:Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart | How to become a partner | Download today");
    this.metaService.addTags([
      {name: 'keywords', content: 'e-commerce, m-commerce, southbank Grocery Shop, scott garden Telugu Grocery Shops, Hyderbadi Biryani in Malaysia, Talapakatti, Chettinadu, Grocery In Malaca, Grocery in Ipoh'},
      {name: 'description', content: 'Malaysia own Indian e-commerce store. Same day delivery to PJ, Klang, Shah Alam, Kajang, Brickfields, Kuala Lumpur, Selayang, Batu Caves, Klang Valley'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

  addShop(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    //console.log(value);
    value.user_id = this.adminLoginService.adminUser.getValue().adminId;
    this.spinner.show();
    this.nadminSettingsService.addShop(value)
      .subscribe(response => {
        // console.log(response);
        this.spinner.hide();
        if (response.status === 201) {
          this.toastr.success('The new shop you have added has been saved.!', 'Shop Added!');
          form.reset();
          this.router.navigate(['admin/nadmin/settings']);
        } else {
          // console.log(response);
          this.toastr.error('The new shop you have added has not been saved!', 'Shop Not Added!');
        }
      }, error => {
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      });
  }

  resetForm(form: NgForm) {
    form.reset();
  }

}
