import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from "src/app/services/admin/admin-login/auth-admin.guard";
import { NadminDashboardActiveOrderDetailsComponent } from "./nadmin-dashboard/nadmin-dashboard-active/nadmin-dashboard-active-order-details/nadmin-dashboard-active-order-details.component";
import { NadminDashboardComponent } from "./nadmin-dashboard/nadmin-dashboard.component";
import { NadminProductsComponent } from "./nadmin-products/nadmin-products.component";
import { NadminAddpromotionComponent } from "./nadmin-promotions/nadmin-addpromotion/nadmin-addpromotion.component";
import { NadminAddpromoproductsComponent } from './nadmin-promotions/nadmin-addpromoproducts/nadmin-addpromoproducts.component';
import { NadminPromotionsComponent } from "./nadmin-promotions/nadmin-promotions.component";
import { NadminSalesComponent } from "./nadmin-sales/nadmin-sales.component";
import { NadminSalesdetailsComponent } from "./nadmin-sales/nadmin-salesdetails/nadmin-salesdetails.component";
import { NadminAddbranchComponent } from "./nadmin-settings/nadmin-addbranch/nadmin-addbranch.component";
import { NadminAddshopComponent } from "./nadmin-settings/nadmin-addshop/nadmin-addshop.component";
import { NadminEditbranchComponent } from "./nadmin-settings/nadmin-editbranch/nadmin-editbranch.component";
import { NadminEditshopComponent } from "./nadmin-settings/nadmin-editshop/nadmin-editshop.component";
import { NadminSettingsComponent } from "./nadmin-settings/nadmin-settings.component";
import { NadminUsersComponent } from "./nadmin-users/nadmin-users.component";
import { NadminVoucherComponent } from "./nadmin-voucher/nadmin-voucher.component";
import { NadminComponent } from "./nadmin.component";


const route: Routes = [        
    {
        path: '', component: NadminComponent, canActivate: [AuthAdminGuard], children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: NadminDashboardComponent },
          { path: 'activeOrderDetails', component: NadminDashboardActiveOrderDetailsComponent },
          { path: 'sales', component: NadminSalesComponent },
          { path: 'salesdetails', component: NadminSalesdetailsComponent },
          { path: 'users', component: NadminUsersComponent },
          { path: 'products', component: NadminProductsComponent },
          { path: 'promotions', component: NadminPromotionsComponent },
          { path: 'addpromotion', component: NadminAddpromotionComponent },
          { path: 'addpromoproducts', component: NadminAddpromoproductsComponent },
          { path: 'vouchers', component: NadminVoucherComponent },
          { path: 'settings', component: NadminSettingsComponent },
          { path: 'addshop', component: NadminAddshopComponent },
          { path: 'editshop/:shop', component: NadminEditshopComponent },
          { path: 'addbranch', component: NadminAddbranchComponent },
          { path: 'editbranch/:branch', component: NadminEditbranchComponent },
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

export class NadminRoutingModule {}