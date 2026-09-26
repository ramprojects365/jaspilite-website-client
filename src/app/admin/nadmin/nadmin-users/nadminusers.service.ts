import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminUserResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class NadminUsersService {
    constructor(
        private http: HttpClient
    ) {
    }
    getAllUsersShops(adminId) {
        return this.http.get<AdminUserResponse>('api/v2/admin/web/shops?user_id=' + adminId);
    }
    getAllUsersBranches(shopId) {
        return this.http.get<AdminUserResponse>('api/v2/admin/web/branches?shop_id=' + shopId);
    }
    getAllAdminUsers(shopIds) {
        return this.http.get<AdminUserResponse>('api/v2/admin/web/user?shop_id=' + shopIds);
    }
    addAdminUser(user) {
        return this.http.post<AdminUserResponse>('api/v2/admin/web/user',
            {
                shop_id: user.userShop, branch_id: user.userBranch, user_type: user.userType,
                displayName: user.name, email: user.email, password: user.passwd
            });
    }
    updateAdminUser(user) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminUserResponse>('api/v2/admin/web/user/' + user.admin_id,
            { display_name: user.display_name, status: user.status, user_type: user.user_type, password: user.password });
    }
}
