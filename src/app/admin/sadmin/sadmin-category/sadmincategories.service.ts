import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AdminCategoryResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}
@Injectable()
export class SadminCategoriesService {

    constructor(
        private http: HttpClient
    ) {
    }
    getAllCategories() {
        return this.http.get<AdminCategoryResponse>('api/v2/admin/web/categories');
    }
    addCatogory(category) {
        return this.http.post<AdminCategoryResponse>('api/v2/admin/web/categories',
            { category_name: category.name });
    }
    updateCategory(category) {
        // tslint:disable-next-line: object-literal-shorthand - by Sunoj
        return this.http.patch<AdminCategoryResponse>('api/v2/admin/web/categories/' + category.category_id,
            { category_name: category.category_name, category_icon: category.category_icon });
    }
}
