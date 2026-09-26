import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminSettingsResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class NadminSettingsService {

    constructor(
        private http: HttpClient
    ) {
    }

    getAllUsersShops(adminId) {
        return this.http.get<AdminSettingsResponse>('api/v2/admin/web/shops?user_id=' + adminId);
    }
    getShopCategories() {
        return this.http.get<AdminSettingsResponse>('api/v2/admin/web/branches/categories');
    }

    getShopById(shopId) {
        return this.http.get<AdminSettingsResponse>('api/v2/admin/web/shops?shop_id=' + shopId);
    }

    getAllUsersBranches(shopId) {
        return this.http.get<AdminSettingsResponse>('api/v2/admin/web/branches?shop_id=' + shopId);
    }

    addShop(shop) {
        return this.http.post<AdminSettingsResponse>('api/v2/admin/web/shops',
            {
                user_id: shop.user_id, shop_name: shop.name, shop_addr: shop.address
            });
    }

    updateShop(shop) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminSettingsResponse>('api/v2/admin/web/shops/' + shop.shop_id,
            { shop_name: shop.name, shop_addr: shop.address });
    }

    uploadImage(file: File) {
        const inputForm = new FormData();
        inputForm.append('file', file);
        return this.http.post<AdminSettingsResponse>('api/v2/admin/web/upload/image',
            inputForm);
    }

    getBranchDetails(branchId) {
        return this.http.get<AdminSettingsResponse>('api/v2/admin/web/branches/' + branchId);
    }

    addBranch(branch) {       
        return this.http.post<AdminSettingsResponse>('api/v2/admin/web/branches',
            {
                shop_id: branch.userShop,
                branch_cat_id: branch.shopCategory,
                branch_name: branch.name,
                phone_no: branch.countryCode + branch.phone,
                branch_addr: branch.address,
                landmark: branch.landmark,
                image: branch.image,
                currency: branch.currency,
                maximum_distance: branch.maxdistance,
                minimum_sale: branch.minamount,
                open_time: new Date(branch.openingtime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }),
                close_time: new Date(branch.closingtime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }),
                isAdminDelivery: branch.isAdminDelivery,
                isPosEnabled: branch.isPosEnabled,
                track_stock: branch.track_stock,
                latitude: branch.latitude,
                longitude: branch.longitude,
                home_screen_theme: branch.themes,
                welcomeMessage: branch.welcomeMessage,
                rad_three_rate: branch.delchargless3,
                rad_five_rate: branch.delchargless5,
                rad_ten_rate: branch.delchargless10,
                rad_fifteen_rate: branch.delchargless15,
                rad_twenty_rate: branch.delchargless20 
            });
    }

    updateBranch(branch) {
        console.log("Branch update details "+JSON.stringify(branch));
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminSettingsResponse>('api/v2/admin/web/branches/' + branch.branch_id,
            {
                shop_id: branch.userShop,
                branch_cat_id: branch.shopCategory,
                branch_name: branch.name,
                phone_no: branch.phone,
                branch_addr: branch.address,
                landmark: branch.landmark,
                image_changed: branch.imageChanged,
                image: branch.image,
                currency: branch.selectedCurrency,
                maximum_distance: branch.maxdistance,
                minimum_sale: branch.minamount,
                open_time: new Date(branch.openingtime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }),
                close_time: new Date(branch.closingtime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }),
                isAdminDelivery: branch.isAdminDelivery,
                isPosEnabled: branch.isPosEnabled,
                track_stock: branch.track_stock,
                latitude: branch.latitude,
                longitude: branch.longitude,
                home_screen_theme: branch.themes,
                rad_three_rate: branch.delchargless3,
                rad_five_rate: branch.delchargless5,
                rad_ten_rate: branch.delchargless10,
                rad_fifteen_rate: branch.delchargless15,
                rad_twenty_rate: branch.delchargless20,
                welcomeMessage: branch.welcomeMessage
            });
    }

    updateBranchStatus(branch_id, status) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminSettingsResponse>('api/v2/admin/web/branches/status/' + branch_id,
            {
                status: status
            });
    }

}
