import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sadmin-dashboard',
  templateUrl: './sadmin-dashboard.component.html',
  styleUrls: ['./sadmin-dashboard.component.scss']
})
export class SadminDashboardComponent implements OnInit {

  constructor(private title:Title) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart - Indian Grocery Store in Malaysia");
  }

}
