import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, Platform} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerProvider} from "../../providers/customer/customer";
import {CustomerManageContactsPage} from "../customer-manage-contacts/customer-manage-contacts";

/**
 * Generated class for the CustomerEditinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-customer-editinfo',
  templateUrl: 'customer-editinfo.html',
})
export class CustomerEditinfoPage {

  customer: any;
  private editCustomerForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private custProvider: CustomerProvider,
              private modalCtrl: ModalController,
              private platform: Platform) {

    this.customer = this.navParams.get("customerChosen");


    this.editCustomerForm = this.formBuilder.group({    //builds the form so that it can return as a JSON Patch (partial PUT)
      customer_ID: [''],
      Customer_Name:['', Validators.compose([Validators.maxLength(255), Validators.required])], //[default_value,Validators to be used]
      Customer_Code: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Business_Type: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Credit_Terms: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Address:['',Validators.compose([Validators.required])],
      GLN_Code: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Currency: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      GST: ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.pattern('^[0-9]\\d*(\\.\\d+)?$')])], //regex for only +ve numbers
      status: ['']
    });

    this.editCustomerForm.controls["customer_ID"].setValue(this.customer.customer_ID);
    this.editCustomerForm.controls["status"].setValue(this.customer.status);
    this.editCustomerForm.enable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerEditinfoPage');
    console.log(this.customer);



  }

  async EditCustomer(formData) {
    console.log("formData: " + JSON.stringify(formData));
    
    let alert = await this.alertCtrl.create({
      header: 'Confirm Changes',
      message: 'Confirm All Changes?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            console.log('Buy clicked'); //do JSON Patch here
            
            await this.custProvider.editCustomer(JSON.stringify(formData));
            this.navCtrl.pop();
            
            let successAlert = await this.alertCtrl.create({
              header: 'Success!',
              message: 'Customer has been edited',
              buttons: ['OK']
            });
            await successAlert.present();
          }
        }
      ]
    });
    await alert.present();
  }
  
  close() {
    this.navCtrl.navigateRoot('/');  // 使用 navigateRoot 代替 popToRoot
  }
  
  goToCustomerContact() {
    this.navCtrl.navigateForward('CustomerManageContactsPage', { state: { custId: this.customer.customer_ID } });  // 使用 navigateForward 代替 push
  }
  

}
