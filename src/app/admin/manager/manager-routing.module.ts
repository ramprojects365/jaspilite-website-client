import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from "src/app/services/admin/admin-login/auth-admin.guard";
import { ManagerDashboardComponent } from "./manager-dashboard/manager-dashboard.component";
import { ManagerProductsComponent } from "./manager-products/manager-products.component";
import { ManagerSalesComponent } from "./manager-sales/manager-sales.component";
import { ManagerSalesdetailsComponent } from "./manager-sales/manager-salesdetails/manager-salesdetails.component";
import { ManagerComponent } from "./manager.component";



const route: Routes = [          
    {
        path: '', component: ManagerComponent, canActivate: [AuthAdminGuard], children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: ManagerDashboardComponent },        
          { path: 'products', component: ManagerProductsComponent },
          { path: 'sales', component: ManagerSalesComponent },
          { path: 'salesdetails', component: ManagerSalesdetailsComponent },
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

export class ManagerRoutingModule {}