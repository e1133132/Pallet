import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RateChargeProvider} from "../../../../providers/rate-charge/rate-charge";
import {NavController, NavParams, ModalController} from "@ionic/angular";
import {PalletProfileProvider} from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import {CustomerProvider} from "../../providers/customer/customer";
import {PaginationData} from "../../../../shared/template-models/template-models";

/**
 * Generated class for the CustomerRatechargesModalEditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'customer-ratecharges-modal-edit',
  templateUrl: 'customer-ratecharges-modal-edit.html'
})
export class CustomerRatechargesModalEditComponent {

  editCustomerRateChargeForm: FormGroup;
  palletTypes;
  chargeRate;


  constructor(private formBuilder: FormBuilder,
              private navParams: NavParams,
              private rateChargeProvider: RateChargeProvider,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private palletProvider: PalletProfileProvider) {
    console.log('Hello CustomerRatechargesModalEditComponent Component');

    this.chargeRate=this.navParams.get("chargeRate");
    this.palletProvider.getAllPalletProfiles().then(result => {
      this.palletTypes=result;
    });
    this.palletTypes = this.navParams.get("palletTypes");


    this.editCustomerRateChargeForm = this.formBuilder.group({    //builds the form so that it can return as a JSON Patch (partial PUT)
      ChargeRate_ID: [''],
      Rental_Rate:['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])], //[default_value,Validators to be used]
      Dehire_Charge: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])],
      Admin_Charge: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])],
      Effective_Date: ['', Validators.compose([Validators.required])],
      Tpn_Charge:['',Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])],
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

  editCustomerRateCharge(formData) {
    this.rateChargeProvider.editChargeRates(formData).then(result=> {
      console.log(result);
    }, error => {
      console.log(error);
    })
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
