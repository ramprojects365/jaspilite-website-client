import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { Globals } from "./globals/admin-global";
import { UtilityService } from "./services/utilities.service";
import { AdminLoginService } from "./services/admin/admin-login/adminlogin.service";
import { LoginAdminInterceptor } from "./services/interceptors/login-admin-interceptor.service";
import { AuthAdminGuard } from "./services/admin/admin-login/auth-admin.guard";
import { PublicService } from "./public/public.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./public/home/home.component";
import { PublicComponent } from "./public/public.component";
import { AboutUsComponent } from "./public/about-us/about-us.component";
import { ComplaintsComponent } from "./public/complaints/complaints.component";
import { MainmenuComponent } from "./widgets/common/mainmenu/mainmenu.component";
import { PublicFooterComponent } from "./widgets/common/footer/public-footer/public-footer.component";
import { BecomePartnerComponent } from "./public/become-partner/become-partner.component";
import { PageNotFoundComponent } from "./public/pagenotfoundcomponent/pagenotfoundcomponent.component";
import { ProductsComponent } from "./public/products/products.component";
import { ContactUsComponent } from "./public/contact-us/contact-us.component";
import { PromoCodesComponent } from "./public/promo-codes/promo-codes.component";
import { JobsComponent } from "./public/jobs/jobs.component";

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { DownloadComponent } from "./public/download/download.component";

const config = {
  apiKey: "AIzaSyBsuyNGdnrXbHVhQp7nnEFyEdbutTuACM0",
  authDomain: "minimart-be661.firebaseapp.com",
  databaseURL: "https://minimart-be661.firebaseio.com",
  projectId: "minimart-be661",
  storageBucket: "minimart-be661.appspot.com",
  messagingSenderId: "16143142924",
  appId: "1:16143142924:web:448c3de1254cc2a53d1e29",
  measurementId: "G-XMMCBSBCNQ",
};

@NgModule({
  declarations: [
    HomeComponent,
    PublicComponent,
    AboutUsComponent,
    ComplaintsComponent,
    BecomePartnerComponent,
    ProductsComponent,
    ContactUsComponent,
    PublicFooterComponent,
    MainmenuComponent,
    PageNotFoundComponent,
    AppComponent,
    PromoCodesComponent,
    JobsComponent,
    DownloadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
      preventDuplicates: false,
    }),
    NgxSpinnerModule,

    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
  ],
  providers: [
    AuthAdminGuard,
    UtilityService,
    AdminLoginService,
    PublicService,
    Globals,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginAdminInterceptor,
      multi: true,
    },
    // CallApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
