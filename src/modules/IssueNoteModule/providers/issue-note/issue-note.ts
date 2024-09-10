import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiURL} from "../../../../shared/ApiURL";

/*
  Generated class for the IssueNoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IssueNoteProvider {

  //apiUrl:string = "../lht";
  apiUrl;

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json; charset=UTF-8',
  //   })
  // }
  httpOptions;
  userId:string;
  issueNotes;

  constructor(public http: HttpClient, private api: ApiURL) {
    console.log('Hello IssueNoteProvider Provider');
    this.apiUrl = this.api.getApiUrl();
    this.httpOptions = this.api.getHttpOptions();
    this.userId = localStorage.getItem('userId');
  }

  getIssueNoteOrdersfromCustomerId(customerId): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/GetIssueNoteFromCustomerIdWithCombinedTables/"+customerId, this.httpOptions).subscribe(incomingIssueNotes => {
        this.issueNotes = incomingIssueNotes;
        resolve(this.issueNotes);
      });
    });
  }

  getIssueNoteOrdersFromHireOrderIdPaginated(hireOrderId, pageNo, pageSize): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/GetIssueNoteFromHireOrderPaginated/"
                    +hireOrderId+"/"+pageNo+"/"+pageSize, this.httpOptions).subscribe(incoming =>{
        resolve(incoming);
      });
      }
    )
  }

  getIssueOrdersForDisplay(pageNo, pageSize, colName, ascending, searchTerms?:string) {

    if(searchTerms==null || searchTerms == undefined) {
      return new Promise<any>(resolve => {
        this.http.get(this.apiUrl+"/Issue_Note/GetIssueNotesForDisplay/"+pageNo+"/"+pageSize+"/"+colName+"/"+ascending, this.httpOptions).subscribe(response =>{
            resolve(response);
          },
          error2 => {
            console.log(error2);
          });
      });
    }
    else {
      return new Promise<any>(resolve => {
        this.http.get(this.apiUrl+"/Issue_Note/GetIssueNotesForDisplay/"+pageNo+"/"+pageSize+"/"+colName+"/"+ascending+"/"+searchTerms, this.httpOptions).subscribe(response =>{
            resolve(response);
          },
          error2 => {
            console.log(error2);
          });
      });
    }
  }



  getAllIssueNotes():Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/GetAllIssueNotes", this.httpOptions).subscribe( response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  postNewIssueNote(issueNote): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.post(this.apiUrl+"/Issue_Note"+this.userId,issueNote, this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    })
  }

  getLastIssueNoteNo(): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/GetLastIssueNoteNo", this.httpOptions).subscribe(response=>{
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getQtyPendingForHireOrder(hireOrderId): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/GetQtyPendingOfHireOrder/"+hireOrderId, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getLastIssueNoteOfHireOrder(hireOrderId): Promise<any> {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/GetLastIssueNoteOfHireOrder/"+hireOrderId, this.httpOptions).subscribe(response=> {
        resolve(response);
      }, error2 =>{
        console.log(error2);
      });
    });
  }

  editIssueNote(issueNote) {
    return new Promise<any> (resolve => {
      this.http.patch(this.apiUrl+"/Issue_Note/PatchEditIssueNote/",issueNote,this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  deleteIssueNote(issueNoteId) {
    return new Promise<any> (resolve => {
      this.http.delete(this.apiUrl+"/Issue_Note/"+issueNoteId, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getXLOfIssueNote(issueNote) {

    return new Promise<any> (resolve => {
      this.http.post(this.apiUrl+"/Issue_Note/GetXLOfIssueNote",issueNote,{responseType: 'arraybuffer'}).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getPDFOfIssueNote(issueNote) {
    return new Promise<any> (resolve => {
      this.http.post(this.apiUrl+"/Issue_Note/GetPdfOfIssueNote",issueNote,{responseType: 'arraybuffer'}).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  setIssueNoteStatusFromNewToIssued(issueNoteId) {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/SetIssueNoteStatusFromNewToIssued/"+issueNoteId, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  setIssueNoteStatusFromIssuedToCompleted(issueNoteId) {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/SetIssueNoteStatusFromIssuedToCompleted/"+issueNoteId, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }

  getIssueNoteForDailyInventoryReport(palletProfileId: number, year: number, mth: number, day: number) {
    return new Promise<any> (resolve => {
      this.http.get(this.apiUrl+"/Issue_Note/GetIssueNoteForDailyInventoryReport/"+palletProfileId+"/"+year+"/"+mth+"/"+day, this.httpOptions).subscribe(response => {
        resolve(response);
      }, error2 => {
        console.log(error2);
      });
    });
  }



}
