import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../../../shared/ApiURL";

/*
  Generated class for the PalletProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PalletProfileProvider {

  //apiUrl:string = "../lht";
  apiUrl;


  palletProfile;
  allPalletProfiles;

  userId:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }


  constructor(public http: HttpClient, private api:ApiURL) {
    console.log('Hello PalletProfileProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  getOnePallet_Profile(palletProfileId): Promise<any> {
    return new Promise(result => {
      this.http.get(this.apiUrl+"/Pallet_Profile/"+palletProfileId, this.httpOptions).subscribe(onePalletProfile => {
        this.palletProfile = onePalletProfile;
        result(this.palletProfile);
      });
    });
  }

  getAllPalletProfiles(): Promise<any> {
    return new Promise(result => {
      this.http.get(this.apiUrl+"/Pallet_Profile/", this.httpOptions).subscribe(palletProfiles => {
        this.allPalletProfiles = palletProfiles;
        result(this.allPalletProfiles);
      });
    });
  }

  getAllPalletProfilesPaginatedOrderedSearched(pageNo, pageSize, colName, ascending, searchTerms?):Promise<any> {
    if(searchTerms==null || searchTerms == undefined) {
      return new Promise (resolve => {
        this.http.get(this.apiUrl+"/Pallet_Profile/GetAllPalletProfilesPaginatedOrdered/"+pageNo+"/"+pageSize+
          "/"+colName+"/"+ascending, this.httpOptions).subscribe( response =>{
          resolve(response);
        }, error2 => {
          console.log(error2);
        });
      });
    }
    else {
      return new Promise (resolve => {
        this.http.get(this.apiUrl+"/Pallet_Profile/GetAllPalletProfilesPaginatedOrdered/"+pageNo+"/"+pageSize+
          "/"+colName+"/"+ascending+"/"+searchTerms, this.httpOptions).subscribe( response =>{
          resolve(response);
        }, error2 => {
            console.log(error2);
        });
      });
    }

  }

  postCreatePalletProfile(data): Promise<any> {
    return new Promise<any> (resolve=> {
      this.http.post(this.apiUrl+"/Pallet_Profile/"+this.userId , data, this.httpOptions).subscribe(response =>{
        resolve(response);
      }, error2 =>{
        console.log(error2);
      });
    });
  }

  patchEditPalletProfile(data): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.patch(this.apiUrl+"/Pallet_Profile/PatchEditPalletProfile", data, this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  deletePalletProfile(palletProfileId): Promise<any> {
    return new Promise<any>(resolve=> {
      this.http.delete(this.apiUrl+"/Pallet_Profile/"+palletProfileId, this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  addToStock(palletProfileId, amountAdded): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.patch(this.apiUrl+"/Pallet_Profile/ReplenishStock/"+palletProfileId+"/"+
        amountAdded,{}, this.httpOptions).subscribe(response =>{
        resolve(response);
      }, error2 => {
          console.log(error2);
      });
    });
  }



}
