import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams, Platform} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PalletProfileProvider} from "../../providers/pallet-profile/pallet-profile";
import {MovementHistoryProvider} from "../../providers/movement-history/movement-history";
import {IssueNoteProvider} from "../../../IssueNoteModule/providers/issue-note/issue-note";
import {RetrieveNoteModalSummaryReportComponent} from "../../../RetrieveNoteModule/components/retrieve-note-modal-summary-report/retrieve-note-modal-summary-report";
import {RetrieveNoteProvider} from "../../../RetrieveNoteModule/providers/retrieve-note/retrieve-note";
import {AdvanceOrderProvider} from "../../../../providers/advance-order/advance-order";
import * as moment from "moment";
import {DatePipe} from "@angular/common";
import {AdvanceProductionProvider} from "../../../../providers/advance-production/advance-production";

/**
 * Generated class for the PalletProfileMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pallet-profile-mgmt',
  templateUrl: 'pallet-profile-mgmt.html',
})
export class PalletProfileMgmtPage {

  editPalletProfileForm: FormGroup;
  palletProfile;
  allMovementHistories;
  @ViewChild('movementHistorySearchBar') movementHistorySearchBar: HTMLInputElement;
  startDate = new Date().toISOString();
  endDate = new Date().toISOString();
  dailyInventoryStatusIssueList = [];
  totIssQty:number;
  dailyInventoryStatusRetrieveList = [];
  totRetQty:number;
  totRetQtyNotAck:number;
  dailyInventoryStatusAdvanceOrderList = [];
  totAdvOrdQty:number;
  advProdBalQty:number;

  palletProfilePaginationData = {
    showPagination: false,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 10
  }

  movementHistoryPaginationData = {
    showPagination: true,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 10
  }

  mhTableOrderedCol: { name: string, isDescending: boolean, id: string } = {
    name: 'Time',
    isDescending: false,
    id: 'Time'
  };

  ionViewWillEnter() {
    this.loadOrderArrangeMovementHistoryData();
    this.getDailyInventoryStatus(this.startDate,this.endDate);
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private palletProfileProvider: PalletProfileProvider,
              private alertCtrl: AlertController,
              public platform: Platform,
              private movementHistoryProvider: MovementHistoryProvider,
              private issueNoteProvider: IssueNoteProvider,
              private retrieveNoteProvider: RetrieveNoteProvider,
              private advanceOrderProvider: AdvanceOrderProvider,
              private advanceProductionProvider: AdvanceProductionProvider) {

    this.palletProfile = this.navParams.get("palletProfile");

    this.editPalletProfileForm = this.formBuilder.group({
      Pallet_Profile_ID:[''],
      Pallet_Type:['', Validators.compose([Validators.maxLength(50), Validators.required])],
      Size:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Dynamic_Load:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Static_Load:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Functions:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Qty:['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Spec:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Marking:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Painting:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Remarks:['', Validators.compose([Validators.maxLength(255)])],
      Qty_Loaned_to_LHP:['', Validators.compose([Validators.maxLength(255)])]
    });

    this.loadForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PalletProfileMgmtPage');
  }

  loadForm() {
    this.editPalletProfileForm.controls["Pallet_Profile_ID"].setValue(this.palletProfile.Pallet_Profile_ID);
    this.editPalletProfileForm.controls["Pallet_Type"].setValue(this.palletProfile.Pallet_Type);
    this.editPalletProfileForm.controls["Size"].setValue(this.palletProfile.Size);
    this.editPalletProfileForm.controls["Dynamic_Load"].setValue(this.palletProfile.Dynamic_Load);
    this.editPalletProfileForm.controls["Static_Load"].setValue(this.palletProfile.Static_Load);
    this.editPalletProfileForm.controls["Functions"].setValue(this.palletProfile.Functions);
    this.editPalletProfileForm.controls["Qty"].setValue(this.palletProfile.Qty);
    this.editPalletProfileForm.controls["Spec"].setValue(this.palletProfile.Spec);
    this.editPalletProfileForm.controls["Marking"].setValue(this.palletProfile.Marking);
    this.editPalletProfileForm.controls["Painting"].setValue(this.palletProfile.Painting);
    this.editPalletProfileForm.controls["Remarks"].setValue(this.palletProfile.Remarks);
    this.editPalletProfileForm.controls["Qty_Loaned_to_LHP"].setValue(this.palletProfile.Qty_Loaned_to_LHP);
  }

  editPalletProfile(formData) {
    this.palletProfileProvider.patchEditPalletProfile(formData).then(result => {
      console.log("editPalletProfile: " + result);
    });

    this.alertCtrl.create({
      header: "Success!",
      message: "Changes have been saved.",
      buttons: [{
        text: "OK",
        role: "cancel",
        handler: () => {}
      }]
    }).then(alert => alert.present());
  }

  loadOrderArrangeMovementHistoryData(event?) {

    let searchTerms = this.movementHistorySearchBar.value.toString();

    this.movementHistoryProvider.getAllMovementHistoryOfPalletProfilePaginatedOrdered(this.palletProfile.Pallet_Profile_ID,
      this.movementHistoryPaginationData.currentPage,this.movementHistoryPaginationData.currentRowsPerPage,
      this.mhTableOrderedCol.id, this.mhTableOrderedCol.isDescending, searchTerms).then(result => {
        this.allMovementHistories = result.data;
        this.movementHistoryPaginationData.totalRow = result.paging.TotalRecordCount;
    });
  }

  searchMovementHistoryData(event?) {
    let searchTerms = this.movementHistorySearchBar.value.toString();
    if (searchTerms!=null) {
      this.movementHistoryPaginationData.currentPage=0;
    }
    this.movementHistoryProvider.getAllMovementHistoryOfPalletProfilePaginatedOrdered(this.palletProfile.Pallet_Profile_ID,
      this.movementHistoryPaginationData.currentPage,this.movementHistoryPaginationData.currentRowsPerPage,
      this.mhTableOrderedCol.id, this.mhTableOrderedCol.isDescending, searchTerms).then(result => {
      this.allMovementHistories = result.data;
      this.movementHistoryPaginationData.totalRow = result.paging.TotalRecordCount;
    });
  }

  getDailyInventoryStatus(startDate, endDate) {
    let startYear = parseInt(startDate.substring(0,4));
    let startMonth= parseInt(startDate.substring(5,7));
    let startDay = parseInt(startDate.substring(8,10));

    let endYear = parseInt(endDate.substring(0,4));
    let endMonth= parseInt(endDate.substring(5,7));
    let endDay = parseInt(endDate.substring(8,10));

       Promise.all([this.issueNoteProvider.getIssueNoteForDailyInventoryReport(this.palletProfile.Pallet_Profile_ID,
                                                                                    startYear,startMonth,startDay),
                          this.retrieveNoteProvider.getRetrieveNoteForDailyInventoryStatus(this.palletProfile.Pallet_Profile_ID,
                                                                                          startYear,startMonth,startDay),
                          this.advanceOrderProvider.getAdvanceOrderForDailyInventoryStatus(this.palletProfile.Pallet_Profile_ID,
                                  startYear,startMonth,startDay, endYear,endMonth,endDay),
                          this.advanceProductionProvider.getAdvProdBalQtyOfPalletProfile(this.palletProfile.Pallet_Profile_ID)]).then(values=>{
                                    this.dailyInventoryStatusIssueList = values[0].list;
                                    this.totIssQty = values[0].totalQty;
                                    this.dailyInventoryStatusRetrieveList = values[1].list;
                                    this.totRetQty = values[1].totalQty;
                                    this.totRetQtyNotAck = values[1].totalQtyNotAck;
                                    this.dailyInventoryStatusAdvanceOrderList = values[2].listing;
                                    this.totAdvOrdQty = values[2].totalQty;
                                    this.advProdBalQty = values[3];
       });
  }

  getDeviceSize(){
    if(this.platform.width() >= 992){
      return 'lg'
    } else if(this.platform.width() >=768 ){
      return 'md'
    } else if(this.platform.width() >= 576){
      return 'sm'
    } else {
      return 'xs'
    }
  }


}
