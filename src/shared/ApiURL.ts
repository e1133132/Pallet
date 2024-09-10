import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class ApiURL {

  apiUrl:string = "../lht/";
  resetApi:string = "../lht/";
  apiURLSG: string = "../lht/api/SG";
  apiURLMY: string = "../lht/api/MY";

  // apiUrl:string = "../lht/";
  // apiURLSG: string = "../lht/SG";
  // apiURLMY: string = "../lht/MY";

  // apiUrl:string = "http://localhost/LHPWebApi/";
  // apiURLSG: string = "http://localhost/LHPWebApi/api/SG";
  // apiURLMY: string = "http://localhost/LHPWebApi/api/MY";

  // apiUrl:string = "http://10.218.68.119:802/api/api";
  // apiURLSG: string = "http://10.218.68.119:802/api/api/SG";
  // apiURLMY: string = "http://10.218.68.119:802/api/api/MY";

  // apiUrl:string = "http://10.218.68.119:802/api/api";
  // "proxyUrl": "http://localhost:1612/api"  localhost API, just keep here because ionic.config.json doesnt allow comments
  // "proxyUrl": "http://192.168.97.101:85/api"
  constructor() {
  }

  isSGDB: boolean;
  isDBChosen:boolean=false;
  bearerToken;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }

  getApiUrl() {
    return this.apiUrl;
  }

  setSGApiUrl(){
      this.apiUrl = this.apiURLSG;
      this.isSGDB=true;
      this.isDBChosen = true;
  }

  setMYApiUrl(){
    this.apiUrl = this.apiURLMY;
    this.isSGDB = false;
    this.isDBChosen = true;
  }

  getIsSGDb(): boolean {
    return this.isSGDB;
  }

  dbSelected(): boolean {
    return this.isDBChosen;
  }

  getHttpOptions() {
    return this.httpOptions;
  }

  //KIV check all providers
  updateBearerToken() {
    // this.bearerToken = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'))
    //                                     .set('content-Type', 'application/json');

    let accessToken = localStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      })
    };
  }

  resetBearerToken() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    };
    this.apiUrl = this.resetApi;
  }


}
