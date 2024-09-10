import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../../../shared/ApiURL";

/*
  Generated class for the HireOrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HireOrderProvider {

  hireOrders;
  apiUrl;
  userId:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }

  constructor(public http: HttpClient, private api:ApiURL) {
    console.log('Hello HireOrderProvider Provider');
    this.apiUrl= this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  getOneHireOrder(hireOrderId): Promise<any> {
    return new Promise(result => {
      this.http.get(this.apiUrl+"/Hire_Order/GetOneHireOrder/"+hireOrderId, this.httpOptions).subscribe(incominghireOrder => {
        result(incominghireOrder);
      });
    });
  }

  getAllHireOrders(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/Hire_Order", this.httpOptions).subscribe(incomingHireOrders => {
        this.hireOrders = incomingHireOrders;
        resolve(this.hireOrders);
      });
    });
  }

  postCreateHireOrder(hireOrder): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl+"/Hire_Order/"+this.userId, hireOrder, this.httpOptions).subscribe(data => {
        console.log(data);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  deleteHireOrder(hireOrderId): Promise<any> {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+"/Hire_Order/"+hireOrderId, this.httpOptions).subscribe( result => {
        console.log(result);
        resolve(result);
      });
    });
  }

  patchEditHireOrder(hireOrder): Promise<any> {
    return new Promise(resolve => {
      this.http.patch(this.apiUrl+"/Hire_Order/PatchEditHireOrder", hireOrder,this.httpOptions).subscribe( result=> {
        console.log(result);
        resolve(result);
      })
    })
  }

  GetLatestHireOrderOfCustomerId(custId): Promise<any> {
    return new Promise (resolve => {
      this.http.get(this.apiUrl+"/Hire_Order/GetLatestHireOrderOfCustomerId/"+custId, this.httpOptions).subscribe(result => {
        console.log(result);
        resolve(result);
      })
    })
  }

  getAllHireOrdersWithPaginationOrderable(pageNo, pageSize, colName, ascending, searchTerms?:string): Promise<any> {
    if(searchTerms==null || searchTerms == undefined) {
      return new Promise (resolve => {
        this.http.get(this.apiUrl+"/Hire_Order/GetAllHireOrdersWithPaginationOrderable/"
          +pageNo+"/"+pageSize+"/"+colName+"/"+ascending, this.httpOptions).subscribe( response =>{
          resolve(response);
        }, error2 => {
          console.log(error2);
        });
      });
    }
    else {
      return new Promise (resolve => {
        this.http.get(this.apiUrl+"/Hire_Order/GetAllHireOrdersWithPaginationOrderable/"
          +pageNo+"/"+pageSize+"/"+colName+"/"+ascending+"/"+searchTerms, this.httpOptions).subscribe( response =>{
          resolve(response);
        }, error2 => {
          console.log(error2);
        });
      });
    }


  }

  GetAllHireOrdersDTO():Promise<any>{
    return new Promise (resolve => {
      this.http.get(this.apiUrl+"/Hire_Order/GetAllHireOrdersDTO", this.httpOptions).subscribe( response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getLastHOOrderNo(): Promise<any> {
    return new Promise (resolve => {
      this.http.get(this.apiUrl+"/Hire_Order/GetLastHONo", this.httpOptions).subscribe( response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getNewHireOrders(): Promise<any> {
    return new Promise (resolve => {
      this.http.get(this.apiUrl+"/Hire_Order/GetNewHOs", this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2=> {
        console.log(error2);
      });
    });
  }

  getReleasedHireOrders(): Promise<any> {
    return new Promise (resolve => {
      this.http.get(this.apiUrl+"/Hire_Order/GetReleasedHOs", this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2=> {
        console.log(error2);
      });
    });
  }

  getReleasedAndPartiallyCompleteHireOrders(): Promise<any> {
    return new Promise (resolve => {
      this.http.get(this.apiUrl+"/Hire_Order/GetReleasedAndPartiallyCompleteHOs", this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2=> {
        console.log(error2);
      });
    });
  }

  markHireOrderAsComplete(hireOrderId):Promise<any> {
    return new Promise<any> (resolve => {
      this.http.patch(this.apiUrl+"/Hire_Order/MarkHireOrderAsComplete/"+hireOrderId  , hireOrderId, this.httpOptions).subscribe(response=>{
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  markHireOrderAsNew(hireOrderId):Promise<any> {
    return new Promise<any> (resolve => {
      this.http.patch(this.apiUrl+"/Hire_Order/MarkHireOrderAsNew/"+hireOrderId  , hireOrderId, this.httpOptions).subscribe(response=>{
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  markHireOrderAsPartiallyComplete(hireOrderId):Promise<any> {
    return new Promise<any> (resolve => {
      this.http.patch(this.apiUrl+"/Hire_Order/MarkHireOrderAsPartiallyComplete/"+hireOrderId  , hireOrderId, this.httpOptions).subscribe(response=>{
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  markHireOrderAsReleased(hireOrderId):Promise<any> {
    return new Promise<any> (resolve => {
      this.http.patch(this.apiUrl+"/Hire_Order/MarkHireOrderAsReleased/"+hireOrderId, hireOrderId,this.httpOptions).subscribe(response=>{
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }


}
