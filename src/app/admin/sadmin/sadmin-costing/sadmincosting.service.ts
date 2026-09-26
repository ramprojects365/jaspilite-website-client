import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminSalesResponse {
  name: string;
  message: string;
  status: number;
  payload?: any;
}

@Injectable()
export class SadmincostingService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsersShops() {
    return this.http.get<AdminSalesResponse>('api/v2/admin/web/shops?user_id=');
  }

  getAllUsersBranches(shopId) {
    return this.http.get<AdminSalesResponse>('api/v2/admin/web/branches?shop_id=' + shopId);
  }
  getSales(branchId, from, to) {
    //console.log('testing');
    return this.http.get<AdminSalesResponse>('api/v2/admin/web/sales?branch_id='+branchId+'&status=billing&from='+from+'&to='+to);
  }
  
}
