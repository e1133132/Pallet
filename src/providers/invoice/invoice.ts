import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../shared/ApiURL";

/*
  Generated class for the InvoiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InvoiceProvider {

  apiUrl;

  invoice;

  userId:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }


  constructor(public http: HttpClient, private api:ApiURL) {
    console.log('Hello InvoiceProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  GetTopBalQtyInMthForOneCustomer(custId, mth, year): Promise<any> {
    return new Promise(result => {
      this.http.get(this.apiUrl+"/Invoices/GetTopBalQtyInMthForOneCustomer/"+custId+"/"+mth+"/"+year, this.httpOptions).subscribe(incomingInvoice => {
        this.invoice = incomingInvoice;
        result(this.invoice);
      });
    });
  }

  GetInvoicesOfOneCustomerByYear(custId, year):Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/Invoices/GetInvoiceOfOneCustomerByYear/"+custId+"/"+year, this.httpOptions).subscribe(incoming => {
          console.log(incoming);
          resolve(incoming);
      });
    });
  }

}
