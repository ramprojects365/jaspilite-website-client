import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ManagerDashboardResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class ManagerDashboardService {

    constructor(
        private http: HttpClient
    ) {
    }

    getMyBranch(adminId) {
        return this.http.get<ManagerDashboardResponse>('api/v2/admin/web/branches/mybranch/' + adminId);
    }

    getShopCount(adminId) {
        return this.http.get<ManagerDashboardResponse>('api/v2/admin/web/shops/count?user_id=' + adminId);
    }

    getBranchCount(adminId) {
        return this.http.get<ManagerDashboardResponse>('api/v2/admin/web/branches/count?user_id=' + adminId);
    }

    getOrderCount(adminId, branchId) {
        return this.http.get<ManagerDashboardResponse>('api/v2/admin/web/sales/count?user_id=' + adminId + '&branch_id=' + branchId);
    }

    getOrderAmounts(adminId, branchId) {
        return this.http.get<ManagerDashboardResponse>('api/v2/admin/web/sales/total?user_id=' + adminId + '&branch_id=' + branchId);
    }

}
