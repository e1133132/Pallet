import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ModalController } from "@ionic/angular";
import { HireOrderProvider } from "../../providers/hire-order/hire-order";

@Component({
  selector: 'hire-order-context-menu',
  templateUrl: 'hire-order-context-menu.html'
})
export class HireOrderContextMenuComponent {

  hireOrder;

  constructor(private modalCtrl: ModalController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private hireOrderProvider: HireOrderProvider,
              private alertCtrl: AlertController) {

    console.log('Hello HireOrderContextMenuComponent Component');
    this.hireOrder = this.navParams.get("hireOrder");
  }

  async deleteHireOrder(hireOrderId) {
    const alert = await this.alertCtrl.create({
      header: 'Remove Hire Order?',
      message: 'Confirm removal of hire order? This action cannot be undone.',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.hireOrderProvider.deleteHireOrder(hireOrderId).then(result => {
              console.log(result);
            });
            this.modalCtrl.dismiss();
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await alert.present();
  }

  async releaseHO(hireOrderId) {
    if (this.hireOrder.Qty == 0) {
      const alert = await this.alertCtrl.create({
        header: "Please enter Quantity",
        message: "Please input the quantity before releasing the hire order.",
        buttons: [{
          text: "OK",
          role: "cancel",
          handler: () => {}
        }]
      });
      await alert.present();
    } else {
      const confirmAlert = await this.alertCtrl.create({
        header: "Please Confirm Release",
        message: "Do you want to proceed? This action cannot be reversed.",
        buttons: [
          {
            text: "Yes",
            handler: async () => {
              await this.hireOrderProvider.markHireOrderAsReleased(hireOrderId).then(async result => {
                const successAlert = await this.alertCtrl.create({
                  header: "Success!",
                  message: "Hire Order has been released",
                  buttons: [{
                    text: "OK",
                    handler: () => {
                      this.modalCtrl.dismiss();
                    }
                  }]
                });
                await successAlert.present();
              });
            }
          },
          {
            text: "No",
            role: "cancel",
            handler: () => {
              this.modalCtrl.dismiss();
            }
          }
        ]
      });
      await confirmAlert.present();
    }
  }
}
