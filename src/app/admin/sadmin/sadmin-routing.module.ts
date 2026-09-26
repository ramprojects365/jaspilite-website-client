import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from "src/app/services/admin/admin-login/auth-admin.guard";
import { SadminCategoryComponent } from "./sadmin-category/sadmin-category.component";
import { SadminCostingComponent } from "./sadmin-costing/sadmin-costing.component";
import { SadminDashboardComponent } from "./sadmin-dashboard/sadmin-dashboard.component";
import { SadminProductsComponent } from "./sadmin-products/sadmin-products.component";
import { SadminSalesComponent } from "./sadmin-sales/sadmin-sales.component";
import { SadminShopdetailsComponent } from "./sadmin-shops/sadmin-shopdetails/sadmin-shopdetails.component";
import { SadminShopsComponent } from "./sadmin-shops/sadmin-shops.component";
import { SadminUsersComponent } from "./sadmin-users/sadmin-users.component";
import { SadminComponent } from "./sadmin.component";



const route: Routes = [        
          {
            path: '', component: SadminComponent, canActivate: [AuthAdminGuard], children: [
              { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
              { path: 'dashboard', component: SadminDashboardComponent },
              { path: 'sales', component: SadminSalesComponent },
              { path: 'shops', component: SadminShopsComponent }, 
              { path: 'shopdetails', component: SadminShopdetailsComponent },             
              { path: 'users', component: SadminUsersComponent },
              { path: 'category', component: SadminCategoryComponent },
              { path: 'products', component: SadminProductsComponent },
              { path: 'costing', component: SadminCostingComponent },                 
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

export class SadminRoutingModule {}