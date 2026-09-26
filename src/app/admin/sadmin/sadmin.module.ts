import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

import { SharedModule } from 'src/app/shared/shared.module';
import { SadminLeftMenuComponent } from 'src/app/widgets/sadmin/sadmin-left-menu/sadmin-left-menu.component';
import { SadminComponent } from './sadmin.component';
import { SadminUsersComponent } from './sadmin-users/sadmin-users.component';
import { SadminShopsComponent } from './sadmin-shops/sadmin-shops.component';
import { SadminShopdetailsComponent } from './sadmin-shops/sadmin-shopdetails/sadmin-shopdetails.component';
import { SadminSalesComponent } from './sadmin-sales/sadmin-sales.component';
import { SadminProductsComponent } from './sadmin-products/sadmin-products.component';
import { SadminDashboardComponent } from './sadmin-dashboard/sadmin-dashboard.component';
import { SadminCategoryComponent } from './sadmin-category/sadmin-category.component';
import { SadminCostingComponent } from './sadmin-costing/sadmin-costing.component';
import { SadminFooterMenuComponent } from 'src/app/widgets/sadmin/sadmin-footer-menu/sadmin-footer-menu.component';
import { SadminBoxRecordsComponent } from './sadmin-dashboard/sadmin-box-records/sadmin-box-records.component';
import { SadminDashboardActiveComponent } from './sadmin-dashboard/sadmin-dashboard-active/sadmin-dashboard-active.component';
import { SadminRoutingModule } from './sadmin-routing.module';
import { SadminBoxService } from './sadmin-dashboard/sadmin-box-records/sadmin-box.service';
import { SadminUsersService } from './sadmin-users/sadminusers.service';
import { SadminCategoriesService } from './sadmin-category/sadmincategories.service';
import { SadminProductsService } from './sadmin-products/sadminproducts.service';
import { SadminSalesService } from './sadmin-sales/sadminsales.service';
import { SadminActiveService } from './sadmin-dashboard/sadmin-dashboard-active/sadmin-active.service';
import { SadmincostingService } from './sadmin-costing/sadmincosting.service';
import { SadminCostingExcelService } from './sadmin-costing/sadmin-costing-excel.service';


@NgModule({
  declarations: [
    SadminComponent,
    SadminDashboardComponent,
    SadminLeftMenuComponent,
    SadminFooterMenuComponent,
    SadminBoxRecordsComponent,
    SadminUsersComponent,
    SadminCategoryComponent,
    SadminProductsComponent,
    SadminSalesComponent,
    SadminCostingComponent,
    SadminShopsComponent,
    SadminShopdetailsComponent,
    SadminDashboardActiveComponent, 
  ],
  imports: [
    SadminRoutingModule,
    CommonModule,
    SharedModule,
    CalendarModule,
    CheckboxModule,   
  ],
  providers : [
    SadminBoxService,
    SadminUsersService,
    SadminCategoriesService,
    SadminProductsService,
    SadminSalesService,
    SadminActiveService,
    SadmincostingService,
    SadminCostingExcelService
  ]
})
export class SadminModule { }
