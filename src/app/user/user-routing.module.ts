import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDeleteSuccessComponent } from './user-delete-success/user-delete-success.component';

const routes:Routes = [
   { path : '', component : LoginComponent },
   { path : 'profile', component : ProfileComponent },
   { path : 'user-delete-success', component : UserDeleteSuccessComponent }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class UserRoutingModule {}