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
export class SadminActiveService {

    shopsCount: number;
    branchesCount: number;

    constructor(
        private http: HttpClient,
    ) {
    }
    getActiveOrders() {
        return this.http.get<ResponseData>('api/v2/admin/web/sales?status=active');
    }
    cancelOrder(sales_id) {
        return this.http.delete<ResponseData>('api/v2/admin/web/sales/' + sales_id);
    }
    getStatus(sales_id){
        return this.http.get<ResponseData>('api/v2/admin/web/sales/status/' + sales_id);  
    }
    updateStatus(sales_id, status_id, status){
        return this.http.delete<ResponseData>('api/v2/admin/web/sales/status/' + sales_id + '/'+ status_id + '/' + status);  
    }
    addStatus(sales_id, status) {
        return this.http.patch<ResponseData>('api/v2/admin/web/sales/status/' + sales_id,
            { status: status });
    }
}
