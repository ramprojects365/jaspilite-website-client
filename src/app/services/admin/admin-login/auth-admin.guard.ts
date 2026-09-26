import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AdminLoginService } from './adminlogin.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {

    constructor(
        private adminLoginService: AdminLoginService,
        private router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.adminLoginService.adminUser
            .pipe(
                take(1),
                map(adminUser => {
                    const isAuth = !!adminUser;
                    if (isAuth) {
                        return true;
                    }
                    return this.router.createUrlTree(['/admin']);
                }));

    }
}
