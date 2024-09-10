import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../shared/ApiURL";

/*
  Generated class for the AdvanceProductionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdvanceProductionProvider {

  apiURL;
  httpOptions;

  constructor(public http: HttpClient,
              private api: ApiURL) {
    console.log('Hello AdvanceProductionProvider Provider');
    this.apiURL = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
  }

  getAdvProdBalQtyOfPalletProfile(palletProfileId):Promise<any> {

    return new Promise<any>(resolve=> {
      this.http.get(this.apiURL+"/Advance_Production/GetAdvProdBalQtyOfPalletProfile/"+palletProfileId, this.httpOptions).subscribe(response => {
        resolve(response);
      },error2 => {
        console.log(error2);
      });
    });
  }

}
