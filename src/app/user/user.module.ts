
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { UserLoginService } from './services/userlogin.service';
import { ProfileComponent } from './profile/profile.component';
import { UserDeleteSuccessComponent } from './user-delete-success/user-delete-success.component';

@NgModule({
  declarations: [
  LoginComponent,
  ProfileComponent,
  UserDeleteSuccessComponent,
  ],
  imports: [  
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  providers:[
    UserLoginService,
  ]
})
export class UserModule { }
