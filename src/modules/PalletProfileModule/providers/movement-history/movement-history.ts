import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../../../shared/ApiURL";

/*
  Generated class for the MovementHistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovementHistoryProvider {

  apiUrl;
  userId:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }

  constructor(public http: HttpClient, private api: ApiURL) {
    console.log('Hello MovementHistoryProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  getAllMovementHistoryOfPalletProfilePaginatedOrdered(palletProfileId:number, pageNo:number, pageSize:number,
                                                       colName:string, ascending:boolean, searchTerms?:string):Promise<any> {

    if(searchTerms==null || searchTerms==undefined) {
      return new Promise<any> (resolve => {
        this.http.get(this.apiUrl+"/MovementHistories/GetAllMovementHistoriesForPalletProfilePaginatedOrdered/"
          +palletProfileId+"/"+pageNo+"/"+pageSize+"/"+colName+"/"+ascending, this.httpOptions).subscribe(response => {
            resolve(response);
        },error2 =>  {
            console.log(error2);
        });
      });
    } else {
      return new Promise<any> (resolve => {
        this.http.get(this.apiUrl+"/MovementHistories/GetAllMovementHistoriesForPalletProfilePaginatedOrdered/"
          +palletProfileId+"/"+pageNo+"/"+pageSize+"/"+colName+"/"+ascending+"/"+searchTerms, this.httpOptions).subscribe(response => {
            resolve(response);
        }, error2 => {
            console.log(error2);
        });
      });
    }

  }

  postReplenishPallet(palletProfileFormData): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.post(this.apiUrl+"/MovementHistories",palletProfileFormData, this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

}
