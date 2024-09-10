import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ModalController} from "@ionic/angular";

/**
 * Generated class for the HireOrderCreateSelectCustomerPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'hire-order-create-select-customer-popover',
  templateUrl: 'hire-order-create-select-customer-popover.html'
})
export class HireOrderCreateSelectCustomerPopoverComponent {

@ViewChild("hireOrderCustSearchBar") hireOrderCustSearchBar:HTMLInputElement;
allCustomers;
allCustomersCopy;   //forSearch

  constructor(public navCtrl:NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
    console.log('Hello HireOrderCreateSelectCustomerPopoverComponent Component');
    this.allCustomers = this.navParams.get("customers");
    this.allCustomersCopy = this.navParams.get("customers");    //forSearch
  }

  searchCustomerNames(hireOrderCustSearchBar): void {
    this.allCustomers  = this.allCustomersCopy;   //re-initialising data everytime the searchBar clears

    var searchTerms = hireOrderCustSearchBar.srcElement.value;

    if(!searchTerms) {
      return;
    }

    this.allCustomers = this.allCustomers.filter(incoming => {
      if( incoming.Customer_Name && incoming.Customer_Name.toLowerCase().indexOf(searchTerms.toLowerCase())>-1) {
        return true;
      }
      return false;
    });
  }

  sendCustomerAndClose(customer) {
    if(customer) {
      this.modalCtrl.dismiss(customer);
    }
    else {
      this.modalCtrl.dismiss();
    }
  }

}
