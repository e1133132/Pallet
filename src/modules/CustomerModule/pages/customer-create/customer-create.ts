import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {CustomerProvider} from "../../providers/customer/customer";
import {SettingsProvider} from "../../../../providers/settings/settings";

/**
 * Generated class for the CustomerCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//TODO to add in Profile CustomerID Information when its out to add into creator column

@Component({
  selector: 'page-customer-create',
  templateUrl: 'customer-create.html',
})
export class CustomerCreatePage {

  private createCustomerForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private custProvider:CustomerProvider,
              private alertCtrl: AlertController) {
    this.createCustomerForm = this.formBuilder.group({
      Customer_Name:['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Customer_Code: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Business_Type: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Credit_Terms: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Address:['',Validators.compose([Validators.maxLength(255), Validators.required])],
      GLN_Code: ['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Currency: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      GST: ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],    //regex for only +ve numbers
      status: ['',Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCreatePage');
  }

  async CreateCustomer(formData) {
    console.log(formData);
    await this.custProvider.postCreateNewCustomer(formData);
    this.navCtrl.pop();
  
    let successAlert = await this.alertCtrl.create({
      header: 'Success!',
      message: 'Customer has been added',
      buttons: ['OK']
    });
    await successAlert.present();
  }

}
