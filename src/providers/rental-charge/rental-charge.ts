import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../shared/ApiURL";

/*
  Generated class for the RentalChargeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RentalChargeProvider {

  apiUrl;

  userId:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }


  constructor(public http: HttpClient, private api:ApiURL) {
    console.log('Hello RentalChargeProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  getRentalChargesByCustomerIdByYear(custId, year):Promise<any> {
    return new Promise(resolve=> {
      this.http.get(this.apiUrl+"/RentalCharges/getRentalChargesByCustomerIdByYear/"+custId+"/"+year, this.httpOptions).subscribe(response =>{
        console.log(response);
        resolve(response);
      })
    });
  }



}
