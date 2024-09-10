import { Component } from '@angular/core';
import {AlertController , NavController, NavParams, Platform} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerContactsProvider} from "../../providers/customer-contacts/customer-contacts";
import {CustomerProvider} from "../../providers/customer/customer";
import {PaginationData} from "../../../../shared/template-models/template-models";

/**
 * Generated class for the CustomerManageContactsCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-manage-contacts-create',
  templateUrl: 'customer-manage-contacts-create.html',
})
export class CustomerManageContactsCreatePage {

  customer;
  createCustomerContactForm: FormGroup;
  paginationData: PaginationData;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private custProvider: CustomerProvider,
              private custContactProvider: CustomerContactsProvider,
              public platform: Platform,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController) {

   this.customer= this.navParams.get("customer");

    this.createCustomerContactForm = this.formBuilder.group({    //builds the form so that it can return as a JSON Patch (partial PUT)
      Name:['', Validators.compose([Validators.maxLength(255), Validators.required])], //[default_value,Validators to be used]
      Designation: ['', Validators.compose([Validators.maxLength(255)])],
      Office_No: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Handphone_No: ['', Validators.compose([Validators.maxLength(255)])],
      Fax_No:['',Validators.compose([Validators.maxLength(255)])],
      Email: ['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")])],
      Customer_ID: [''],
    });

      this.createCustomerContactForm.controls["Customer_ID"].setValue(this.customer.customer_ID);
      this.createCustomerContactForm.enable();

    this.paginationData = {
      showPagination: false,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 0
    }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerManageContactsCreatePage');
  }

  async createCustomerContact(formData) {
    await this.custContactProvider.postCreateCustomerContact(JSON.stringify(formData)).then(result => {
      console.log("customer contact created.");
    });
  
    const successAlert = await this.alertCtrl.create({
      header: 'Success!',
      message: 'New Contact has been created',
      buttons: ['OK']
    });
    
    await successAlert.present();  // 使用 await 等待 alert 弹出
    this.navCtrl.pop();  // 返回到上一页
  }
  

  close() {
    this.navCtrl.pop();
  }

}
