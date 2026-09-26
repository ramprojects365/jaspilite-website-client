import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminSalesResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class ManagerSalesService {

    sale: any;

    constructor(
        private http: HttpClient
    ) {
    }

    set SalesId(sale) {
        this.sale = sale;
    }

    get SalesId() {
        return this.sale;
    }

    getAllUsersShops(adminId) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/shops?user_id=' + adminId);
    }

    getAllUsersBranches(shopId) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/branches?shop_id=' + shopId);
    }

    getAllSales(branchId: string) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/sales?branch_id=' + branchId);
    }

    getAddress(addressId: string) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/address?address_id=' + addressId);
    }

    getSaleDetails(salesId: string) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/sales/' + salesId);
    }

    getAllShopItems(branchId: string) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/shopitems?branch_id=' + branchId);
    }

    addSaleItem(salesId, saleItem) {
        return this.http.post<AdminSalesResponse>('api/v2/admin/web/sales/' + salesId,
            {
                product_id: saleItem.product, item_id: saleItem.item_id
                , quantity: saleItem.quantity, item_price: saleItem.item_price
                , discount: saleItem.discount
            });
    }

    updateSalesItem(item, total, sales_id) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminSalesResponse>('api/v2/admin/web/sales/item/' + item.sales_details_id,
            {
                quantity: item.quantity, total: total, sales_id: sales_id
            });
    }

    deleteSalesItem(sales_details_id, total, sales_id) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.delete<AdminSalesResponse>('api/v2/admin/web/sales/item/' + sales_details_id + '/' + total + '/' + sales_id
        );
    }

    getMyBranch(adminId) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/branches/mybranch/' + adminId);
    }

}
