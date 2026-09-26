import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nadmin',
  templateUrl: './nadmin.component.html',
  styleUrls: ['./nadmin.component.scss']
})
export class NadminComponent implements OnInit {

  constructor(private title:Title) { }

  ngOnInit() {
    this.title.setTitle("Mini Mart | Fresh groceries delivery mobile app | Download today");
  }

}
