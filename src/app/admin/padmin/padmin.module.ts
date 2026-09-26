import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PadminRoutingModule } from './padmin-routing.module';

import { PadminComponent } from './padmin.component';
import { PadminProductsComponent } from './padmin-products/padmin-products.component';
import { PadminLeftMenuComponent } from 'src/app/widgets/padmin/padmin-left-menu/padmin-left-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PAdminProductsService } from './padmin-products/padminproducts.service';


@NgModule({
  declarations: [
    PadminComponent,
    PadminProductsComponent,
    PadminLeftMenuComponent,   
  ],
  imports: [
    PadminRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers : [
    PAdminProductsService,
  ]
})
export class PadminModule { }
