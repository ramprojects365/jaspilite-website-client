import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutUsComponent } from "./public/about-us/about-us.component";
import { BecomePartnerComponent } from "./public/become-partner/become-partner.component";
import { ComplaintsComponent } from "./public/complaints/complaints.component";
import { ContactUsComponent } from "./public/contact-us/contact-us.component";
import { HomeComponent } from "./public/home/home.component";
import { PageNotFoundComponent } from "./public/pagenotfoundcomponent/pagenotfoundcomponent.component";
import { ProductsComponent } from "./public/products/products.component";
import { PromoCodesComponent } from "./public/promo-codes/promo-codes.component";
import { JobsComponent } from "./public/jobs/jobs.component";
import { DownloadComponent } from "./public/download/download.component";
//import { AuthAdminGuard } from './services/admin/admin-login/auth-admin.guard';

const appRoutes: Routes = [
  {
    path: "user",
    loadChildren: () =>
      import("./user/user.module").then(
        (m) => m.UserModule
      ),
  },
  {
    path: "",
    redirectTo: "online-food-and-grocery-mobile-app",
    pathMatch: "full",
  },
  { path: "home", component: HomeComponent },
  { path: "online-food-and-grocery-mobile-app", component: HomeComponent },
  { path: "about-minimart-mobile-app", component: AboutUsComponent },
  { path: "faq", component: ComplaintsComponent },
  { path: "how-to-become-a-partner", component: BecomePartnerComponent },
  { path: "products", component: ProductsComponent },
  { path: "promo-codes", component: PromoCodesComponent },
  { path: "minimart-jobs", component: JobsComponent },
  { path: "contact-minimart-mobile-app-team", component: ContactUsComponent },
  { path: "download", component: DownloadComponent },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  { path: "**", redirectTo: "/online-food-and-grocery-mobile-app" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
