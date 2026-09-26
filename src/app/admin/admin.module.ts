import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminComponent } from "./admin.component";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    SharedModule,   
  ]
})
export class AdminModule { }
