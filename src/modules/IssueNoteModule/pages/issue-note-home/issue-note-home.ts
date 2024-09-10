import {Component, ViewChild} from '@angular/core';
import {
  IonicPage, LoadingController, ModalController, NavController, NavParams, Platform,
  PopoverController
} from '@ionic/angular';
import {IssueNoteProvider} from "../../providers/issue-note/issue-note";
import {IssueNoteCreatePage} from "../issue-note-create/issue-note-create";
import {IssueNoteMgmtPage} from "../issue-note-mgmt/issue-note-mgmt";
import {IssueNoteContextMenuHomeComponent} from "../../components/issue-note-context-menu-home/issue-note-context-menu-home";
import {DatePipe} from "@angular/common";

/**
 * Generated class for the IssueNoteHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-issue-note-home',
  templateUrl: 'issue-note-home.html',
})
export class IssueNoteHomePage {

  allIssueNotesDTO;
  copyAllIssueNotesDTO;
  isIssueNoteNotChecked:boolean = true;
  checkedIssueNote;
  idIssueNote:string;

  @ViewChild('issueNoteSearchBar') issueNoteSearchBar: HTMLInputElement;
  @ViewChild('issueNoteCheckBox') issueNoteCheckBox: HTMLSelectElement;


  paginationDataIssN = {
    showPagination: true,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 1000
  };

  issNTableOrderedCol: { name: string, isDescending: boolean, id: string } = {
    name: 'Issue_Note_No',
    isDescending: false,
    id: 'Issue_Note_No'
  };

  ionViewWillEnter() {
    this.issueNoteSearchBar.value="";
    this.isIssueNoteNotChecked = true;
    let loading = this.loadingCtrl.create({
      content: 'Loading Data. Please wait...'
    });

    loading.present();

    setTimeout(() => {
      this.loadNotes();
      console.log("Promises IssN Loaded!");
      loading.dismiss();
    });

  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private popOverCtrl: PopoverController,
              private platform: Platform,
              private loadingCtrl: LoadingController,
              private issueNoteProvider: IssueNoteProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueNoteHomePage');
  }

  onChangePaginationOrColumnIssN(event) {

    let searchTerms = this.issueNoteSearchBar.value.toString();
    this.isIssueNoteNotChecked =true;

    this.issueNoteProvider.getIssueOrdersForDisplay(this.paginationDataIssN.currentPage,
      this.paginationDataIssN.currentRowsPerPage, this.issNTableOrderedCol.id, this.issNTableOrderedCol.isDescending, searchTerms).then(result=>{
      this.allIssueNotesDTO = result.data;
      this.paginationDataIssN.totalRow = result.paging.TotalRecordCount;
    });

    // this.issueNoteSearchBar.value="";
    // this.isIssueNoteNotChecked = true;
    // this.issueNoteProvider.getIssueOrdersForDisplay(this.paginationDataIssN.currentPage, this.paginationDataIssN.currentRowsPerPage, this.issNTableOrderedCol.id,
    //   this.issNTableOrderedCol.isDescending).then(data=> {
    //   this.allIssueNotesDTO = data.data;
    //   this.paginationDataIssN.totalRow = data.paging.TotalRecordCount;
    //   });
  }


  loadNotes() {

    let searchTerms = this.issueNoteSearchBar.value.toString();
    this.paginationDataIssN.currentPage =0;
    this.isIssueNoteNotChecked =true;

    this.issueNoteProvider.getIssueOrdersForDisplay(this.paginationDataIssN.currentPage,
      this.paginationDataIssN.currentRowsPerPage, this.issNTableOrderedCol.id, this.issNTableOrderedCol.isDescending, searchTerms).then(result=>{
      this.allIssueNotesDTO = result.data;
      this.paginationDataIssN.totalRow = result.paging.TotalRecordCount;
    });

    // Promise.all([this.issueNoteProvider.getAllIssueNotes(),
    //   this.issueNoteProvider.getIssueOrdersForDisplay(this.paginationDataIssN.currentPage,
    //     this.paginationDataIssN.currentRowsPerPage, this.issNTableOrderedCol.id, this.issNTableOrderedCol.isDescending)])
    //   .then(values=> {
    //   this.copyAllIssueNotesDTO = values[0];
    //    this.allIssueNotesDTO = values[1].data;
    //    this.paginationDataIssN.totalRow = values[1].paging.TotalRecordCount;
    // });
  }

  isChecked(issueNote): boolean{
    return !this.checkedIssueNote;
  }

  onIssueNoteClick(issueNote) {
    console.log(issueNote);
    this.navCtrl.push("IssueNoteMgmtPage", {issueNote:issueNote});
  }

  searchIssueNotes(event) {

    this.loadNotes();
    // this.allIssueNotesDTO = this.copyAllIssueNotesDTO;   //re-initialising data everytime the searchBar clears
    //
    // var searchTerms = searchbar.srcElement.value;
    //
    // if (!searchTerms) {
    //   return;
    // }
    //
    // this.allIssueNotesDTO = this.allIssueNotesDTO.filter(incoming => {
    //   if (incoming.Issue_Note_No && incoming.Issue_Note_No.toLowerCase().indexOf(searchTerms.toLowerCase())>-1 ||
    //   incoming.Hire_Order_No && incoming.Hire_Order_No.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Qty_Pending && incoming.Qty_Pending.toString().toLowerCase().indexOf(searchTerms.toLowerCase())>-1 ||
    //   incoming.Customer_Name && incoming.Customer_Name.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Pallet_Type && incoming.Pallet_Type.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Issue_Qty && incoming.Issue_Qty.toString().toLowerCase().indexOf(searchTerms.toString()) > -1 ||
    //   incoming.Issue_Date && incoming.Issue_Date.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Status && incoming.Status.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Delivery_Type && incoming.Delivery_Type.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Vehicle_No && incoming.Vehicle_No.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Driver && incoming.Driver.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Driver_IC && incoming.Driver_IC.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Tpn_Charge && incoming.Tpn_Charge.toString().toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Tpn_Company && incoming.Tpn_Company.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Heat_treatment && incoming.Heat_treatment.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //   incoming.Remarks && incoming.Remarks.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
    //   ) {
    //     return true;
    //   }
    //   return false;
    // });
  }


  openActionPanel(checkbox, issueNote) {
    if(checkbox.checked) {
      if(this.isIssueNoteNotChecked) {
        this.checkedIssueNote=issueNote;
        this.idIssueNote = this.checkedIssueNote.Issue_Note_No;
        this.isIssueNoteNotChecked=false;
      }
    }
    else {
      if(!this.isIssueNoteNotChecked) {
        this.checkedIssueNote=null;
        this.idIssueNote = "Issue Note";
        this.isIssueNoteNotChecked=true;
      }
    }
  }

  openIssueNoteContextMenu(event) {

    let popover = this.popOverCtrl.create(IssueNoteContextMenuHomeComponent, {
      'issueNote': this.checkedIssueNote,
    }, {cssClass: 'custom-customer-popover'});

    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      this.loadNotes();
    });
  }

  goToCreateIssueNote() {
    this.navCtrl.push("IssueNoteCreatePage");
  }

}
