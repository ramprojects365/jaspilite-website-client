import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ShopsDataResponse {
  name: string;
  message: string;
  status: number;
  payload?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SadminshopsService {
  shop: any;
  constructor(
    private http: HttpClient
  ) { }
  set ShopDetails(shop) {
    this.shop = shop;
  }
  get ShopDetails() {
    return this.shop;
  }
  getAllShopsData() {
    return this.http.get<ShopsDataResponse>('api/v2/admin/web/shopsandbranches');
  }
  getDeliveryServices(currency){
    return this.http.get<ShopsDataResponse>('api/v2/admin/web/shop/deliveryvendors/list?country='+currency);
  }
  getPaymentServices(){
    return this.http.get<ShopsDataResponse>('api/v2/admin/web/shop/paymentgateways/list');
  }
  getDeliveryVendors(branchId){
    return this.http.get<ShopsDataResponse>('api/v2/admin/web/shop/deliveryvendors/'+branchId);
  }
  getPaymentVendors(branchId){
    return this.http.get<ShopsDataResponse>('api/v2/admin/web/shop/paymentgateways/'+branchId);
  }
  addDeliveryServices(vendorId, branchId){
    return this.http.post<ShopsDataResponse>('api/v2/admin/web/shop/deliveryvendors',{
      vendor_id: vendorId,
      branch_id: branchId,
    }
    );
  }
  addPaymentServices(vendorId, branchId){
    return this.http.post<ShopsDataResponse>('api/v2/admin/web/shop/paymentgateways',{
      payment_gateway_id: vendorId,
      branch_id: branchId,
    }
    );
  }
  removeDeliveryServices(vendorId, branchId){
    return this.http.post<ShopsDataResponse>('api/v2/admin/web/shop/deliveryvendors/disable',{
      vendor_id: vendorId,
      branch_id: branchId,
    }
    );
  }
  removePaymentServices(vendorId, branchId){
    return this.http.post<ShopsDataResponse>('api/v2/admin/web/shop/paymentgateways/disable',{
      payment_gateway_id: vendorId,
      branch_id: branchId,
    }
    );
  }
  updateBranchStatus(branch_id, status) {
    // tslint:disable-next-line: object-literal-shorthand - by Sunoj
    return this.http.patch<ShopsDataResponse>('api/v2/admin/web/branches/status/' + branch_id,
        {
            status: status
        });
}
  
}

