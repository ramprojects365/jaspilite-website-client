import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminVoucherResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class NadminVoucherService {

    sale: any;

    constructor(
        private http: HttpClient
    ) {}


    getAllUsersShops(adminId) {
        return this.http.get<AdminVoucherResponse>('api/v2/admin/web/shops?user_id=' + adminId);
    }

    getAllUsersBranches(shopId) {
        return this.http.get<AdminVoucherResponse>('api/v2/admin/web/branches?shop_id=' + shopId);
    }
    addVoucher(voucher) {
        return this.http.post<AdminVoucherResponse>('api/v1/vouchers',
            {
                voucher: voucher
            });
    }
    getVouchers(branch_id) {
        return this.http.get<AdminVoucherResponse>('api/v1/vouchers?branch_id=' + branch_id);
    }
    
    uploadImage(file: File) {
        const inputForm = new FormData();
        inputForm.append('file', file);
        return this.http.post<AdminVoucherResponse>('api/v2/admin/web/upload/image',
            inputForm);
    }

   

 









}
