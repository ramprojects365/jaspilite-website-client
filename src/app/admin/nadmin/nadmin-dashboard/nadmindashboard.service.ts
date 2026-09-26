import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface NAdminDashboardResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class NadminDashboardService {

    constructor(
        private http: HttpClient
    ) {
    }

    getShopCount(adminId) {
        return this.http.get<NAdminDashboardResponse>('api/v2/admin/web/shops/count?user_id=' + adminId);
    }

    getBranchCount(adminId) {
        return this.http.get<NAdminDashboardResponse>('api/v2/admin/web/branches/count?user_id=' + adminId);
    }

    getOrderCount(adminId) {
        return this.http.get<NAdminDashboardResponse>('api/v2/admin/web/sales/count?user_id=' + adminId);
    }

    getOrderAmounts(adminId) {
        return this.http.get<NAdminDashboardResponse>('api/v2/admin/web/sales/total?user_id=' + adminId);
    }

}
