import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ModalController } from "@ionic/angular";
import { CustomerContactsProvider } from "../../providers/customer-contacts/customer-contacts";
import { RateChargeProvider } from "../../../../providers/rate-charge/rate-charge";
import { SettingsProvider } from "../../../../providers/settings/settings";

@Component({
  selector: 'customer-ratecharges-context-menu',
  templateUrl: 'customer-ratecharges-context-menu.html'
})
export class CustomerRatechargesContextMenuComponent {

  chargeRate: any;
  palletTypes: any;

  constructor(
    private modalCtrl: ModalController,  // 替换 ViewController
    private navCtrl: NavController,      // 使用 NavController 导航
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private rateChargeProvider: RateChargeProvider,
    private settings: SettingsProvider
  ) {
    console.log('Hello CustomerRatechargesContextMenuComponent Component');
    this.chargeRate = this.navParams.get("chargeRate");
    this.palletTypes = this.navParams.get("palletTypes");
  }

  goToEditRateCharge() {
    this.modalCtrl.dismiss();  // 替换 viewCtrl.dismiss()

    this.navCtrl.navigateForward('CustomerRateChargeEditPage', { 
      state: { chargeRate: this.chargeRate, palletTypes: this.palletTypes }
    });
  }

  async removeRateCharge() {
    let alert = await this.alertCtrl.create({
      header: 'Remove Contact',
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
          handler: async () => {
            console.log('Yes clicked');
            await this.rateChargeProvider.deleteChargeRate(this.chargeRate.ChargeRate_ID);
            await this.modalCtrl.dismiss(1);  // 替换 viewCtrl.dismiss()
            let successAlert = await this.alertCtrl.create({
              header: 'Success!',
              message: 'Rate Charge has been removed',
              buttons: ['OK']
            });
            await successAlert.present();
          }
        }
      ]
    });
    await alert.present();
  }
}
