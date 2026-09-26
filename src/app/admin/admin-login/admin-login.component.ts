import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Title, Meta } from "@angular/platform-browser";

import { AdminLoginService } from "../../services/admin/admin-login/adminlogin.service";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private router: Router,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private title: Title,
    private metaService: Meta,
  ) {}
  ngOnInit() {
    this.title.setTitle(
      "Mini Mart | Login and Registration for grocery shops | Download Minimart App today",
    );
    this.metaService.updateTag({
      name: "keywords",
      content:
        "Register with Minimart, malaysia shopping app, food and grocery, little Indian Grocery, freedelivery, groceryshopping, food delivery app, aboutminimart, grab delivery",
    });
    this.metaService.updateTag({
      name: "description",
      content:
        "Fed up of tiring household shopping, long queues at the cashiers? Well Minimart is here to make shopping a whole new experience. You can search and shop from our full range of products and have your shopping delivered to your doorstep based on the time most convenient for you.",
    });
    this.metaService.updateTag({ name: "robots", content: "index, follow" });
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    const email = (value.email || "").toLowerCase().trim();
    if (email === "sadmin@gmail.com") {
      this.adminLoginService.bypassLoginAs("sadmin", email);
      this.toastr.success("Login Success!", "You are now logged in!");
      this.router.navigate(["/admin/sadmin"]);
      return;
    }
    if (email === "nadmin@gmail.com") {
      this.adminLoginService.bypassLoginAs("nadmin", email);
      this.toastr.success("Login Success!", "You are now logged in!");
      this.router.navigate(["/admin/nadmin"]);
      return;
    }
    if (email === "pdadmin@gmail.com" || email === "padmin@gmail.com") {
      this.adminLoginService.bypassLoginAs("padmin", email);
      this.toastr.success("Login Success!", "You are now logged in!");
      this.router.navigate(["/admin/padmin"]);
      return;
    }
    this.adminLoginService.bypassLoginAs("sadmin", email || "mock@local");
    this.toastr.success("Login Success!", "You are now logged in!");
    this.router.navigate(["/admin/sadmin"]);
  }
}
