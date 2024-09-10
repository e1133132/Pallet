import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../shared/ApiURL";

/*
  Generated class for the RentalStatusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RentalStatusProvider {

  apiUrl;

  customerRentalStatus;

  userId: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }

  constructor(public http: HttpClient, private api:ApiURL) {
    console.log('Hello RentalStatusProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');

  }

  getRentalStatusByCustomerId(custId): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl+"/RentalStatus/"+custId, this.httpOptions).subscribe(data => {
        this.customerRentalStatus = data;
        resolve(this.customerRentalStatus);
      });
    });
  }

  getRentalStatusByCustomerIdWithPagination(custId, currentPage, rowsPerPage) {
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl+"/RentalStatus/getRentalStatusOfOneCustomerByPagination/"+custId+"/"+currentPage+"/"+rowsPerPage, this.httpOptions)
        .subscribe (response => {
       resolve(response);
      });
    });
  }


}
