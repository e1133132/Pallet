import { Component } from '@angular/core';
import {AlertController, App, ModalController, NavController, NavParams, ViewController} from "ionic-angular";
import {CustomerContactsProvider} from "../../providers/customer-contacts/customer-contacts";
import {CustomerContactsModalEditComponent} from "../customer-contacts-modal-edit/customer-contacts-modal-edit";
import {CustomerManageContactsEditPage} from "../../pages/customer-manage-contacts-edit/customer-manage-contacts-edit";

/**
 * Generated class for the CustomerContactsContextMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'customer-contacts-context-menu',
  templateUrl: 'customer-contacts-context-menu.html'
})
export class CustomerContactsContextMenuComponent {

  customerContact: any;

  constructor(private viewCtrl: ViewController,
              private navCtrl:NavController,
              private navParams:NavParams,
              private custContactsProvider:CustomerContactsProvider,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private app: App) {
    console.log('Hello CustomerContactsContextMenuComponent Component');

    this.customerContact = this.navParams.get("custContact");

  }

  goToEditContact() {

    this.viewCtrl.dismiss();
    console.log("CC CONTEXT MENU: "+this.customerContact);

    this.app.getRootNav().push("CustomerManageContactsEditPage", {customerContact: this.customerContact});

    // let profileModal = this.modalCtrl.create(CustomerContactsModalEditComponent, { customerContact: this.customerContact });
    // profileModal.onDidDismiss(data => {
    //   console.log(data);
    // });
    // profileModal.present();
  }

  removeContact() {
    let alert = this.alertCtrl.create({
      title: 'Remove Contact',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.custContactsProvider.deleteCustomerContact(this.customerContact.CustomerContacts_ID).then(res=> {
              this.viewCtrl.dismiss();
              let successAlert = this.alertCtrl.create({
                title: 'Success!',
                subTitle: 'Customer Contact has been removed',
                buttons: ['OK']
              });
              successAlert.present();
            })
          }
        }
      ]
    });
    alert.present();

  }

}
