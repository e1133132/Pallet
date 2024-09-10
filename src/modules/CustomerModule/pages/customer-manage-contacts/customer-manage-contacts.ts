import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, Platform, PopoverController} from '@ionic/angular';
import {CustomerContactsProvider} from "../../providers/customer-contacts/customer-contacts";
import {CustomerContactsContextMenuComponent} from "../../components/customer-contacts-context-menu/customer-contacts-context-menu";
import {CustomerContactsModalCreateComponent} from "../../components/customer-contacts-modal-create/customer-contacts-modal-create";
import {PaginationData} from "../../../../shared/template-models/template-models";

/**
 * Generated class for the CustomerManageContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-manage-contacts',
  templateUrl: 'customer-manage-contacts.html',
})
export class CustomerManageContactsPage {

  customer;
  customerContacts: any[]=[];
  paginationData: PaginationData;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private custContactProvider: CustomerContactsProvider,
              private popOverCtrl: PopoverController,
              private modalCtrl: ModalController,
              public platform:Platform) {

    this.paginationData = {
      showPagination: true,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 1000
    }

    this.customer = this.navParams.get("customer");
    this.custContactProvider.getCustomerContactsOfOneCustomer(this.customer.customer_ID).then(result =>{
      this.customerContacts=result;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerManageContactsPage');
  }

  async showContactOptions(event, arrayIndex) {
    const popover = await this.popOverCtrl.create({
      component: CustomerContactsContextMenuComponent,
      componentProps: {'custContact': this.customerContacts[arrayIndex]},
      cssClass: 'custom-customer-popover'
    });
    await popover.present();
  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.custContactProvider.getCustomerContactsOfOneCustomer(this.customer.customer_ID).then(result =>{
        this.customerContacts=result;
      })
      console.log('refresh CustomerHomePage');
      refresher.complete();
    }, 2000);
  }

  async goToCreateCustomerContact() {
    console.log(this.customer.customer_ID);
    
    const profileModal = await this.modalCtrl.create({
      component: CustomerContactsModalCreateComponent,
      componentProps: {custId: this.customer.customer_ID},
      cssClass: "update-profile-modal"
    });
    
    profileModal.onDidDismiss().then((data) => {
      console.log(data);
    });
  
    await profileModal.present();
  }
  

}
