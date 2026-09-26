import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';

import { NadminRoutingModule } from './nadmin-routing.module';
import { NadminComponent } from './nadmin.component';
import { NadminLeftMenuComponent } from 'src/app/widgets/nadmin/nadmin-left-menu/nadmin-left-menu.component';
import { NadminDashboardComponent } from './nadmin-dashboard/nadmin-dashboard.component';
import { NadminHeaderMenuComponent } from 'src/app/widgets/nadmin/nadmin-header-menu/nadmin-header-menu.component';
import { NadminFooterMenuComponent } from 'src/app/widgets/nadmin/nadmin-footer-menu/nadmin-footer-menu.component';
import { NadminBoxRecordsComponent } from './nadmin-dashboard/nadmin-box-records/nadmin-box-records.component';
import { NadminUsersComponent } from './nadmin-users/nadmin-users.component';
import { NadminProductsComponent } from './nadmin-products/nadmin-products.component';
import { NadminVoucherComponent } from './nadmin-voucher/nadmin-voucher.component';
import { NadminSettingsComponent } from './nadmin-settings/nadmin-settings.component';
import { NadminSalesComponent } from './nadmin-sales/nadmin-sales.component';
import { NadminSalesdetailsComponent } from './nadmin-sales/nadmin-salesdetails/nadmin-salesdetails.component';
import { NadminAddshopComponent } from './nadmin-settings/nadmin-addshop/nadmin-addshop.component';
import { NadminAddbranchComponent } from './nadmin-settings/nadmin-addbranch/nadmin-addbranch.component';
import { NadminEditshopComponent } from './nadmin-settings/nadmin-editshop/nadmin-editshop.component';
import { NadminEditbranchComponent } from './nadmin-settings/nadmin-editbranch/nadmin-editbranch.component';
import { NadminDashboardActiveComponent } from './nadmin-dashboard/nadmin-dashboard-active/nadmin-dashboard-active.component';
import { NadminDashboardActiveOrderDetailsComponent } from './nadmin-dashboard/nadmin-dashboard-active/nadmin-dashboard-active-order-details/nadmin-dashboard-active-order-details.component';
import { NadminPromotionsComponent } from './nadmin-promotions/nadmin-promotions.component';
import { NadminAddpromotionComponent } from './nadmin-promotions/nadmin-addpromotion/nadmin-addpromotion.component';
import { NadminUsersService } from './nadmin-users/nadminusers.service';
import { NadminProductsService } from './nadmin-products/nadminproducts.service';
import { NadminSalesService } from './nadmin-sales/nadminsales.service';
import { NadminPromotionsService } from './nadmin-promotions/nadminpromotions.service';
import { NadminVoucherService } from './nadmin-voucher/nadminvoucher.service';
import { NadminSettingsService } from './nadmin-settings/nadminsettings.service';
import { NadminDashboardService } from './nadmin-dashboard/nadmindashboard.service';
import { NadminActiveService } from './nadmin-dashboard/nadmin-dashboard-active/nadmin-active.service';
import { NadminAddpromoproductsComponent } from './nadmin-promotions/nadmin-addpromoproducts/nadmin-addpromoproducts.component';


@NgModule({
  declarations: [
    NadminComponent,
    NadminLeftMenuComponent,
    NadminDashboardComponent,
    NadminHeaderMenuComponent,
    NadminFooterMenuComponent,
    NadminBoxRecordsComponent,
    NadminUsersComponent,
    NadminProductsComponent,
    NadminVoucherComponent,
    NadminSettingsComponent,
    NadminSalesComponent,
    NadminSalesdetailsComponent,
    NadminAddshopComponent,
    NadminAddbranchComponent,
    NadminEditshopComponent,
    NadminEditbranchComponent,
    NadminDashboardActiveComponent,
    NadminDashboardActiveOrderDetailsComponent,
    NadminPromotionsComponent,
    NadminAddpromotionComponent,
    NadminAddpromoproductsComponent,
  ],
  imports: [
    NadminRoutingModule,
    CommonModule,
    SharedModule,
    CheckboxModule,
    CalendarModule,
  ],
  providers : [
    NadminUsersService,
    NadminProductsService,
    NadminSalesService,
    NadminPromotionsService,
    NadminVoucherService,
    NadminSettingsService,
    NadminDashboardService,
    NadminActiveService,
  ]
})
export class NadminModule { }
