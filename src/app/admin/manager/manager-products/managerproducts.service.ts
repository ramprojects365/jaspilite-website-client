import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminProductsResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class ManagerProductsService {

    constructor(
        private http: HttpClient
    ) {
    }

    getAllUsersShops(adminId) {
        return this.http.get<AdminProductsResponse>('api/v2/admin/web/shops?user_id=' + adminId);
    }

    getAllUsersBranches(shopId) {
        return this.http.get<AdminProductsResponse>('api/v2/admin/web/branches?shop_id=' + shopId);
    }

    getAllProducts() {
        return this.http.get<AdminProductsResponse>('api/v2/admin/web/products');
    }

    getAllShopItems(branchId: string) {
        return this.http.get<AdminProductsResponse>('api/v2/admin/web/shopitems?branch_id=' + branchId);
    }

    addShopItem(product, branchesToAdd) {
        return this.http.post<AdminProductsResponse>('api/v2/admin/web/shopitems',
            {
                branch_ids: branchesToAdd, product_id: product.product
                , item_price: product.price, item_discount: 0
                , articleNumber: product.articleNumber
            });
    }

    updateShopItem(product, branchesToAdd) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminProductsResponse>('api/v2/admin/web/shopitems/' + product.item_id,
            {
                branch_ids: branchesToAdd, product_id: product.product_id, item_price: product.item_price, item_discount: product.item_discount,
                item_qr_code: product.item_qr_code, item_quantity: product.item_quantity, articleNumber: product.articleNumber
            });
    }

    updateShopItemAvailability(product, userBranch, value) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminProductsResponse>('api/v2/admin/web/shopitems/' + product.item_id,
            { branch_ids: userBranch, product_id: product.product_id, availability: value });
    }

    updateShopItemHidded(product, userBranch, value) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminProductsResponse>('api/v2/admin/web/shopitems/' + product.item_id,
            { branch_ids: userBranch, product_id: product.product_id, hidden: value });
    }

    getMyBranch(adminId) {
        return this.http.get<AdminProductsResponse>('api/v2/admin/web/branches/mybranch/' + adminId);
    }

}
