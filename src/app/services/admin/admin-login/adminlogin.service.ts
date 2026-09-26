import { Injectable } from "@angular/core";
// import { Http, Response } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import * as jwt_decode from "jwt-decode";

// import { CallApiService } from '../../common/callapi.service';
import { AdminUser } from "../../../model/admin/adminuser.model";
import { Globals } from "src/app/globals/admin-global";
import { Router } from "@angular/router";

interface LoginResponse {
  name: string;
  message: string;
  status: number;
  payload?: any;
}

@Injectable()
export class AdminLoginService {
  adminUser = new BehaviorSubject<AdminUser>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private router: Router,
  ) {}

  // getAdminUser() {
  //     return this.adminUser
  //         .subscribe(userData => {
  //             console.log('UserData --------- ' + JSON.stringify(userData));
  //             const user: AdminUser = new AdminUser(userData, userData.getToken, userData.refreshToken,
  //                 new Date(userData.tokenExpirationDate));
  //             return user;
  //         });
  // }

  adminLogout() {
    this.adminUser.next(null);
    localStorage.removeItem(this.globals.strUserData);
    if (this.tokenExpirationTimer) {
      clearInterval(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(["/admin"]);
  }

  autoAdminLogout(expirationDuration: number) {
    // console.log('Timeout in ' + expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.adminLogout();
    }, expirationDuration);
  }

  autoAdminLogin() {
    const userData: {
      adminId: number;
      displayName: string;
      userType: string;
      email: string;
      token: string;
      refreshToken: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem(this.globals.strUserData));
    if (!userData) {
      return;
    }
    const loadedUser = new AdminUser(
      userData,
      userData.token,
      userData.refreshToken,
      new Date(userData.tokenExpirationDate),
    );
    if (loadedUser.getToken) {
      this.adminUser.next(loadedUser);
      const expirationDuration =
        new Date(loadedUser.tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoAdminLogout(expirationDuration);
    }
  }

  adminLogin(email: string, password: string) {
    // tslint:disable-next-line:object-literal-shorthand - by Sunoj
    return this.http
      .post<LoginResponse>("api/v2/admin/web/login", {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.HandleError),
        tap((resData) => {
          this.AuthenticateAdminUser(resData);
        }),
      );
  }

  private AuthenticateAdminUser(resData: LoginResponse) {
    const expirationDate = this.getTokenExpirationDate(
      resData.payload.refreshToken,
    );
    // console.log('Expiration Date - ' + expirationDate);
    const user = new AdminUser(
      resData.payload.admin_user,
      resData.payload.token,
      resData.payload.refreshToken,
      expirationDate,
    );
    this.adminUser.next(user);
    const expirationDuration =
      new Date(user.tokenExpirationDate).getTime() - new Date().getTime();
    this.autoAdminLogout(expirationDuration);
    // Save user data to local storage
    localStorage.setItem(this.globals.strUserData, JSON.stringify(user));
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  private HandleError(errorRes: LoginResponse) {
    // console.log('errorRes ' + JSON.stringify(errorRes.json()));
    if (errorRes && errorRes.message) {
      return throwError(errorRes.message);
    } else {
      return throwError("An unknown error occured");
    }
  }

  adminRefreshToken() {
    const userData: {
      adminId: number;
      displayName: string;
      userType: string;
      email: string;
      token: string;
      refreshToken: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem(this.globals.strUserData));
    // console.log('Refresh Token ' + userData.refreshToken);
    // tslint:disable-next-line:object-literal-shorthand
    return this.http
      .post<LoginResponse>("api/v2/admin/web/refreshtoken/admin", {
        refreshToken: userData.refreshToken,
      })
      .pipe(
        catchError(this.HandleError),
        tap((resData) => {
          this.UpdateTokenInUser(resData);
        }),
      );
  }

  private UpdateTokenInUser(resData: LoginResponse) {
    // console.log('USER ' + JSON.stringify(resData));
    const userData: {
      adminId: number;
      displayName: string;
      userType: string;
      email: string;
      token: string;
      refreshToken: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem(this.globals.strUserData));
    // console.log('Existing user - ' + JSON.stringify(userData));
    userData.token = resData.payload.token;
    localStorage.setItem(this.globals.strUserData, JSON.stringify(userData));
    const adminUser: AdminUser = new AdminUser(
      userData,
      userData.token,
      userData.refreshToken,
      new Date(userData.tokenExpirationDate),
    );
    this.adminUser.next(adminUser);
  }
  bypassLoginAs(
    userType: "sadmin" | "nadmin" | "manager" | "padmin",
    email: string = "mock@local",
    displayName?: string,
  ) {
    const name =
      displayName !== undefined && displayName !== null
        ? displayName
        : userType === "nadmin"
          ? "Prasanthi"
          : userType === "padmin"
            ? "John"
            : "Ram";
    const payload = {
      admin_id: 0,
      display_name: name,
      user_type: userType,
      email,
    };
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const user = new AdminUser(
      payload,
      "mock-token",
      "mock-refresh",
      expirationDate,
    );
    this.adminUser.next(user);
    localStorage.setItem(this.globals.strUserData, JSON.stringify(user));
  }
}
