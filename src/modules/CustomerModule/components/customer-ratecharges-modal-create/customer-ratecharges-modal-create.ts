import { Component } from '@angular/core';
import {NavController, NavParams, ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerContactsProvider} from "../../providers/customer-contacts/customer-contacts";
import {CustomerProvider} from "../../providers/customer/customer";
import {RateChargeProvider} from "../../../../providers/rate-charge/rate-charge";
import {PalletProfileProvider} from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";

/**
 * Generated class for the CustomerRatechargesModalCreateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'customer-ratecharges-modal-create',
  templateUrl: 'customer-ratecharges-modal-create.html'
})
export class CustomerRatechargesModalCreateComponent {

  custId;
  createCustomerRateChargeForm: FormGroup;
  palletTypes;

  constructor(private formBuilder: FormBuilder,
              private navParams: NavParams,
              private custProvider: CustomerProvider,
              private rateChargeProvider: RateChargeProvider,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private palletProvider: PalletProfileProvider) {

    console.log('Hello CustomerRatechargesModalCreateComponent Component');

    this.custId = this.navParams.get("custId");
    this.palletProvider.getAllPalletProfiles().then(result => {
      this.palletTypes=result;
  });

    this.createCustomerRateChargeForm = this.formBuilder.group({    //builds the form so that it can return as a JSON Patch (partial PUT)
      Rental_Rate:['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])], //[default_value,Validators to be used]
      Dehire_Charge: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])],
      Admin_Charge: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])],
      Effective_Date: ['', Validators.compose([Validators.required])],
      Tpn_Charge:['',Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])],
      Pallet_Profile_ID: ['', Validators.compose([Validators.required])],
      Customer_ID: [''],
    });

    this.createCustomerRateChargeForm.controls["Customer_ID"].setValue(this.custId);
    this.createCustomerRateChargeForm.controls["Effective_Date"].setValue(new Date().toISOString());
    this.createCustomerRateChargeForm.enable();

  }

  close() {
    this.modalCtrl.dismiss();
  }

  createCustomerRateCharge(formData) {
    this.rateChargeProvider.postCreateChargeRate(JSON.stringify(formData)).then(result => {
      console.log(result);
    });
    this.navCtrl.pop();
  }
}
