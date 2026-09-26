import { NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
// import { AgmCoreModule } from "@agm/core";
import { SadminHeaderMenuComponent } from "../widgets/sadmin/sadmin-header-menu/sadmin-header-menu.component";
import { ToastrModule } from "ngx-toastr";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { NgxSpinnerModule } from "ngx-spinner";
import { DropdownModule } from "primeng/dropdown";
import { FileUploadModule } from "primeng/fileupload";

@NgModule({
  declarations: [SadminHeaderMenuComponent],
  imports: [
    FormsModule,
    ToastrModule,
    TableModule,
    DialogModule,
    ButtonModule,
    NgxSpinnerModule,
    DropdownModule,
    FileUploadModule,
  ],
  exports: [
    FormsModule,
    SadminHeaderMenuComponent,
    ToastrModule,
    TableModule,
    DialogModule,
    ButtonModule,
    NgxSpinnerModule,
    DropdownModule,
    FileUploadModule,
  ],
})
export class SharedModule {}
