import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserLoginResponse {
    name: string;
    message: string;
    status: number;
    payload?: any;
}

@Injectable()
export class UserLoginService {

    constructor(
        private http: HttpClient
    ) { }

    getSocialResponse(uid: string) {
        return this.http.get<UserLoginResponse>('api/v2/admin/web/acountdelete/user?uid=' + uid);
    }
}
