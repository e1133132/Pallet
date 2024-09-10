import {Component, ViewChild} from '@angular/core';
import {
  AlertController, NavController, NavParams, Platform, PopoverController,
} from '@ionic/angular';
import {RetrieveNoteProvider} from "../../providers/retrieve-note/retrieve-note";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HireOrderCreateSelectCustomerPopoverComponent} from "../../../HireOrderModule/components/hire-order-create-select-customer-popover/hire-order-create-select-customer-popover";
import {CustomerProvider} from "../../../CustomerModule/providers/customer/customer";
import {PalletProfileProvider} from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";

/**
 * Generated class for the RetrieveNoteMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-retrieve-note-mgmt',
  templateUrl: 'retrieve-note-mgmt.html',
})
export class RetrieveNoteMgmtPage {

  retrieveNote;
  editRetrieveNoteForm:FormGroup;
  allCustomers;
  allPalletProfiles;
  @ViewChild("customerName") customerName: HTMLInputElement;

  paginationDataRN = {
    showPagination: false,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 1000
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              private retrieveNoteProvider: RetrieveNoteProvider,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private popOverCtrl: PopoverController,
              private customerProvider: CustomerProvider,
              private palletProvider: PalletProfileProvider) {

    this.retrieveNote = this.navParams.get("retrieveNote");

    this.editRetrieveNoteForm = this.formBuilder.group({
      Retrieve_Note_ID: [''], //hidden
      Retrieve_Note_No:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Customer_ID:['', Validators.compose([Validators.maxLength(255)])],
      Pallet_Profile_ID:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Qty:['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Retrieve_Date:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Status:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Retrieve_Type:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Retrieve_Address:['', Validators.compose([Validators.maxLength(255)])],
      Vehicle_No:['', Validators.compose([Validators.maxLength(255)])],
      Driver:['', Validators.compose([Validators.maxLength(255)])],
      Driver_IC:['', Validators.compose([Validators.maxLength(255)])],
      Tpn_Company:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Dehire_Charge:['', Validators.compose([Validators.maxLength(255), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Tpn_Charge:['', Validators.compose([Validators.maxLength(255), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Remarks:['', Validators.compose([Validators.maxLength(255)])]
    });

    Promise.all([this.customerProvider.getAllCustomers(), this.palletProvider.getAllPalletProfiles()])
      .then(values => {
        this.allCustomers = values[0];
        this.allPalletProfiles = values[1];

        this.displayRetrieveNote();
      });






  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RetrieveNoteMgmtPage');
  }

  displayRetrieveNote() {
    this.editRetrieveNoteForm.controls["Retrieve_Note_ID"].setValue(this.retrieveNote.Retrieve_Note_ID);
    this.editRetrieveNoteForm.controls["Retrieve_Note_No"].setValue(this.retrieveNote.Retrieve_Note_No);
    this.editRetrieveNoteForm.controls["Customer_ID"].setValue(this.retrieveNote.Customer_ID);
    this.customerName.value = this.retrieveNote.Customer_Name;
    this.editRetrieveNoteForm.controls["Pallet_Profile_ID"].setValue(this.retrieveNote.Pallet_Profile_ID);
    this.editRetrieveNoteForm.controls["Qty"].setValue(this.retrieveNote.Qty);
    this.editRetrieveNoteForm.controls["Status"].setValue(this.retrieveNote.Status);
    this.editRetrieveNoteForm.controls["Retrieve_Date"].setValue(this.retrieveNote.Retrieve_Date);
    this.editRetrieveNoteForm.controls["Retrieve_Type"].setValue(this.retrieveNote.Retrieve_Type);
    this.editRetrieveNoteForm.controls["Retrieve_Address"].setValue(this.retrieveNote.Retrieve_Address);
    this.editRetrieveNoteForm.controls["Vehicle_No"].setValue(this.retrieveNote.Vehicle_No);
    this.editRetrieveNoteForm.controls["Driver"].setValue(this.retrieveNote.Driver);
    this.editRetrieveNoteForm.controls["Driver_IC"].setValue(this.retrieveNote.Driver_IC);
    this.editRetrieveNoteForm.controls["Tpn_Company"].setValue(this.retrieveNote.Tpn_Company);
    this.editRetrieveNoteForm.controls["Dehire_Charge"].setValue(this.retrieveNote.Dehire_Charge);
    this.editRetrieveNoteForm.controls["Tpn_Charge"].setValue(this.retrieveNote.Tpn_Charge);
    this.editRetrieveNoteForm.controls["Remarks"].setValue(this.retrieveNote.Remarks);
  }

  openCustomerNamePopOver(event) {
    this.popOverCtrl.create({
      component: HireOrderCreateSelectCustomerPopoverComponent,
      componentProps: { "customers": this.allCustomers },
      cssClass: 'custom-customer-popover',
      event: event
    }).then(popover => {
      popover.present();
      return popover.onDidDismiss();
    }).then(result => {
      const data = result.data;
      if (data) {
        this.editRetrieveNoteForm.controls["Customer_ID"].setValue(data.customer_ID);
        this.customerName.value = data.Customer_Name;
        this.editRetrieveNoteForm.controls["Retrieve_Address"].setValue(data.Retrieve_Address);
      }
    });
  }

  editRetrieveNote(formData) {
    this.alertCtrl.create({
      header: "Confirm Changes?",
      message: "Would you like to save the change(s)? The change(s) cannot be undone.",
      buttons: [{
        text: "Yes",
        role: "Cancel",
        handler: () => {
          this.retrieveNoteProvider.patchEditRetrieveNote(formData).then(result => {
            if (result) {
              this.alertCtrl.create({
                header: "Success",
                message: "Changes successfully saved.",
                buttons: ["OK"]
              }).then(alert => alert.present());
            } else {
              this.alertCtrl.create({
                header: "Failed",
                message: "Changes failed to save. Please try again. If this continues, please contact your system administrator",
                buttons: ["OK"]
              }).then(alert => alert.present());
            }
          });
        }
      }]
    }).then(alert => alert.present());
  }
}
