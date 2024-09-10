import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, NavController, NavParams, Platform, ModalController } from "@ionic/angular";
import { CustomerContactsProvider } from "../../providers/customer-contacts/customer-contacts";

@Component({
  selector: 'customer-contacts-modal-edit',
  templateUrl: 'customer-contacts-modal-edit.html'
})
export class CustomerContactsModalEditComponent {

  editCustomerContactForm: FormGroup;
  customerContact: any;

  constructor(
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private custContactProvider: CustomerContactsProvider,
    private navCtrl: NavController,
    private modalCtrl: ModalController,  // 替换 ViewController 为 ModalController
    public platform: Platform
  ) {
    console.log('Hello CustomerContactsModalEditComponent Component');

    this.customerContact = this.navParams.get("customerContact");

    this.editCustomerContactForm = this.formBuilder.group({
      Name: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Designation: ['', Validators.compose([Validators.maxLength(255)])],
      Office_No: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Handphone_No: ['', Validators.compose([Validators.maxLength(255)])],
      Fax_No: ['', Validators.compose([Validators.maxLength(255)])],
      Email: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
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
  }

  async editCustomerContact(formData) {
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
            console.log('Changes confirmed');
            await this.custContactProvider.editCustomerContact(JSON.stringify(formData));
            this.navCtrl.pop();

            let successAlert = await this.alertCtrl.create({
              header: 'Success!',
              subHeader: 'Customer Contact has been edited',
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
    this.modalCtrl.dismiss();  // 使用 ModalController 关闭模态
  }

}
