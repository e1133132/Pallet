import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform, PopoverController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IssueNoteProvider} from "../../providers/issue-note/issue-note";
import {HireOrderProvider} from "../../../HireOrderModule/providers/hire-order/hire-order";

/**
 * Generated class for the IssueNoteMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-issue-note-mgmt',
  templateUrl: 'issue-note-mgmt.html',
})
export class IssueNoteMgmtPage {

  issueNote;
  editIssueNoteForm:FormGroup;
  hireOrderDate;
  @ViewChild("customerName") customerName: HTMLInputElement;
  @ViewChild("qtyPending") qtyPending: HTMLInputElement;
  @ViewChild("palletType") palletType: HTMLInputElement;
  @ViewChild("delivery_Type") delivery_Type: HTMLInputElement;
  @ViewChild("hireOrderIDInput") hireOrderIDInput: HTMLInputElement;
  @ViewChild("hireOrderNoInput") hireOrderNoInput: HTMLInputElement;

  paginationDataIssNEdit = {
    showPagination: false,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 1000
  };


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private issueNoteProvider: IssueNoteProvider,
              private hireOrderProvider: HireOrderProvider,
              private popOverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private platform: Platform) {

    this.issueNote = this.navParams.get("issueNote");

    this.hireOrderProvider.getOneHireOrder(this.issueNote.Hire_Order_ID).then(data => {
      this.hireOrderDate=data.Hire_Date;
      console.log(this.hireOrderDate);
    });

    this.editIssueNoteForm = this.formBuilder.group({
      Issue_Note_ID:[''],
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
      Issue_Type: [''],
      Qty_Rejected: ['', Validators.required]
    });

    this.editIssueNoteForm.controls["Issue_Note_ID"].setValue(this.issueNote.Issue_Note_ID);
    this.editIssueNoteForm.controls["Issue_Note_No"].setValue(this.issueNote.Issue_Note_No);
    this.editIssueNoteForm.controls["Hire_Order_ID"].setValue(this.issueNote.Hire_Order_ID);
    this.editIssueNoteForm.controls["Issue_Qty"].setValue(this.issueNote.Issue_Qty);
    this.editIssueNoteForm.controls["Issue_Date"].setValue(this.issueNote.Issue_Date);
    this.editIssueNoteForm.controls["Issue_Note_No"].setValue(this.issueNote.Issue_Note_No);
    this.editIssueNoteForm.controls["Status"].setValue(this.issueNote.Status);
    this.editIssueNoteForm.controls["Driver"].setValue(this.issueNote.Driver);
    this.editIssueNoteForm.controls["Vehicle_No"].setValue(this.issueNote.Vehicle_No);
    this.editIssueNoteForm.controls["Driver_IC"].setValue(this.issueNote.Driver_IC);
    this.editIssueNoteForm.controls["Tpn_Company"].setValue(this.issueNote.Tpn_Company);
    this.editIssueNoteForm.controls["Tpn_Charge"].setValue(this.issueNote.Tpn_Charge);
    this.editIssueNoteForm.controls["Heat_treatment"].setValue(this.issueNote.Heat_treatment);
    this.editIssueNoteForm.controls["Remarks"].setValue(this.issueNote.Remarks);
    this.editIssueNoteForm.controls["Issue_Type"].setValue(this.issueNote.Issue_Type);
    this.editIssueNoteForm.controls["Qty_Rejected"].setValue(this.issueNote.Qty_Rejected);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueNoteMgmtPage');
    this.customerName.value=this.issueNote.Customer_Name;
    this.palletType.value = this.issueNote.Pallet_Type;
    this.delivery_Type.value = this.issueNote.Delivery_Type;
    this.hireOrderIDInput.value = this.issueNote.Hire_Order_ID;
    this.hireOrderNoInput.value = this.issueNote.Hire_Order_No;
    this.qtyPending.value = this.issueNote.Qty_Pending;
  }

  reloadForm() {
    this.editIssueNoteForm.controls["Issue_Note_ID"].setValue(this.issueNote.Issue_Note_ID);
    this.editIssueNoteForm.controls["Issue_Note_No"].setValue(this.issueNote.Issue_Note_No);
    this.editIssueNoteForm.controls["Hire_Order_ID"].setValue(this.issueNote.Hire_Order_ID);
    this.editIssueNoteForm.controls["Issue_Qty"].setValue(this.issueNote.Issue_Qty);
    this.editIssueNoteForm.controls["Issue_Date"].setValue(this.issueNote.Issue_Date);
    this.editIssueNoteForm.controls["Issue_Note_No"].setValue(this.issueNote.Issue_Note_No);
    this.editIssueNoteForm.controls["Status"].setValue(this.issueNote.Status);
    this.editIssueNoteForm.controls["Driver"].setValue(this.issueNote.Driver);
    this.editIssueNoteForm.controls["Vehicle_No"].setValue(this.issueNote.Vehicle_No);
    this.editIssueNoteForm.controls["Driver_IC"].setValue(this.issueNote.Driver_IC);
    this.editIssueNoteForm.controls["Tpn_Company"].setValue(this.issueNote.Tpn_Company);
    this.editIssueNoteForm.controls["Tpn_Charge"].setValue(this.issueNote.Tpn_Charge);
    this.editIssueNoteForm.controls["Heat_treatment"].setValue(this.issueNote.Heat_treatment);
    this.editIssueNoteForm.controls["Remarks"].setValue(this.issueNote.Remarks);
    this.editIssueNoteForm.controls["Issue_Type"].setValue(this.issueNote.Issue_Type);
    this.editIssueNoteForm.controls["Qty_Rejected"].setValue(this.issueNote.Qty_Rejected);
  }

  editIssueNote(formData) {

    //1. Check if edited quantity is larger than total Hire Order Quantity.
    if (this.editIssueNoteForm.controls["Issue_Qty"].value > (this.qtyPending.value+this.issueNote.Issue_Qty)) {
      let alert = this.alertCtrl.create({
        title: "Quantity Error",
        message: "Issue Quantity is higher than Remaining Quantity in Hire Order. Please try again with a smaller quantity.",
        buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }]
      });
      alert.present();
    }
    else {
      //2. if the hire order quantity has been met with this edit, ask if want to replace Hire Order Status from New to Completed
      if ((this.editIssueNoteForm.controls["Issue_Qty"].value == parseInt(this.qtyPending.value+this.issueNote.Issue_Qty))) {
        let alert = this.alertCtrl.create({
          title: "Completion of Hire Order",
          message: "Hire Order will be completed after this Issue Note. Would you like to mark the attached Hire Order as Completed?",
          buttons: [{
            text: 'Yes',
            role: 'cancel',
            handler: () => {
              console.log(this.issueNote.Hire_Order_ID);
              this.hireOrderProvider.markHireOrderAsComplete(this.issueNote.Hire_Order_ID).then(result => {
                console.log(result);
              });

              this.editIssueNoteInDB(formData);
            }
          },
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                this.editIssueNoteInDB(formData);
              }
            }]
        });
        alert.present();
      }
      else {
        //3. now check if the hire order has been completed before but the edited value will "uncomplete" it
        if(parseInt(this.qtyPending.value)==0 && this.editIssueNoteForm.controls["Issue_Qty"].value < this.issueNote.Issue_Qty)
        {
          let warningHireOrderAlert = this.alertCtrl.create({
            title: "Warning",
            message: "Issue Note Quantity has been changed, which will 'uncomplete' the hire order. " +
                      "Would you like to set the hire order status back to 'Partially Complete'? ",
            buttons: [{
              text: "Yes",
              role: "cancel",
              handler: () => {

                this.hireOrderProvider.markHireOrderAsPartiallyComplete(this.issueNote.Hire_Order_ID).then(result => {
                  console.log(result);
                });

                this.editIssueNoteInDB(formData);
              }
              }, {
              text: "No",
              role:"cancel",
              handler: ()=> {}
            }]
          });
          warningHireOrderAlert.present();
        }
        else {
          //4. if the previous conditions are not met, do the edit as per normal.
          this.editIssueNoteInDB(formData);
        }
      }
    }
  }

  editIssueNoteInDB(formData) {
    this.issueNoteProvider.editIssueNote(formData).then(result => {
      console.log(result);
    });

    let alert = this.alertCtrl.create({
      title: "Success!",
      message: "Issue Note has been edited.",
      buttons: [{
        text: "OK",
        role: "cancel",
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

}
