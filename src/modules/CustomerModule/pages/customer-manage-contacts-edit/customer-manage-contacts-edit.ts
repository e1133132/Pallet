import { Component } from '@angular/core';
import {AlertController, Events, NavController, NavParams, Platform} from '@ionic/angular';
import {CustomerContactsProvider} from "../../providers/customer-contacts/customer-contacts";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaginationData} from "../../../../shared/template-models/template-models";
import {SettingsProvider} from "../../../../providers/settings/settings";

/**
 * Generated class for the CustomerManageContactsEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-customer-manage-contacts-edit',
  templateUrl: 'customer-manage-contacts-edit.html',
})
export class CustomerManageContactsEditPage {

  customerContact;
  editCustomerContactForm: FormGroup;
  paginationData: PaginationData;
  selectedTheme: String;


  constructor(private formBuilder:FormBuilder,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private custContactProvider: CustomerContactsProvider,
              public navCtrl: NavController,
              public platform: Platform,
              public event: Events,
              public settings: SettingsProvider) {

    this.settings.getActiveTheme().subscribe(val =>{
      this.selectedTheme=val;
    });

    this.customerContact=this.navParams.get("customerContact");
    console.log(this.customerContact);

    this.editCustomerContactForm = this.formBuilder.group({    //builds the form so that it can return as a JSON Patch (partial PUT)
      Name:['', Validators.compose([Validators.maxLength(255), Validators.required])], //[default_value,Validators to be used]
      Designation: ['', Validators.compose([Validators.maxLength(255)])],
      Office_No: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Handphone_No: ['', Validators.compose([Validators.maxLength(255)])],
      Fax_No:['',Validators.compose([Validators.maxLength(255)])],
      Email: ['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")])],
      Customer_ID: [''],
      CustomerContacts_ID: ['']
    });

    this.editCustomerContactForm.controls["Name"].setValue(this.customerContact.Name);
    this.editCustomerContactForm.controls["Designation"].setValue(this.customerContact.Designation);
    this.editCustomerContactForm.controls["Office_No"].setValue(this.customerContact.Office_No);
    this.editCustomerContactForm.controls["Handphone_No"].setValue(this.customerContact.Handphone_No);
    this.editCustomerContactForm.controls["Fax_No"].setValue(this.customerContact.Fax_No);
    this.editCustomerContactForm.controls["Email"].setValue(this.customerContact.Email);
    this.editCustomerContactForm.controls["CustomerContacts_ID"].setValue(this.customerContact.CustomerContacts_ID);
    this.editCustomerContactForm.enable();

    this.paginationData = {
      showPagination: false,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 0
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerManageContactsEditPage');
  }

  async editCustomerContact(formData) {
    const alert = await this.alertCtrl.create({
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
            console.log('Confirm clicked');
  
            await this.custContactProvider.editCustomerContact(JSON.stringify(formData)).then(res => {
              this.eventService.publish('reload');
              this.navCtrl.pop();
            });
  
            const successAlert = await this.alertCtrl.create({
              header: 'Success!',
              message: 'Customer Contact has been edited',
              buttons: ['OK']
            });
  
            await successAlert.present();  // 使用 await 等待 alert 弹出
          }
        }
      ]
    });
  
    await alert.present();  // 使用 await 等待 alert 弹出
  }

  close() {
    this.navCtrl.pop();
  }


}
