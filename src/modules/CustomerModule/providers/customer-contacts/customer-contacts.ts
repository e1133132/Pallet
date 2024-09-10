import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../../../shared/ApiURL";

/*
  Generated class for the CustomerContactsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerContactsProvider {

  apiUrl;

  customerContact: any;
  userId: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }

  constructor(public http: HttpClient, private api:ApiURL) {

    console.log('Hello CustomerContactsProvider Provider');
    this.apiUrl= this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');

  }

  getCustomerContactsOfOneCustomer(custId): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/CustomerContacts/" + custId, this.httpOptions).subscribe(incomingCustomerContact => {
        this.customerContact = incomingCustomerContact;
        resolve(this.customerContact);
      });
    });
  }

  deleteCustomerContact(customerContactId): Promise<any> {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+"/CustomerContacts/" + customerContactId, this.httpOptions).subscribe(response => {
        console.log(response);
        resolve(response);
      });
    });
  }

  editCustomerContact(custCont) {
    console.log(custCont);
    return new Promise(resolve => {
      this.http.patch(this.apiUrl+"/CustomerContacts/PatchEditCustomerContact", custCont, this.httpOptions).subscribe(response => {
        resolve(response);
      });
    });
  }

  postCreateCustomerContact(custContact) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/CustomerContacts"+this.userId, custContact, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }
}


