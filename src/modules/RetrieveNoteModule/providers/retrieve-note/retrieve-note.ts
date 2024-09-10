import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../../../shared/ApiURL";

/*
  Generated class for the RetrieveNoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RetrieveNoteProvider {

  apiUrl;
  retrieveNotes;

  userId:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    })
  }

  constructor(public http: HttpClient, private api:ApiURL) {
    console.log('Hello RetrieveNoteProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  getRetrieveNotesofOneCustomer(custId): Promise<any> {
    return new Promise(result => {
      this.http.get(this.apiUrl+"/Retrieve_Note/"+custId, this.httpOptions).subscribe(incomingRetrieveNote => {
        this.retrieveNotes = incomingRetrieveNote;
        result(this.retrieveNotes);
      });
    });
  }

  getAllRetrieveNotesPaginatedOrdered(pageNo:number, pageSize:number, colName: string, ascending: boolean, searchTerms?:string):Promise<any>
  {
    if(searchTerms==null || searchTerms==undefined) {
      return new Promise<any> (resolve => {
        this.http.get(this.apiUrl+"/Retrieve_Note/GetAllRetrieveNotesPaginatedOrdered/"+pageNo+"/"+pageSize+"/"+colName+"/"+ascending, this.httpOptions)
          .subscribe(response=>{
            resolve(response);
          }, error2 => {
            console.log(error2);
          });
      });
    }
    else {
      return new Promise<any> (resolve => {
        this.http.get(this.apiUrl+"/Retrieve_Note/GetAllRetrieveNotesPaginatedOrdered/"+pageNo+"/"+pageSize+"/"+colName+"/"+ascending+"/"+searchTerms, this.httpOptions)
          .subscribe(response=>{
            resolve(response);
          }, error2 => {
            console.log(error2);
          });
      });
    }
  }

  getAllRetrieveNotes() {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Retrieve_Note/GetAllRetrieveNotes", this.httpOptions).subscribe(response =>{
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getLastRetrieveNoteNo():Promise<any> {
    return new Promise<any>(resolve=> {
      this.http.get(this.apiUrl+"/Retrieve_Note/GetLastRetrieveNoteNo", this.httpOptions).subscribe( response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getLastRetrieveNoteByCustomer(custId): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Retrieve_Note/GetLatestRetrieveNoteByCustomerId/"+custId, this.httpOptions).subscribe( response =>{
        resolve(response);
      },error2 => {
        console.log(error2);
      });
    });
  }

  postRetrieveNote(data):Promise<any> {
    return new Promise<any> (resolve => {
      this.http.post(this.apiUrl+"/Retrieve_Note/"+this.userId, data, this.httpOptions).subscribe(response =>{
       resolve(response);
      },error2 => {
        console.log(error2);
      });
    });
  }

  deleteRetrieveNote(retrieveNoteId): Promise<any> {
    return new Promise<any> (resolve=> {
      this.http.delete(this.apiUrl+"/Retrieve_Note/"+retrieveNoteId, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  patchEditRetrieveNote(formData): Promise<any> {
    return new Promise<any>(resolve =>{
      this.http.patch(this.apiUrl+"/Retrieve_Note/PatchEditRetrieveNote", formData
        , this.httpOptions).subscribe( response =>{
        resolve(response);
      }, error2 => {
          console.log(error2);
      });
    });
  }

  getXLOfRetrieveNote(retrieveNote) {
    return new Promise<any> (resolve => {
      this.http.post(this.apiUrl+"/Retrieve_Note/GetXLOfRetrieveNote",retrieveNote,{responseType: 'arraybuffer'}).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getPdfOfRetrieveNote(retrieveNote) {
    return new Promise<any> (resolve => {
      this.http.post(this.apiUrl+"/Retrieve_Note/GetPdfOfRetrieveNote",retrieveNote,{responseType: 'arraybuffer'}).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getXLOfTotalQtyReport(startyear, startmth, startday, endyear, endmth, endday) {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Retrieve_Note/GetSummaryReportOfRetrieveNotes/"+startyear+"/"+startmth+"/"
        +startday+"/"+endyear+"/"+endmth+"/"+endday, {responseType: 'arraybuffer'}).subscribe(response => {
          resolve(response);
      }, error2 => {
          console.log(error2);
      });
    });
  }

  acknowledgeRetrieveNote(retrieveNoteId, newQty):Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Retrieve_Note/AcknowledgeRetrieveNote/"+retrieveNoteId+"/"+newQty, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  undoAcknowledgeRetrieveNote(retrieveNoteId): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Retrieve_Note/UndoAcknowledgeRetrieveNote/"+retrieveNoteId, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getRetrieveNoteForDailyInventoryStatus(palletProfileId: number, year: number, mth: number, day: number) {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Retrieve_Note/GetRetrieveNoteForDailyInventoryStatus/"
        +palletProfileId+"/"+year+"/"+mth+"/"+day, this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

}
