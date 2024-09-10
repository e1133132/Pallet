import { Component } from '@angular/core';
import {AlertController, NavParams} from "@ionic/angular";
import {PalletProfileProvider} from "../../providers/pallet-profile/pallet-profile";
import { PopoverController } from "@ionic/angular";
/**
 * Generated class for the PalletProfileContextMenuHomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pallet-profile-context-menu-home',
  templateUrl: 'pallet-profile-context-menu-home.html'
})
export class PalletProfileContextMenuHomeComponent {

  palletProfile;

  constructor(
    public navParams: NavParams,
    private popoverController: PopoverController,
    private palletProfileProvider: PalletProfileProvider,
    private alertCtrl: AlertController,
  ) {
    console.log('Hello PalletProfileContextMenuHomeComponent Component');
    this.palletProfile = this.navParams.data.palletProfile;
  }

  async deletePalletProfile() {
    const alert = await this.alertCtrl.create({
      header: "Confirmation of Removal",
      message: "Are you sure? This action cannot be undone.",
      buttons: [{
        text: "Yes",
        role: "cancel",
        handler: async () => {
          await this.palletProfileProvider.deletePalletProfile(this.palletProfile.Pallet_Profile_ID);
          const successAlert = await this.alertCtrl.create({
            header: "Success!",
            message: "Pallet Profile has been removed.",
            buttons: [{text: "OK", role: "cancel", handler: () => { this.popoverController.dismiss(); }}]
          });
          await successAlert.present();
        }
      }, {
        text: "No",
        role: "cancel"
      }]
    });
    await alert.present();
  }

  async replenishStock() {
    const getAmtAlert = await this.alertCtrl.create({
      header: "Add Stock",
      message: "Please indicate number of stock to add to " + this.palletProfile.Pallet_Type + ".",
      inputs: [{
        name: "input",
        placeholder: "Number",
        type: "number"
      }],
      buttons: [{
        text: "OK",
        role: "cancel",
        handler: async (data) => {
          const result = await this.palletProfileProvider.addToStock(this.palletProfile.Pallet_Profile_ID, data.input);
          const successAlert = await this.alertCtrl.create({
            header: "Success",
            message: "Stock has been added. The current stock is now " + result,
            buttons: [{
              text: "OK",
              role: "cancel",
              handler: () => {
                this.popoverController.dismiss();
              }
            }]
          });
          await successAlert.present();
        }
      }, {
        text: "Cancel",
        role: "cancel"
      }]
    });
    await getAmtAlert.present();
  }

}
