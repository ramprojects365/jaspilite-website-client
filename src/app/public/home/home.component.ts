import { Component, OnInit } from '@angular/core';
import { Title, Meta  } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PublicService } from '../public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private title:Title, private spinner: NgxSpinnerService,private toastr: ToastrService, private metaService: Meta, private publicService: PublicService) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart | Online Grocery Delivery Services in Malaysia | Free Delivery");
    this.metaService.updateTag(
      { name: 'keywords', content: 'convenience store, happy fresh, tesco, jaya grocer, delivery app, grocery delivery, free delivery, chines grocery, food and grocery in malaysia' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'We are the largest Indian food and grocery online store in little India, Brickfields Kuala Lumpur. We have the best selection of Indian groceries so you can prepare staple Indian dishes with ease! You can find everything from Indian groceries, Indian food, fresh vegetables, dairy products, cooking gas, fresh milk, Indian homemade products, bakery items, Indian species many more.' }
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
