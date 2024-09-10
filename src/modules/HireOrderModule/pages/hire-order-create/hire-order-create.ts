import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, Platform, PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HireOrderProvider } from "../../providers/hire-order/hire-order";
import { PalletProfileProvider } from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import { CustomerProvider } from "../../../CustomerModule/providers/customer/customer";
import { HireOrderCreateSelectCustomerPopoverComponent } from "../../components/hire-order-create-select-customer-popover/hire-order-create-select-customer-popover";
import { AdvanceOrderProvider } from "../../../../providers/advance-order/advance-order";

@Component({
  selector: 'page-hire-order-create',
  templateUrl: 'hire-order-create.html',
})
export class HireOrderCreatePage {
  allPallets;
  allCustomers;
  customerChosenFromPopOver;
  customerLastHireOrder;
  lastHOOrderNo: string;
  advanceOrders;
  currentDate: string = new Date().toISOString();
  maxDate: number = new Date().getFullYear() + 2;
  
  @ViewChild("customerName") customerName: HTMLInputElement;

  createHireOrderForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private popOverCtrl: PopoverController,
              private formBuilder: FormBuilder,
              private hireOrderProvider: HireOrderProvider,
              private palletProvider: PalletProfileProvider,
              private custProvider: CustomerProvider,
              public platform: Platform,
              private alertCtrl: AlertController,
              private advanceOrderProvider: AdvanceOrderProvider) {

    this.createHireOrderForm = this.formBuilder.group({
      Hire_Order_No: ['', Validators.compose([Validators.maxLength(255)])],
      Customer_ID: ['', Validators.compose([Validators.required])],
      Qty: ['', Validators.compose([Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Pallet_Profile_ID: ['', Validators.compose([Validators.required])],
      Hire_Date: ['', Validators.compose([Validators.required])],
      Expected_Issue_Date: ['', Validators.compose([Validators.required])],
      Delivery_Type: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      Delivery_Address: ['', Validators.compose([Validators.required])],
      Status: ['', Validators.required],
      Advance_Order: ['']
    });

    Promise.all([this.custProvider.getAllCustomers(),
                 this.palletProvider.getAllPalletProfiles(),
                 this.hireOrderProvider.getLastHOOrderNo(),
                 this.advanceOrderProvider.getListOfAONo()]).then(values => {
      this.allCustomers = values[0];
      this.allPallets = values[1];
      this.lastHOOrderNo = this.getLatestHOOrderNo(values[2]);
      this.advanceOrders = values[3];
      console.log(this.lastHOOrderNo);

      this.createHireOrderForm.controls["Hire_Order_No"].setValue(this.lastHOOrderNo);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HireOrderCreatePage');
  }

  async createHireOrder(formData) {
    await this.hireOrderProvider.postCreateHireOrder(formData);

    const alert_success = await this.alertCtrl.create({
      header: "Success",  // 使用 header 替代 title
      message: "Hire Order has been added!",
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });

    await alert_success.present();  // 需要使用 await
  }

  async openHireOrderSelectCustomerPopOver(event) {
    const popover = await this.popOverCtrl.create({
      component: HireOrderCreateSelectCustomerPopoverComponent,
      componentProps: { 'customers': this.allCustomers },
      cssClass: 'custom-customer-popover'
    });

    await popover.present();  // 使用 await 处理 present

    const { data } = await popover.onDidDismiss();  // 使用 await 处理 onDidDismiss 并解构返回值

    if (data) {
      this.customerChosenFromPopOver = data;

      const alert = await this.alertCtrl.create({
        header: 'Loading Last Order',  // 使用 header 替代 title
        message: `Do you want to load the details of the last hired order for ${this.customerChosenFromPopOver.Customer_Name}?`,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.createHireOrderForm.reset();
              this.createHireOrderForm.controls["Hire_Order_No"].setValue(this.lastHOOrderNo);
              this.createHireOrderForm.controls["Customer_ID"].setValue(this.customerChosenFromPopOver.customer_ID);
              this.createHireOrderForm.controls["Status"].setValue("New");
              this.createHireOrderForm.controls["Delivery_Address"].setValue(this.customerChosenFromPopOver.Address);
              this.customerName.value = this.customerChosenFromPopOver.Customer_Name;
            }
          },
          {
            text: 'Yes',
            handler: async () => {
              const result = await this.hireOrderProvider.GetLatestHireOrderOfCustomerId(this.customerChosenFromPopOver.customer_ID);
              if (result) {
                this.customerLastHireOrder = result;
                this.createHireOrderForm.controls["Customer_ID"].setValue(this.customerChosenFromPopOver.customer_ID);
                this.createHireOrderForm.controls["Qty"].setValue(this.customerLastHireOrder.Qty);
                this.createHireOrderForm.controls["Pallet_Profile_ID"].setValue(this.customerLastHireOrder.Pallet_Profile_ID);
                this.createHireOrderForm.controls["Status"].setValue("New");

                const hireDateValid = this.customerLastHireOrder.Hire_Date >= this.currentDate;
                this.createHireOrderForm.controls["Hire_Date"].setValue(hireDateValid ? this.customerLastHireOrder.Hire_Date : this.currentDate);

                const issueDateValid = this.customerLastHireOrder.Expected_Issue_Date >= this.currentDate;
                this.createHireOrderForm.controls["Expected_Issue_Date"].setValue(issueDateValid ? this.customerLastHireOrder.Expected_Issue_Date : this.currentDate);

                this.createHireOrderForm.controls["Delivery_Type"].setValue(this.customerLastHireOrder.Delivery_Type);
                this.createHireOrderForm.controls["Delivery_Address"].setValue(this.customerLastHireOrder.Delivery_Address);
                this.createHireOrderForm.controls["Advance_Order"].setValue(this.customerLastHireOrder.Advance_Order);
                this.customerName.value = this.customerChosenFromPopOver.Customer_Name;
              } else {
                const alert1 = await this.alertCtrl.create({
                  header: 'No Last Order',  // 使用 header 替代 title
                  message: `There are no hired orders for ${this.customerChosenFromPopOver.Customer_Name}.`,
                  buttons: [
                    {
                      text: 'OK',
                      role: 'cancel',
                      handler: () => {
                        this.createHireOrderForm.reset();
                        this.createHireOrderForm.controls["Hire_Order_No"].setValue(this.lastHOOrderNo);
                        this.createHireOrderForm.controls["Status"].setValue("New");
                        this.createHireOrderForm.controls["Customer_ID"].setValue(this.customerChosenFromPopOver.customer_ID);
                        this.createHireOrderForm.controls["Delivery_Address"].setValue(this.customerChosenFromPopOver.Address);
                        this.customerName.value = this.customerChosenFromPopOver.Customer_Name;
                      }
                    }
                  ]
                });
                await alert1.present();
              }
            }
          }
        ]
      });

      await alert.present();  // 需要使用 await
    }
  }

  getLatestHOOrderNo(lastNo: string): string {
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

  resetForm() {
    this.createHireOrderForm.reset();
    this.createHireOrderForm.controls["Hire_Order_No"].setValue(this.lastHOOrderNo);
  }
}
