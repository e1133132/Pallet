import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from '@ionic/angular';
import {IssueNoteProvider} from "../../providers/issue-note/issue-note";
import {HireOrderProvider} from "../../../HireOrderModule/providers/hire-order/hire-order";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverNewHireOrdersComponent} from "../../components/popover-new-hire-orders/popover-new-hire-orders";
import {RateChargeProvider} from "../../../../providers/rate-charge/rate-charge";

/**
 * Generated class for the IssueNoteCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-issue-note-create',
  templateUrl: 'issue-note-create.html',
})
export class IssueNoteCreatePage {

  createIssueOrderForm: FormGroup;
  chosenHireOrder;
  currentDate:string = new Date().toISOString();
  hireOrderDate:string;
  lastIssueNoteOfHireOrder;
  latestIssueNoteNumber;
  ratechargeofCustomerNPallet;
  @ViewChild("customerName") customerName: HTMLInputElement;
  @ViewChild("qtyPending") qtyPending: HTMLInputElement;
  @ViewChild("palletType") palletType: HTMLInputElement;
  @ViewChild("delivery_Type") delivery_Type: HTMLInputElement;
  @ViewChild("hireOrderIDInput") hireOrderIDInput: HTMLInputElement;
  @ViewChild("hireOrderNoInput") hireOrderNoInput: HTMLInputElement;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private issueNoteProvider: IssueNoteProvider,
              private hireOrderProvider: HireOrderProvider,
              private rateChargeProvider: RateChargeProvider,
              private popOverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder) {

    this.createIssueOrderForm = this.formBuilder.group({
      Issue_Note_No:['', Validators.compose([Validators.maxLength(255)])],
      Hire_Order_ID: ['', Validators.compose([Validators.required])],
      Issue_Qty: ['', Validators.compose([Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])], //only numbers
      Issue_Date: ['', Validators.compose([Validators.required])],
      Status:['',Validators.compose([Validators.maxLength(255),Validators.required])],
      Vehicle_No: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      Driver: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Driver_IC: ['', Validators.compose([Validators.required])],
      Tpn_Company: ['',Validators.required],
      Tpn_Charge: ['', Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
      Heat_treatment: ['',Validators.required],
      Remarks: [''],
      Issue_Type: ['', Validators.required],
      Qty_Rejected: ['']
    });

    Promise.all([this.issueNoteProvider.getLastIssueNoteNo()]).then(values=>{
      this.latestIssueNoteNumber = this.getLatestIssueNoteNo(values[0]);
      this.createIssueOrderForm.controls["Issue_Note_No"].setValue(this.latestIssueNoteNumber);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueNoteCreatePage');
  }

  async createIssueNote(formData) {
    if (this.createIssueOrderForm.controls["Issue_Qty"].value > this.qtyPending.value) {
      const alert = await this.alertCtrl.create({
        header: "Quantity Error",
        message: "Issue Quantity is higher than Remaining Quantity in Hire Order. Please try again with a smaller quantity.",
        buttons: [{ text: 'OK', role: 'cancel', handler: () => {} }]
      });
      await alert.present();
    } else {
      await this.issueNoteProvider.postNewIssueNote(formData);
      const successAlert = await this.alertCtrl.create({
        header: "Success!",
        message: "Issue Note successfully created!",
        buttons: [{ text: 'Ok', role: 'cancel', handler: () => this.navCtrl.pop() }]
      });
      await successAlert.present();
    }
  }

  async openIssueNoteSelectHireOrderPopOver(event) {
    const popover = await this.popOverCtrl.create({
      component: PopoverNewHireOrdersComponent,
      cssClass: 'custom-customer-popover'
    });

    popover.onDidDismiss().then(async (data) => {
      if (data) {
        this.chosenHireOrder = data;
        this.customerName.value = this.chosenHireOrder.Customer_Name;
        this.palletType.value = this.chosenHireOrder.Pallet_Type;
        this.delivery_Type.value = this.chosenHireOrder.Delivery_Type;
        this.hireOrderIDInput.value = this.chosenHireOrder.Hire_Order_ID;
        this.hireOrderNoInput.value = this.chosenHireOrder.Hire_Order_No;
        this.hireOrderDate = this.chosenHireOrder.Hire_Date;
        this.createIssueOrderForm.controls["Issue_Date"].setValue(this.hireOrderDate);
        this.createIssueOrderForm.controls["Issue_Type"].setValue("Deliver by LHP");
        this.createIssueOrderForm.controls["Qty_Rejected"].setValue(0);
        this.createIssueOrderForm.controls["Status"].setValue("New");
  
        const qtyPendingResult = await this.issueNoteProvider.getQtyPendingForHireOrder(this.chosenHireOrder.Hire_Order_ID);
        if (qtyPendingResult) {
          this.qtyPending.value = qtyPendingResult;
        }
  
        const alert = await this.alertCtrl.create({
          header: 'Loading Last Issue Note',
          message: 'Do you want to load the details of the last issue note for ' + this.chosenHireOrder.Hire_Order_No + '?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: async () => {
                const rateChargeResult = await this.rateChargeProvider.getChargeRateOfCustomerIdPalletId(
                  this.chosenHireOrder.Customer_ID,
                  this.chosenHireOrder.Pallet_Profile_ID
                );
                this.ratechargeofCustomerNPallet = rateChargeResult;
                this.createIssueOrderForm.controls["Tpn_Charge"].setValue(this.ratechargeofCustomerNPallet.Tpn_Charge);
              }
            },
            {
              text: 'Yes',
              handler: async () => {
                const lastIssueNoteResult = await this.issueNoteProvider.getLastIssueNoteOfHireOrder(this.chosenHireOrder.Hire_Order_ID);
                if (lastIssueNoteResult) {
                  this.lastIssueNoteOfHireOrder = lastIssueNoteResult;
                  this.createIssueOrderForm.controls["Issue_Qty"].setValue(this.lastIssueNoteOfHireOrder.Issue_Qty);
                  this.createIssueOrderForm.controls["Vehicle_No"].setValue(this.lastIssueNoteOfHireOrder.Vehicle_No);
                  this.createIssueOrderForm.controls["Driver"].setValue(this.lastIssueNoteOfHireOrder.Driver);
                  this.createIssueOrderForm.controls["Driver_IC"].setValue(this.lastIssueNoteOfHireOrder.Driver_IC);
                  this.createIssueOrderForm.controls["Tpn_Company"].setValue(this.lastIssueNoteOfHireOrder.Tpn_Company);
                  this.createIssueOrderForm.controls["Tpn_Charge"].setValue(this.lastIssueNoteOfHireOrder.Tpn_Charge);
                  this.createIssueOrderForm.controls["Heat_treatment"].setValue(this.lastIssueNoteOfHireOrder.Heat_treatment);
                  this.createIssueOrderForm.controls["Remarks"].setValue(this.lastIssueNoteOfHireOrder.Remarks);
                } else {
                  const noIssueNoteAlert = await this.alertCtrl.create({
                    header: 'No Issue Note Found',
                    message: 'There are no issue notes for this hire order yet.',
                    buttons: [{ text: 'Ok', role: 'cancel', handler: () => {} }]
                  });
                  await noIssueNoteAlert.present();
                }
              }
            }
          ]
        });
        await alert.present();
      }
    });
  
    await popover.present();
  }

  getLatestIssueNoteNo(lastNo:string):string {
    let start = lastNo.substr(0,3);
    let dash = lastNo.substr(5,1);
    let number = lastNo.substr(6,lastNo.length);

    let intNumber = parseInt(number);
    intNumber++;
    let stringNumber = intNumber.toLocaleString('en',{minimumIntegerDigits:5, useGrouping:false});


    let yearNow:string = new Date().getFullYear().toString();
    let yearShort:string = yearNow.substr(2,2);

    return start+yearShort+dash+stringNumber;

  }


  resetForm() {
    this.createIssueOrderForm.reset();
    Promise.all([this.issueNoteProvider.getLastIssueNoteNo()]).then(values=>{
      this.latestIssueNoteNumber = this.getLatestIssueNoteNo(values[0]);
      this.createIssueOrderForm.controls["Issue_Note_No"].setValue(this.latestIssueNoteNumber);
    });
  }

}
