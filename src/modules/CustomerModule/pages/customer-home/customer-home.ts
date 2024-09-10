import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { CustomerProvider } from "../../providers/customer/customer";
import { PopoverController } from "@ionic/angular";
import { CustomerContextMenuComponent } from "../../components/customer-context-menu/customer-context-menu";
import { CustomerContactsProvider } from "../../providers/customer-contacts/customer-contacts";
import { RentalStatusProvider } from "../../../../providers/rental-status/rental-status";
import { PalletProfileProvider } from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import { PaginationData } from "../../../../shared/template-models/template-models";
import { ApiURL } from "../../../../shared/ApiURL";

@Component({
  selector: 'page-customer-home',
  templateUrl: 'customer-home.html',
})
export class CustomerHomePage {

  customers: any[];
  customersData: any[];
  @ViewChild('customerSearchBar') customerSearchBar: HTMLInputElement;
  customerContact: any;
  customerRentalStatus: any;
  isCustomerNotChecked: boolean = true;
  checkedCustomer: any;
  apCustName = "Customer";
  @ViewChild("customerCheckBox") customerCheckBox: HTMLInputElement;
  paginationData: PaginationData;

  ionViewWillEnter() {
    console.log("ivWE");
    this.getAllCustomersData();
    this.isCustomerNotChecked = true;
    this.customerSearchBar.value = "";
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private custProvider: CustomerProvider,
    private popOverCtrl: PopoverController,
    private custContactProvider: CustomerContactsProvider,
    private rentalStatusProvider: RentalStatusProvider,
    private palletProfileProvider: PalletProfileProvider,
    public platform: Platform,
    private api: ApiURL
  ) {
    this.paginationData = {
      showPagination: true,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 1000
    };
  }

  async presentContextMenu(event) {
    let popover = await this.popOverCtrl.create({
      component: CustomerContextMenuComponent,
      componentProps: { customer: this.checkedCustomer },
      cssClass: 'custom-customer-popover'
    });

    const { data } = await popover.onDidDismiss();
    this.getAllCustomersData();
    this.isCustomerNotChecked = true;

    await popover.present();
  }

  createCustomer() {
    this.navCtrl.navigateForward('CustomerCreatePage');
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getAllCustomersData();
      this.isCustomerNotChecked = true;
      this.customerCheckBox.checked = false;
      console.log('refresh CustomerHomePage');
      refresher.complete();
    }, 2000);
  }

  goToCustomerContact(cust) {
    this.navCtrl.navigateForward('CustomerManageContactsPage', { state: { custId: cust.customer_ID } });
  }

  onCustomerClick(cust) {
    this.navCtrl.navigateForward('CustomerMgmtPage', { state: { customer: cust } });
  }
}
