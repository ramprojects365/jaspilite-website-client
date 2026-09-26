import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { UserLoginService } from "../services/userlogin.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  socialLoginData = [];
  constructor(
    private UserLoginService: UserLoginService,
    private router: Router,
    public afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  async loginGoogle() {
    let googleResponse = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider(),
    );
    //console.log('login user info-- '+JSON.stringify(googleResponse));
    if (googleResponse.additionalUserInfo.isNewUser == true) {
      var currentUser = await this.afAuth.currentUser;
      currentUser.delete();
      this.toastr.error("This user is not registered with us");
    } else {
      this.spinner.show();
      if (googleResponse.user.uid) {
        this.UserLoginService.getSocialResponse(
          googleResponse.user.uid,
        ).subscribe(
          (response) => {
            this.spinner.hide();
            if (response.status === 200) {
              this.socialLoginData = response.payload.user;
              localStorage.setItem(
                "userSocialData",
                JSON.stringify(this.socialLoginData),
              );
              this.router.navigate(["/user/profile"]);
            } else {
              this.toastr.error("failed!");
            }
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(error.error.message, "Error!");
          },
        );
      }
    }
  }
  async loginFacebook() {
    let facebookResponse = await this.afAuth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider(),
    );
    //console.log('is new user '+JSON.stringify(facebookResponse));
    if (facebookResponse.additionalUserInfo.isNewUser == true) {
      var currentUser = await this.afAuth.currentUser;
      currentUser.delete();
      this.toastr.error("This user is not registered with us");
    } else {
      this.spinner.show();
      if (facebookResponse.user.uid) {
        this.UserLoginService.getSocialResponse(
          facebookResponse.user.uid,
        ).subscribe(
          (response) => {
            this.spinner.hide();
            if (response.status === 200) {
              this.socialLoginData = response.payload.user;
              localStorage.setItem(
                "userSocialData",
                JSON.stringify(this.socialLoginData),
              );
              this.router.navigate(["/user/profile"]);
            } else {
              this.toastr.error("failed!");
            }
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error(error.error.message, "Error!");
          },
        );
      }
    }
  }
}
