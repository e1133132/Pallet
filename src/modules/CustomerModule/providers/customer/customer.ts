import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { HttpHeaders } from "@angular/common/http";
import {ApiURL} from "../../../../shared/ApiURL";

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {

  customers: any;
  oneCustomer: any;
  apiUrl;
  userId: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }

  constructor(public http: HttpClient, private api:ApiURL) {
    console.log('Hello CustomerProvider Provider');

    this.apiUrl=this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }


 getAllCustomers(): Promise<any> {

   return new Promise(resolve => {
     this.http.get(this.apiUrl+"/Customers", this.httpOptions).subscribe(data => {
       this.customers = data;
       resolve(this.customers);
     });
   });
 }


  postCreateNewCustomer(customer): Promise<any> {

   return new Promise(res => {

     this.http.post(this.apiUrl+"/Customers/"+this.userId, customer, this.httpOptions).subscribe((data)=>{   //userId is for the creator in database
       console.log(data);
        }, error2 => {
       console.log(error2)
        });
      });
   }

  getOneCustomer(custId): Promise<any> {
    return new Promise(result => {
      this.http.get(this.apiUrl+"/Customers/?id="+custId, this.httpOptions).subscribe(oneCustomer => {
        this.oneCustomer = oneCustomer;
        result(this.oneCustomer);
      });
    });
  }


  editCustomer(cus): Promise<any> {
      return new Promise(result => {
        this.http.patch(this.apiUrl+"/Customers/PatchEditCustomer", cus, this.httpOptions).subscribe(response => {
          console.log(response);
          result(response);
        });
      });
  }

  deleteCustomer(custId): Promise<any> {
    return new Promise (result=> {
      this.http.delete(this.apiUrl+"/Customers/"+custId, this.httpOptions).subscribe(response => {
        console.log(response);
        result(response);
      });
    });
  }

  getTotalHiredQtyofCustomersByDate(year:number, month:number): Promise<any> {

      return new Promise(resolve => {
        this.http.get(this.apiUrl+"/Customers/GetTotalHiredQtyofCustomers/"+year+"/"+month,{responseType: 'blob'}).subscribe(response => {
          console.log(response);
          resolve(response);
        });
      });
  }

  getCombinedIssueAndRetrieveNoteByCustomerByMth(custId, year, month, pageNo, pageSize): Promise<any> {

    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/Customers/GetCombIssOrdAndRetNotesByCustByMth/"+custId+"/"+year+"/"+month+"/"+pageNo+"/"+pageSize, this.httpOptions).subscribe(result => {
        console.log(result);
        resolve(result);
      });
    });
  }



  getallQtyofInvoiceFromRentalCharges(custId, year):Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/Customers/GetallQtyofInvoiceFromRentalCharges/"+custId+"/"+year,
        {responseType: 'arraybuffer'}).subscribe(response => {
        console.log(response);
        resolve(response);
      });
    });
  }

  // getallQtyofInvoiceFromRentalCharges(custId, year, pageNo, pageSize):Promise<any> {
  //   return new Promise(resolve => {
  //     this.http.get("../lht/Customers/GetallQtyofInvoiceFromRentalCharges/"+custId+"/"+year+"/"+pageNo+"/"+pageSize).subscribe(response => {
  //       console.log(response);
  //       resolve(response);
  //     });
  //   });
  // }

  getAllCustomersWithPagination(pageNo, pageSize, columnName:string, isDescending:boolean, searchTerms?:string):Promise<any> {

    if(searchTerms == null || searchTerms == undefined)
    {
      return new Promise (resolve => {
        this.http.get(this.apiUrl+"/Customers/GetAllCustomersWithPagination/" + pageNo + "/" + pageSize+"/"+columnName+
          "/"+isDescending, this.httpOptions).subscribe(response => {
          console.log(response);
          resolve(response);
        });
      });
    }
    else {
      return new Promise (resolve => {
        this.http.get(this.apiUrl+"/Customers/GetAllCustomersWithPagination/" + pageNo + "/" + pageSize+"/"+columnName+
          "/"+isDescending+"/"+searchTerms, this.httpOptions).subscribe(response => {
          console.log(response);
          resolve(response);
        });
      });
    }
  }

  getCustomerExcelList():Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl+"/Customers/GetCustomerExcelList",{responseType: 'arraybuffer'}).subscribe(response=> {
        if(response) {
          resolve(response);
        }
        else{
          console.log(response);
          resolve(response);
        }
      });
    });
  }

  getXLMonthlySummary(custId, year, month): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Customers/GetXLMthSummaryOfOneCustomer/"+custId+"/"+year+"/"+month,
        {responseType: 'arraybuffer'}).subscribe(response => {
          resolve(response);
      },error2 => {
          console.log(error2);
      });
    });
  }

  getXLStatementOfAccounts(): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Customers/GetStatementOfAccountsXL/",
        {responseType: 'arraybuffer'}).subscribe(response => {
          resolve(response);
      }, error2 => {
          console.log(error2);
      });
    });
  }



}
