import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PublicResponse {
  name: string;
  message: string;
  status: number;
  payload?: any;
}

@Injectable()
export class PublicService {

  constructor(
    private http: HttpClient
  ) { }
  contactUs(value) {
    return this.http.post<PublicResponse>('api/v2/user/web/contactus',
      {
        subject: 'Minimart Customer Feedback', name: value.name
        , number: value.mobilenumber, email: value.email
        , message: value.message
      });
  }
}
