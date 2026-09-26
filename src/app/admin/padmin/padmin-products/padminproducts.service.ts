import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminProductsResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}
@Injectable()
export class PAdminProductsService {
    constructor(
        private http: HttpClient
    ) {
    }
    getAllProducts() {
        return this.http.get<AdminProductsResponse>('api/v2/admin/web/products');
    }
    uploadImage(file: File) {
        const inputForm = new FormData();
        inputForm.append('file', file);
        return this.http.post<AdminProductsResponse>('api/v2/admin/web/upload/image',
            inputForm);
    }
    addProduct(product) {
        return this.http.post<AdminProductsResponse>('api/v2/admin/web/products',
            {
                category_id: product.category_id, company: product.company,
                description: product.description, name: product.name, image: product.image,
                sku: product.sku, weight: product.weight,
            });
    }
    updateProduct(product, productId) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminProductsResponse>('api/v2/admin/web/products/' + productId,
            {
                category_id: product.category_id,
                company: product.company,
                description: product.description,
                name: product.name,
                image: product.image,
                image_changed: product.imageChanged,
                sku: product.sku,
                weight: product.weight,
            });
    }
    getAllCategories() {
        return this.http.get<AdminProductsResponse>('api/v2/admin/web/categories');
    }
}
