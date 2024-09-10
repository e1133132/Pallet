import { Component } from '@angular/core';
import {AlertController, Events, NavController, NavParams, Platform} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RateChargeProvider} from "../../../../providers/rate-charge/rate-charge";
import {PalletProfileProvider} from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import {PaginationData} from "../../../../shared/template-models/template-models";
import {SettingsProvider} from "../../../../providers/settings/settings";

/**
 * Generated class for the CustomerRateChargeEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-rate-charge-edit',
  templateUrl: 'customer-rate-charge-edit.html',
})
export class CustomerRateChargeEditPage {

  editCustomerRateChargeForm: FormGroup;
  palletTypes;
  chargeRate;
  paginationData: PaginationData;
  selectedTheme:String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private rateChargeProvider: RateChargeProvider,
              private palletProvider: PalletProfileProvider,
              public platform: Platform,
              private alertCtrl: AlertController,
              public event:Events,
              public settings: SettingsProvider) {

    this.paginationData = {
      showPagination: false,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 0
    }

    this.chargeRate=this.navParams.get("chargeRate");
    this.palletTypes=this.navParams.get("palletTypes");
    this.editCustomerRateChargeForm = this.formBuilder.group({    //builds the form so that it can return as a JSON Patch (partial PUT)
      ChargeRate_ID: [''],
      Rental_Rate:['', Validators.compose([Validators.maxLength(10), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])], //[default_value,Validators to be used]
      Dehire_Charge: ['', Validators.compose([Validators.maxLength(10), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Admin_Charge: ['', Validators.compose([Validators.maxLength(10), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Effective_Date: ['', Validators.compose([Validators.required])],
      Tpn_Charge:['',Validators.compose([Validators.maxLength(10), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Pallet_Profile_ID: ['', Validators.compose([Validators.required])],
      Customer_ID: [''],
    });

    this.editCustomerRateChargeForm.controls["ChargeRate_ID"].setValue(this.chargeRate.ChargeRate_ID);
    this.editCustomerRateChargeForm.controls["Customer_ID"].setValue(this.chargeRate.Customer_ID);
    this.editCustomerRateChargeForm.controls["Rental_Rate"].setValue(this.chargeRate.Rental_Rate);
    this.editCustomerRateChargeForm.controls["Dehire_Charge"].setValue(this.chargeRate.Dehire_Charge);
    this.editCustomerRateChargeForm.controls["Admin_Charge"].setValue(this.chargeRate.Admin_Charge);
    this.editCustomerRateChargeForm.controls["Effective_Date"].setValue(this.chargeRate.Effective_Date);
    this.editCustomerRateChargeForm.controls["Tpn_Charge"].setValue(this.chargeRate.Tpn_Charge);
    this.editCustomerRateChargeForm.controls["Pallet_Profile_ID"].setValue(this.chargeRate.Pallet_Profile_ID);
    this.editCustomerRateChargeForm.enable();

  }

  async editCustomerRateCharge(formData) {
    try {
      const result = await this.rateChargeProvider.editChargeRates(formData);
      console.log(result);
  
      this.event.publish('reload');
      this.navCtrl.pop();
  
      const successAlert = await this.alertCtrl.create({
        header: 'Success!',
        message: 'Rate Charge has been edited.',
        buttons: ['OK']
      });
  
      await successAlert.present();  // 使用 await 来处理 alert 的 present
    } catch (error) {
      console.log(error);
    }
  }
  

  close(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerRateChargeEditPage');
  }

}
