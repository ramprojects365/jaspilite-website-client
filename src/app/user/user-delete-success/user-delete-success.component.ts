import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete-success',
  templateUrl: './user-delete-success.component.html',
  styleUrls: ['./user-delete-success.component.scss']
})
export class UserDeleteSuccessComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  // goBack() {
  //   this.router.navigate(['/user']);
  // }

}
