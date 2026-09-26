import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerSalesComponent } from './manager-sales/manager-sales.component';
import { ManagerProductsComponent } from './manager-products/manager-products.component';
import { ManagerSalesdetailsComponent } from './manager-sales/manager-salesdetails/manager-salesdetails.component';
import { ManagerComponent } from './manager.component';
import { ManagerLeftMenuComponent } from 'src/app/widgets/manager/manager-left-menu/manager-left-menu.component';
import { ManagerBoxRecordsComponent } from './manager-dashboard/manager-box-records/manager-box-records.component';
import { ManagerDashboardActiveComponent } from './manager-dashboard/manager-dashboard-active/manager-dashboard-active.component';
import { ManagerDashboardService } from './manager-dashboard/managerdashboard.service';
import { ManagerActiveService } from './manager-dashboard/manager-dashboard-active/manager-active.service';
import { ManagerProductsService } from './manager-products/managerproducts.service';
import { ManagerSalesService } from './manager-sales/managersales.service';

@NgModule({
  declarations: [
    ManagerDashboardComponent,
    ManagerProductsComponent,
    ManagerSalesComponent,
    ManagerSalesdetailsComponent,
    ManagerComponent,
    ManagerLeftMenuComponent,
    ManagerBoxRecordsComponent,
    ManagerDashboardActiveComponent,
  ],
  imports: [
      ManagerRoutingModule,
      CommonModule,
      SharedModule,
      CheckboxModule,   
  ],
  providers : [
    ManagerDashboardService,
    ManagerActiveService,
    ManagerProductsService,
    ManagerSalesService
  ]
})
export class ManagerModule { }
