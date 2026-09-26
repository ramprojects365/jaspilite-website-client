import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface ResponseData {
    status: number;
    name: string;
    message: string;
    payload?: any;
}

@Injectable()
export class SadminBoxService {

    shopsCount: number;
    branchesCount: number;
    totalSales: number;
    totalOrders: number;

    constructor(
        private http: HttpClient,
    ) {
    }

    getShopsCount() {
        return this.http.get<ResponseData>('api/v2/admin/web/shops/count')
            .pipe(tap(resData => {
                this.shopsCount = resData.payload.shops_count;
            }));
    }

    getBranchesCount() {
        return this.http.get<ResponseData>('api/v2/admin/web/branches/count')
            .pipe(tap(resData => {
                this.branchesCount = resData.payload.branch_count;
            }));
    }
    getSalesTotal(){
        return this.http.get<ResponseData>('api/v2/admin/web/sales/total')
        .pipe(tap(resData => {
            this.totalSales = resData.payload.received_amount;
        }));
    }
    getOrdersTotal(){
        return this.http.get<ResponseData>('api/v2/admin/web/sales/count')
        .pipe(tap(resData => {
            this.totalOrders = resData.payload.orders_count;
        }));
    }
}
