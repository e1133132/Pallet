import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiURL } from "../../shared/ApiURL";

/*
  Generated class for the AdvanceOrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdvanceOrderProvider {

  apiUrl;
  userId:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }
  constructor(public http: HttpClient,
              private api: ApiURL) {
    console.log('Hello AdvanceOrderProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  getListOfAONo(): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl+"/Advance_Order/GetListOfAONo", this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getAdvanceOrderForDailyInventoryStatus(palletProfileId: number, startyear: number, startmth: number,
                                         startday: number, endyear: number, endmth: number, endday: number) {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Advance_Order/GetAdvanceOrderForDailyInventoryStatus/"+palletProfileId+"/"+startyear+"/"+
        startmth+"/"+startday+"/"+endyear+"/"+endmth+"/"+endday, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2=> {
          console.log(error2);
      });
    });
  }


}
