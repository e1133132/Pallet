import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { RateChargeProvider } from "../../../../providers/rate-charge/rate-charge";
import { PalletProfileProvider } from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import { CustomerRatechargesContextMenuComponent } from "../../components/customer-ratecharges-context-menu/customer-ratecharges-context-menu";
import { CustomerRatechargesModalCreateComponent } from "../../components/customer-ratecharges-modal-create/customer-ratecharges-modal-create";

@Component({
  selector: 'page-customer-rate-charge',
  templateUrl: 'customer-rate-charge.html',
})
export class CustomerRateChargePage {

  customer;
  customerRateCharges;
  palletTypes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private rateChargeProvider: RateChargeProvider,
              private palletProfileProvider: PalletProfileProvider,
              private popOverCtrl: PopoverController,
              private modalCtrl: ModalController) {

    this.customer = this.navParams.get("customer");

    Promise.all([
      this.rateChargeProvider.getRateChargesOfOneCustomer(this.customer.customer_ID),
      this.palletProfileProvider.getAllPalletProfiles()
    ]).then(values => {
      this.customerRateCharges = values[0];
      this.palletTypes = values[1];
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerRateChargePage');
  }

  getPalletType(palletId) {
    if (palletId != null) {
      for (let pallet of this.palletTypes) {
        if (pallet.Pallet_Profile_ID == palletId) {
          return pallet.Pallet_Type;
        }
      }
    }
    return null;
  }

  async presentContextMenu(event, arrayIndex) {
    const popover = await this.popOverCtrl.create({
      component: CustomerRatechargesContextMenuComponent,
      componentProps: { 'chargeRate': this.customerRateCharges[arrayIndex] },
      cssClass: 'custom-customer-popover'
    });

    await popover.present();  // 使用 await 来处理 popover 的 present
  }

  async goToCreateRateCharge() {
    const profileModal = await this.modalCtrl.create({
      component: CustomerRatechargesModalCreateComponent,
      componentProps: { custId: this.customer.customer_ID }
    });

    profileModal.onDidDismiss().then((data) => {
      console.log(data);
    });

    await profileModal.present();  // 使用 await 来处理 modal 的 present
  }

  doRefresh(refresher) {
    setTimeout(() => {
      Promise.all([
        this.rateChargeProvider.getRateChargesOfOneCustomer(this.customer.customer_ID),
        this.palletProfileProvider.getAllPalletProfiles()
      ]).then(values => {
        this.customerRateCharges = values[0];
        this.palletTypes = values[1];
      });

      console.log('refresh CustomerHomePage');
      refresher.complete();
    }, 2000);
  }
}
