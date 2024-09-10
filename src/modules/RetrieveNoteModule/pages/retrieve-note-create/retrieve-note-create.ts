import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { PalletProfileProvider } from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import { RetrieveNoteProvider } from "../../providers/retrieve-note/retrieve-note";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerProvider } from "../../../CustomerModule/providers/customer/customer";
import { HireOrderCreateSelectCustomerPopoverComponent } from "../../../HireOrderModule/components/hire-order-create-select-customer-popover/hire-order-create-select-customer-popover";

@Component({
  selector: 'page-retrieve-note-create',
  templateUrl: 'retrieve-note-create.html',
})
export class RetrieveNoteCreatePage {

  allPalletProfiles;
  allCustomers;
  latestRetrieveNoteNo;
  latestRetrieveNoteOfCustomer;
  chosenCustomer;
  createRetrieveNoteForm: FormGroup;
  currentDate = new Date().toISOString();
  @ViewChild("customerName") customerName: HTMLInputElement;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private palletProvider: PalletProfileProvider,
              private retrieveNoteProvider: RetrieveNoteProvider,
              private customerProvider: CustomerProvider,
              private popOverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder) {

    this.createRetrieveNoteForm = this.formBuilder.group({
      Retrieve_Note_No: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Customer_ID: ['', Validators.compose([Validators.maxLength(255)])],
      Pallet_Profile_ID: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Qty: ['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Retrieve_Date: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Status: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Retrieve_Type: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Retrieve_Address: ['', Validators.compose([Validators.maxLength(255)])],
      Vehicle_No: ['', Validators.compose([Validators.maxLength(255)])],
      Driver: ['', Validators.compose([Validators.maxLength(255)])],
      Driver_IC: ['', Validators.compose([Validators.maxLength(255)])],
      Tpn_Company: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Dehire_Charge: ['', Validators.compose([Validators.maxLength(255), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Tpn_Charge: ['', Validators.compose([Validators.maxLength(255), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Remarks: ['', Validators.compose([Validators.maxLength(255)])]
    });

    Promise.all([this.retrieveNoteProvider.getLastRetrieveNoteNo(),
      this.palletProvider.getAllPalletProfiles(),
      this.customerProvider.getAllCustomers()]).then(values => {

      this.latestRetrieveNoteNo = this.getLatestRetrieveNoteNo(values[0]);
      this.createRetrieveNoteForm.controls["Retrieve_Note_No"].setValue(this.latestRetrieveNoteNo);
      this.allPalletProfiles = values[1];
      this.allCustomers = values[2];
    });
  }

  getLatestRetrieveNoteNo(lastNo: string): string {
    let start = lastNo.substr(0, 3);
    let dash = lastNo.substr(5, 1);
    let number = lastNo.substr(6, lastNo.length);

    let intNumber = parseInt(number);
    intNumber++;
    let stringNumber = intNumber.toLocaleString('en', { minimumIntegerDigits: 5, useGrouping: false });

    let yearNow: string = new Date().getFullYear().toString();
    let yearShort: string = yearNow.substr(2, 2);

    return start + yearShort + dash + stringNumber;
  }

  async openCustomerNamePopOver(event) {
    let popover = await this.popOverCtrl.create({
      component: HireOrderCreateSelectCustomerPopoverComponent,
      componentProps: { customers: this.allCustomers },
      cssClass: 'custom-customer-popover'
    });
    await popover.present();
    
    const { data } = await popover.onDidDismiss();
    if (data) {
      this.chosenCustomer = data;
      this.createRetrieveNoteForm.controls["Customer_ID"].setValue(this.chosenCustomer.customer_ID);
      this.customerName.value = this.chosenCustomer.Customer_Name;
      this.createRetrieveNoteForm.controls["Retrieve_Date"].setValue(this.currentDate);

      let loadCustomerLastRetrieveNoteAlert = await this.alertCtrl.create({
        header: "Load Last Retrieve Note For Customer",
        message: "Would you like to load the last retrieve note for " + this.chosenCustomer.Customer_Name + "?",
        buttons: [{
          text: "Yes",
          role: "cancel",
          handler: async () => {
            const result = await this.retrieveNoteProvider.getLastRetrieveNoteByCustomer(this.chosenCustomer.customer_ID);
            if (result) {
              this.latestRetrieveNoteOfCustomer = result;
              this.createRetrieveNoteForm.patchValue({
                Pallet_Profile_ID: this.latestRetrieveNoteOfCustomer.Pallet_Profile_ID,
                Qty: this.latestRetrieveNoteOfCustomer.Qty,
                Status: "New",
                Retrieve_Type: this.latestRetrieveNoteOfCustomer.Retrieve_Type,
                Retrieve_Address: this.latestRetrieveNoteOfCustomer.Retrieve_Address,
                Vehicle_No: this.latestRetrieveNoteOfCustomer.Vehicle_No,
                Driver: this.latestRetrieveNoteOfCustomer.Driver,
                Driver_IC: this.latestRetrieveNoteOfCustomer.Driver_IC,
                Tpn_Company: this.latestRetrieveNoteOfCustomer.Tpn_Company,
                Dehire_Charge: this.latestRetrieveNoteOfCustomer.Dehire_Charge,
                Tpn_Charge: this.latestRetrieveNoteOfCustomer.Tpn_Charge,
                Remarks: this.latestRetrieveNoteOfCustomer.Remarks,
                Retrieve_Date: this.latestRetrieveNoteOfCustomer.Retrieve_Date >= this.currentDate ? this.latestRetrieveNoteOfCustomer.Retrieve_Date : this.currentDate
              });
            } else {
              let noRetrieveNoteAlert = await this.alertCtrl.create({
                header: "No Previous Order",
                message: "There is no previous order for " + this.chosenCustomer.Customer_Name + ".",
                buttons: [{ text: "Ok", role: "cancel" }]
              });
              await noRetrieveNoteAlert.present();
            }
          }
        }, {
          text: "No",
          role: "cancel"
        }]
      });
      await loadCustomerLastRetrieveNoteAlert.present();
    }
  }

  async resetForm() {
    this.createRetrieveNoteForm.reset();
    const values = await this.retrieveNoteProvider.getLastRetrieveNoteNo();
    this.createRetrieveNoteForm.controls["Retrieve_Note_No"].setValue(this.getLatestRetrieveNoteNo(values));
  }

  async createRetrieveNote(formData) {
    await this.retrieveNoteProvider.postRetrieveNote(formData);
    
    let alert = await this.alertCtrl.create({
      header: "Retrieve Note Created",
      message: "The Retrieve Note has been created.",
      buttons: [{
        text: "OK",
        role: "cancel",
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    await alert.present();
  }

}
