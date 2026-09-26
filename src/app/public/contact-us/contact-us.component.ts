import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta  } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { PublicService } from '../public.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  name: string;
  mobilenumber: string;
  email: string;
  message: string;

  constructor(private router: Router, private title:Title, private metaService: Meta, private spinner: NgxSpinnerService, private toastr: ToastrService, private publicService: PublicService) { }
  ngOnInit() {
    this.title.setTitle("Mini Mart | Indian Grocery Delivery Services in Malaysia | Free Delivery"); 
    this.metaService.updateTag(
      { name: 'keywords', content: 'Partner with Mini mart, How to contact, Grocery Shopping, Indian Grocery, Mini Market, Little India Grocery' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'If you want to become Minimart partner, please reach our team (+60 10 544 9974) with the below details. We will help you to register with us. Your name, email address, phone number, shop name, shop Address, shop logo.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    ); 
  }
  contactUs(form: NgForm){
    if (!form.valid) {
      return;
    }
    this.spinner.show();
    const value = form.value;    

    this.publicService.contactUs(value)
    .subscribe(
      response => {
        this.spinner.hide();
        if (response.status === 200) {
          this.toastr.success('Thank you for contacting Minimart.', 'Submit success!');
          form.reset();      
        } else {
          this.toastr.error('There was a problem updating query!', 'Submit failed!');
        }
      }, error => {
        this.spinner.hide();
        this.toastr.error(error.error.message, 'Error!');
      }
    );
  }
}
