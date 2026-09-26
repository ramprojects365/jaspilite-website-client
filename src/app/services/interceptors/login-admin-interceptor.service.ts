import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AdminLoginService } from '../admin/admin-login/adminlogin.service';
import { take, exhaustMap, catchError, switchMap, switchMapTo, filter } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginAdminInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private adminLoginService: AdminLoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.adminLoginService.adminUser.pipe(take(1), exhaustMap(adminUser => {
            if (!adminUser) {
                return next.handle(req);
            }
            const modifiedReq = this.addToken(req, adminUser.getToken);
            // const modifiedReq = req.clone({
            //     setHeaders: {
            //         Authorization: 'Bearer ' + adminUser.getToken
            //     }
            // });
            return next.handle(modifiedReq)
                .pipe(catchError(error => {
                    if (error instanceof HttpErrorResponse && error.status === 401) {
                        return this.handle401Error(req, next);
                    } else {
                        return throwError(error);
                    }
                }));
        }));
    }

    private addToken(req: HttpRequest<any>, token: string) {
        return req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        // console.log('401 handler -----------------------------');
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.adminLoginService.adminRefreshToken().pipe(
                switchMap((resData: any) => {
                    // console.log('TOKEN ------ ' + JSON.stringify(resData.payload.token));
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(resData.payload.token);
                    return next.handle(this.addToken(req, resData.payload.token));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                // filter(resData => resData.payload.token != null),
                take(1),
                switchMap((jwt: any) => {
                    // console.log('TOKEN 2 ' + JSON.stringify(jwt));
                    return next.handle(req);
                })
            );
        }
        // return next.handle(req);
    }
}

