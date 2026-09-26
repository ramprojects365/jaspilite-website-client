import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminUserResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class SadminUsersService {

    constructor(
        private http: HttpClient
    ) {
    }

    getAllAdminUsers() {
        return this.http.get<AdminUserResponse>('api/v2/admin/web/user');
    }

    addAdminUser(user) {
        return this.http.post<AdminUserResponse>('api/v2/admin/web/user',
            { user_type: user.userType, displayName: user.name, email: user.email, password: user.passwd });
    }

    updateAdminUser(user) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminUserResponse>('api/v2/admin/web/user/' + user.admin_id,
            { display_name: user.display_name, status: user.status, user_type: user.user_type, password: user.password });
    }

}
