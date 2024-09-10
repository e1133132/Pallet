import {Component, ViewChild} from '@angular/core';
import {
  LoadingController, ModalController, NavController, NavParams, Platform,
  PopoverController
} from '@ionic/angular';
import {RetrieveNoteProvider} from "../../providers/retrieve-note/retrieve-note";
import {RetrieveNoteCreatePage} from "../retrieve-note-create/retrieve-note-create";
import {RetrieveNoteMgmtPage} from "../retrieve-note-mgmt/retrieve-note-mgmt";
import {RetrieveNoteContextMenuHomeComponent} from "../../components/retrieve-note-context-menu-home/retrieve-note-context-menu-home";
import {RetrieveNoteModalSummaryReportComponent} from "../../components/retrieve-note-modal-summary-report/retrieve-note-modal-summary-report";
import {DatePipe} from "@angular/common";
import {SettingsProvider} from "../../../../providers/settings/settings";

/**
 * Generated class for the RetrieveNoteHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-retrieve-note-home',
  templateUrl: 'retrieve-note-home.html',
})

export class RetrieveNoteHomePage {

  isRetrieveNoteNotChecked:boolean = true;
  copyAllRetrieveNotesDTO;
  allRetrieveNotesDTO;
  stringSelectedRetrieveNoteNo: string;
  checkedRetrieveNote;
  @ViewChild('retrieveNoteSearchBar') retrieveNoteSearchBar: HTMLInputElement;
  @ViewChild('retrieveNoteCheckBox') retrieveNoteCheckBox: HTMLSelectElement;
  selectedTheme:String;

  paginationDataRN = {
    showPagination: true,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 1000
  };

  rNTableOrderedCol: { name: string, isDescending: boolean, id: string } = {
    name: 'Retrieve_Note_No',
    isDescending: false,
    id: 'Retrieve_Note_No'
  };

  ionViewWillEnter() {
    this.isRetrieveNoteNotChecked = true;
    this.loadingCtrl.create({
      message: 'Loading Data. Please wait...'
    }).then(loading => {
      loading.present();

      setTimeout(() => {
        this.loadRetrieveNotes();
        console.log("Promises RN Loaded!");
        loading.dismiss();
      });
    });

  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popOverCtrl: PopoverController,
              private platform: Platform,
              private loadingCtrl: LoadingController,
              private retrieveNoteProvider: RetrieveNoteProvider,
              private modalCtrl: ModalController,
              private settings: SettingsProvider) {

    this.settings.getActiveTheme().subscribe(val => {
      this.selectedTheme = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RetrieveNoteHomePage');
  }

  loadRetrieveNotes(){

    let searchTerms = this.retrieveNoteSearchBar.value.toString();
    this.isRetrieveNoteNotChecked =true;

    this.retrieveNoteProvider.getAllRetrieveNotesPaginatedOrdered(this.paginationDataRN.currentPage,
        this.paginationDataRN.currentRowsPerPage, this.rNTableOrderedCol.id, this.rNTableOrderedCol.isDescending, searchTerms)
      .then(result=> {
        this.allRetrieveNotesDTO = result.data;
        this.paginationDataRN.totalRow = result.paging.TotalRecordCount;
      });

    // Promise.all([this.retrieveNoteProvider.getAllRetrieveNotes(),
    //   this.retrieveNoteProvider.getAllRetrieveNotesPaginatedOrdered(this.paginationDataRN.currentPage,
    //     this.paginationDataRN.currentRowsPerPage, this.rNTableOrderedCol.id, this.rNTableOrderedCol.isDescending, searchTerms)])
    //   .then(values=> {
    //     this.copyAllRetrieveNotesDTO = values[0];
    //     this.allRetrieveNotesDTO = values[1].data;
    //     this.paginationDataRN.totalRow = values[1].paging.TotalRecordCount;
    //   });
  }

  searchRetrieveNotes(searchbar) {

    this.paginationDataRN.currentPage =0;
    this.loadRetrieveNotes();

    // this.allRetrieveNotesDTO = this.copyAllRetrieveNotesDTO;   //re-initialising data everytime the searchBar clears
    //
    // var searchTerms = searchbar.srcElement.value;
    //
    // if (!searchTerms) {
    //   return;
    // }
    //
    // this.allRetrieveNotesDTO = this.allRetrieveNotesDTO.filter(incoming => {
    //   if ( incoming.Retrieve_Note_No && incoming.Retrieve_Note_No.toLowerCase().indexOf(searchTerms.toLowerCase())>-1 || //doesnt work. to see if the search function can search for pallet Type instead of palletID
    //     incoming.Customer_Name && incoming.Customer_Name.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //     incoming.Pallet_Type && incoming.Pallet_Type.toLowerCase().indexOf(searchTerms.toLowerCase())>-1 ||   //doesnt work, same as above.
    //     incoming.Qty.toString() && incoming.Qty.toString().toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //     incoming.Retrieve_Date && incoming.Retrieve_Date.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //     incoming.Status && incoming.Status.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //     incoming.Retrieve_Type && incoming.Retrieve_Type.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //     incoming.Address && incoming.Address.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
    //     incoming.Remarks && incoming.Remarks.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
    //   ) {
    //     return true;
    //   }
    //   return false;
    // });
  }

  onChangePaginationOrColumnRN(event) {

    this.loadRetrieveNotes();

    // this.retrieveNoteSearchBar.value="";
    // this.isRetrieveNoteNotChecked = true;
    // this.retrieveNoteProvider.getAllRetrieveNotesPaginatedOrdered(this.paginationDataRN.currentPage,
    //   this.paginationDataRN.currentRowsPerPage, this.rNTableOrderedCol.id, this.rNTableOrderedCol.isDescending).then(data =>{
    //   this.allRetrieveNotesDTO=data.data;
    // });
  }

  goToCreateRetrieveNote() {
    this.navCtrl.navigateForward('/retrieve-note-create');
  }

  isChecked(retrieveNote) {
    return !this.checkedRetrieveNote;
  }

  onRetrieveNoteClick(retrieveNote) {
    this.navCtrl.navigateForward('/retrieve-note-mgmt', { state: { retrieveNote: retrieveNote } });
  }

  openActionPanel(checkbox, retrieveNote) {
    if(checkbox.checked) {
      if(this.isRetrieveNoteNotChecked) {
        this.checkedRetrieveNote=retrieveNote;
        this.stringSelectedRetrieveNoteNo = this.checkedRetrieveNote.Retrieve_Note_No;
        this.isRetrieveNoteNotChecked=false;
      }
    }
    else {
      if(!this.isRetrieveNoteNotChecked) {
        this.checkedRetrieveNote=null;
        this.stringSelectedRetrieveNoteNo = "Retrieve_Note_No";
        this.isRetrieveNoteNotChecked=true;
      }
    }
  }

  openRetrieveNoteContextMenu(event) {
    this.popOverCtrl.create({
      component: RetrieveNoteContextMenuHomeComponent,
      componentProps: {
        'retrieveNote': this.checkedRetrieveNote,
      },
      cssClass: 'custom-customer-popover',
      event: event
    }).then(popover => {
      popover.present();
      return popover.onDidDismiss();
    }).then(result => {
      this.loadRetrieveNotes();
    });
  }

  goToRetrieveNoteSummaryReportModal() {
    this.modalCtrl.create({
      component: RetrieveNoteModalSummaryReportComponent,
      cssClass: this.selectedTheme + " update-profile-modal-retrieve-note-summary"
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(result => {
      console.log(result.data);
    });
  }

}
