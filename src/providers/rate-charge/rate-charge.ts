import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../shared/ApiURL";

/*
  Generated class for the RateChargeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RateChargeProvider {

  apiUrl;
  chargeRates;
  userId: string;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }

  constructor(public http: HttpClient, private api:ApiURL) {
    console.log('Hello RateChargeProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  getRateChargesOfOneCustomer(custId):Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/ChargeRates/" + custId, this.httpOptions).subscribe(incomingChargeRate => {
        this.chargeRates = incomingChargeRate;
        resolve(this.chargeRates);
      });
    });
  }

  editChargeRates(chargeRate):Promise<any> {
    console.log(chargeRate);
    return new Promise(resolve => {
      this.http.patch(this.apiUrl+"/ChargeRates/PatchEditCustomerChargeRates", chargeRate, this.httpOptions).subscribe(response => {
        resolve(response);
      })
    })
  }

  deleteChargeRate(chargeRateId): Promise<any> {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+"/ChargeRates/" + chargeRateId, this.httpOptions).subscribe(response => {
        console.log(response);
        resolve(response);
      });
    });
  }

  postCreateChargeRate(chargeRate):Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/ChargeRates/"+this.userId, chargeRate, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getChargeRateOfCustomerIdPalletId(customerId, palletProfileId): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/ChargeRates/GetChargeRateOfCustomerIdPalletId/"+customerId+"/"+palletProfileId, this.httpOptions)
        .subscribe(response=>{
        resolve(response);
      }, error2 => {
          console.log(error2);
        });
    });
  }

  getAllChargeRatesOfCustomerPaginated(customerId, pageNo, pageSize): Promise<any> {
    return new Promise<any> (resolve =>{
      this.http.get(this.apiUrl+"/ChargeRates/GetAllChargeRatesByCustomerIdPaginated/"
                      +customerId+"/"+pageNo+"/"+pageSize, this.httpOptions).subscribe(response =>{
                    resolve(response);
      }, error2=> {
                    console.log(error2);
      });
    });
  }


}
