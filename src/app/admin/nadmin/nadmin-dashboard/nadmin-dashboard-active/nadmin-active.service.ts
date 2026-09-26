import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ResponseData {
    status: number;
    name: string;
    message: string;
    payload?: any;
}

@Injectable()
export class NadminActiveService {
    sale: any;
    constructor(
        private http: HttpClient,
    ) {
    }
    set SalesId(sale) {
        this.sale = sale;
    }

    get SalesId() {
        return this.sale;
    }
    getAddress(addressId: string) {
        return this.http.get<ResponseData>('api/v2/admin/web/address?address_id=' + addressId);
    }
    getSaleDetails(salesId: string) {
        return this.http.get<ResponseData>('api/v2/admin/web/sales/' + salesId);
    }
    getActiveOrders(adminId) {
        return this.http.get<ResponseData>('api/v2/admin/web/sales?admin_id=' + adminId );
    }
    // getMyBranch(adminId) {
    //     return this.http.get<ResponseData>('api/v2/admin/web/branches/mybranch/' + adminId);
    // }
}
