import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from "src/app/services/admin/admin-login/auth-admin.guard";
import { PadminProductsComponent } from "./padmin-products/padmin-products.component";
import { PadminComponent } from "./padmin.component";


const route: Routes = [
          {
            path: '', component: PadminComponent, canActivate: [AuthAdminGuard], children: [
              { path: '', redirectTo: 'products', pathMatch: 'full' },      
              { path: 'products', component: PadminProductsComponent },
            ]
          },       
];


@NgModule({
    imports:[
        RouterModule.forChild(route)
    ],
    exports:[
        RouterModule
    ]
})

export class PadminRoutingModule {}