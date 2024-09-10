import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, Platform} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RateChargeProvider} from "../../../../providers/rate-charge/rate-charge";
import {PaginationData} from "../../../../shared/template-models/template-models";

/**
 * Generated class for the CustomerRateChargeCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-rate-charge-create',
  templateUrl: 'customer-rate-charge-create.html',
})
export class CustomerRateChargeCreatePage {

    customer;
    palletTypes;
    createCustomerRateChargeForm: FormGroup;
  paginationData: PaginationData;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              private rateChargeProvider:RateChargeProvider,
              public platform: Platform,
              private alertCtrl:AlertController) {

    this.customer = this.navParams.get("customer");
    this.palletTypes = this.navParams.get("palletTypes");
    this.paginationData = {
      showPagination: false,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 0
    }

    this.createCustomerRateChargeForm = this.formBuilder.group({    //builds the form so that it can return as a JSON Patch (partial PUT)
      Rental_Rate:['', Validators.compose([Validators.maxLength(10), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])], //[default_value,Validators to be used]
      Dehire_Charge: ['', Validators.compose([Validators.maxLength(10), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Admin_Charge: ['', Validators.compose([Validators.maxLength(10), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Effective_Date: ['', Validators.compose([Validators.required])],
      Tpn_Charge:['',Validators.compose([Validators.maxLength(10), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Pallet_Profile_ID: ['', Validators.compose([Validators.required])],
      Customer_ID: [''],
    });

    this.createCustomerRateChargeForm.controls["Customer_ID"].setValue(this.customer.customer_ID);
    this.createCustomerRateChargeForm.controls["Effective_Date"].setValue(new Date().toISOString());
    this.createCustomerRateChargeForm.enable();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerRateChargeCreatePage');
  }

   async createCustomerRateCharge(formData) {
    await this.rateChargeProvider.postCreateChargeRate(JSON.stringify(formData)).then(result => {
      console.log(result);
    });

    let successAlert = await this.alertCtrl.create({
      header: 'Success!',
      message: 'New Rate Charge has been created',
      buttons: ['OK']
    });
    await successAlert.present();
    this.navCtrl.pop();

  }

  close() {
    this.navCtrl.pop();
  }


}
