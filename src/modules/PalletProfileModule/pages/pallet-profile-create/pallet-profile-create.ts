import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from '@ionic/angular';

import {ApiURL} from "../../../../shared/ApiURL";
import {PalletProfileProvider} from "../../providers/pallet-profile/pallet-profile";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the PalletProfileCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pallet-profile-create',
  templateUrl: 'pallet-profile-create.html',
})
export class PalletProfileCreatePage {

  createPalletProfileForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: ApiURL,
              private palletProfileProvider: PalletProfileProvider,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder) {

    this.createPalletProfileForm = this.formBuilder.group({
      Pallet_Type:['', Validators.compose([Validators.maxLength(50), Validators.required])],
      Size:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Dynamic_Load:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Static_Load:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Functions:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Qty:['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Spec:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Marking:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Painting:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Remarks:['', Validators.compose([Validators.maxLength(255)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PalletProfileCreatePage');
  }

  createPalletProfile(formData) {
    this.palletProfileProvider.postCreatePalletProfile(formData).then(result => {
      console.log("CreatePalletProfileResult: " + result.toString());
    });

    this.alertCtrl.create({
      header: "Success",
      message: "Pallet Profile successfully created.",
      buttons: [{
        text: "OK",
        role: "cancel",
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    }).then(alert => alert.present());
  }

}
