import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileData = [];
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    //console.log('user data in profile page '+ JSON.stringify(this.profileData));
    let localData = JSON.parse(localStorage.getItem("userSocialData"));
    if (localData) {
      this.profileData = JSON.parse(localStorage.getItem("userSocialData"));
    } else {
      this.router.navigate(["/user"]);
    }
  }
  async deleteUser() {
    var currentUser = await this.afAuth.currentUser;
    currentUser.delete();
    //this.toastr.success('User deleted successfully!');
    this.router.navigate(["/user/user-delete-success"]);
    localStorage.removeItem("userSocialData");
  }
  logout() {
    localStorage.removeItem("userSocialData");
    this.router.navigate(["/user"]);
  }
}
