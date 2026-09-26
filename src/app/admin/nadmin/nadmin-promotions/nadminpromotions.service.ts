import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminSalesResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class NadminPromotionsService {

    promo: any;

    constructor(
        private http: HttpClient
    ) {
    }
    set PromoId(promo) {
        this.promo = promo;
    }
    get PromoId() {
        return this.promo;
    }
    getAllUsersShops(adminId) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/shops?user_id=' + adminId);
    }

    getAllUsersBranches(shopId) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/branches?shop_id=' + shopId);
    }
    getAllPromotions(branchId) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/promotions?branch_id=' + branchId);
    }
    uploadImage(file: File) {
        const inputForm = new FormData();
        inputForm.append('file', file);
        return this.http.post<AdminSalesResponse>('api/v2/admin/web/upload/image',
            inputForm);
    }

    addShopPromotion(promo) {
        return this.http.post<AdminSalesResponse>('api/v2/admin/web/promotions',
            {
                branch_id: promo.branch_id,
                picture: promo.picture,
                title: promo.title,
                description: promo.description,
                start_date: promo.start_date,
                end_date: promo.end_date,
                discount: promo.discount,
                created_date: promo.created_date,
                status: 1,
            });
    }
    addPromoProduct(promo) {
        return this.http.post<AdminSalesResponse>('api/v2/admin/web/promotions/item/'+ promo.promoId,
            {
                product_id: promo.product_id,
                percentage: promo.percentage,
            });
    }
   getPromoItems(promoId: string){
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/promotions/item?promo_id=' + promoId);
    }
    removePromoItem(promoItemId) {
        return this.http.delete<AdminSalesResponse>('api/v2/admin/web/promotions/item/remove/' + promoItemId);
    }
    getAllShopItems(branchId: string) {
        return this.http.get<AdminSalesResponse>('api/v2/admin/web/shopitems?branch_id=' + branchId);
    }
    cancelPromotion(promoId) {
        return this.http.delete<AdminSalesResponse>('api/v2/admin/web/promotions/' + promoId);
    }
    editPromotion(promo, promoId) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminSalesResponse>('api/v2/admin/web/promotions/' + promoId,
            {
                title: promo.title,
                description: promo.description,
                start_date: promo.start_date,
                end_date: promo.end_date,
                discount: promo.discount,
                branch_id: promo.branch_id,
                picture: promo.picture,
                status: 1,
            });
    }



}
