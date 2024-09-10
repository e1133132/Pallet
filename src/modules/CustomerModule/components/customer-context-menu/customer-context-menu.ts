import { Component } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from "@ionic/angular";
import { CustomerProvider } from "../../providers/customer/customer";
import { ApiURL } from "../../../../shared/ApiURL";
import { SettingsProvider } from "../../../../providers/settings/settings";
import { CustomerModalMonthlySummaryComponent } from "../customer-modal-monthly-summary/customer-modal-monthly-summary";

@Component({
  selector: 'customer-context-menu',
  templateUrl: 'customer-context-menu.html'
})
export class CustomerContextMenuComponent {

  customerId: any;
  customer: any;
  selectedTheme: String;
  dt: number;
  dtMinusOne: number;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private custProvider: CustomerProvider,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private api: ApiURL,
    private settings: SettingsProvider
  ) {
    this.customer = this.navParams.get("customer");
    this.dt = new Date().getFullYear();
    this.dtMinusOne = this.dt - 1;

    this.settings.getActiveTheme().subscribe(val => {
      this.selectedTheme = val;
    });
  }

  async goToEditInfo() {
    this.navCtrl.navigateForward('CustomerEditinfoPage', { state: { customerChosen: this.customer } });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async deleteCustomer() {
    let alert = await this.alertCtrl.create({
      header: 'Remove Customer',
      message: 'Are you sure? You might lose all other data related to this customer as well.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes, confirmed',
          handler: async () => {
            console.log('Yes clicked');
            await this.custProvider.deleteCustomer(this.customer.customer_ID);
            await this.navCtrl.pop();
          }
        }
      ]
    });
    await alert.present();
  }

  async goToRentalStatus() {
    this.navCtrl.navigateForward('CustomerRentalstatusPage', { state: { customer: this.customer } });
  }

  async goToRateCharge() {
    this.navCtrl.navigateForward('CustomerRateChargePage', { state: { customer: this.customer } });
  }

  async goToMonthlySummaryModal() {
    let profileModal = await this.modalCtrl.create({
      component: CustomerModalMonthlySummaryComponent,
      componentProps: { customer: this.customer },
      cssClass: this.selectedTheme + " update-profile-modal"
    });
    await profileModal.present();

    const { data } = await profileModal.onDidDismiss();
    console.log(data);
  }

  generateXLYearSummaryInvoice() {
    this.custProvider.getallQtyofInvoiceFromRentalCharges(this.customer.customer_ID, this.dtMinusOne).then(data => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      if (this.api.getIsSGDb() == true) {
        link.download = "SG_" + this.customer.Customer_Code + "_" + this.dtMinusOne + ".xlsx";
      } else {
        link.download = "MY_" + this.customer.Customer_Code + "_" + this.dtMinusOne + ".xlsx";
      }

      link.click();
    });
  }
}
