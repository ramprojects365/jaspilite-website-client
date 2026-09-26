import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta  } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private title:Title, private router: Router, private toastr: ToastrService, private metaService: Meta, @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart - Jobs | Minimart Careers | Minimart Jobs in Malaysia");
    this.metaService.updateTag(
      { name: 'keywords', content: 'jobs, marketing jobs, minimart jobs in Malaysia, digital marketing, minimart careers, grocery mart jobs, online jobs, food panda jobs, grocery shopping jobs, sales' }
    );
    this.metaService.updateTag(
      { name: 'description', content: 'New jobs for Minimart in Malaysia available today - Digital marketing, Mobile and Web developers, Sales exicutive, groceries packing, rider jobs, photoshop designers etc.' }
    );
    this.metaService.updateTag(
      { name: 'robots', content: 'index, follow' }
    );
    if(isPlatformBrowser(this.platformId)){
      $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).siblings('.panel-heading').addClass('active');
      });
    
      $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).siblings('.panel-heading').removeClass('active');
      });      
    }
  }

}
