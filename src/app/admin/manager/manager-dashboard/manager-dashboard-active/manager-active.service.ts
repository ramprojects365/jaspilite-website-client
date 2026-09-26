import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ResponseData {
    status: number;
    name: string;
    message: string;
    payload?: any;
}

@Injectable()
export class ManagerActiveService {

    constructor(
        private http: HttpClient,
    ) {
    }
    getActiveOrders(branchId) {
        return this.http.get<ResponseData>('api/v2/admin/web/sales?branch_id=' + branchId +'&status=active');
    }
    getMyBranch(adminId) {
        return this.http.get<ResponseData>('api/v2/admin/web/branches/mybranch/' + adminId);
    }
}
