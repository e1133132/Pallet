import { Component } from '@angular/core';
import { AlertController, NavParams, ModalController } from "@ionic/angular";
import { RetrieveNoteProvider } from "../../providers/retrieve-note/retrieve-note";
import { ApiURL } from "../../../../shared/ApiURL";

@Component({
  selector: 'retrieve-note-context-menu-home',
  templateUrl: 'retrieve-note-context-menu-home.html'
})
export class RetrieveNoteContextMenuHomeComponent {

  retrieveNote;
  selectedTheme: String;

  constructor(public navParams: NavParams,
              private modalCtrl: ModalController,
              private retrieveNoteProvider: RetrieveNoteProvider,
              private alertCtrl: AlertController,
              private api: ApiURL) {
    this.retrieveNote = this.navParams.get("retrieveNote");
  }

  async deleteRetrieveNote() {
    let confirmAlert = await this.alertCtrl.create({
      header: "Confirm Remove Retrieve Note?",
      message: "Are you sure? This action cannot be undone.",
      buttons: [{
        text: "Yes",
        role: "cancel",
        handler: async () => {
          await this.retrieveNoteProvider.deleteRetrieveNote(this.retrieveNote.Retrieve_Note_ID);
          let alert = await this.alertCtrl.create({
            header: "Retrieve Note Removed.",
            message: "The selected Retrieve Note has been removed.",
            buttons: [{
              text: "OK",
              role: "cancel",
              handler: () => {
                this.modalCtrl.dismiss();
              }
            }]
          });
          await alert.present();
        }
      }, {
        text: "No",
        role: "cancel"
      }]
    });

    await confirmAlert.present();
  }

  async generateXLOfRetrieveNote() {
    const data = await this.retrieveNoteProvider.getPdfOfRetrieveNote(this.retrieveNote);
    var blob = new Blob([data], { type: 'application/pdf' });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = this.api.getIsSGDb() ? 
      "SG_" + this.retrieveNote.Retrieve_Note_No + ".pdf" :
      "MY_" + this.retrieveNote.Retrieve_Note_No + ".pdf";
    link.click();
  }

  async acknowledgeRN() {
    let acknowledgeAlert = await this.alertCtrl.create({
      header: "Confirm Quantity of Retrieve Note",
      inputs: [{
        name: "confirmQty",
        placeholder: "Please enter confirmed Quantity of Retrieve Note",
        value: this.retrieveNote.Qty,
      }],
      buttons: [{
        text: "Acknowledge",
        role: "cancel",
        handler: async (data) => {
          if (data.confirmQty < 1 || data.confirmQty > 50000) {
            let failAlert = await this.alertCtrl.create({
              header: "Quantity Exceeded.",
              message: "Please try again with a value more than 1 and less than 50,000.",
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await failAlert.present();
          } else {
            await this.retrieveNoteProvider.acknowledgeRetrieveNote(this.retrieveNote.Retrieve_Note_ID, data.confirmQty);
            let successAlert = await this.alertCtrl.create({
              header: "Success!",
              message: "Quantity has been amended and Retrieve Note has been successfully acknowledged.",
              buttons: [{ text: "Ok", role: "cancel", handler: () => this.modalCtrl.dismiss() }]
            });
            await successAlert.present();
          }
        }
      }, {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          this.modalCtrl.dismiss();
        }
      }]
    });

    await acknowledgeAlert.present();
  }

  async undoAcknowledgeRN() {
    let alert = await this.alertCtrl.create({
      header: "Confirm Undo of Acknowledgement of Retrieve Note?",
      message: "Please confirm this action as it cannot be undone.",
      buttons: [{
        text: "Confirm",
        role: "cancel",
        handler: async () => {
          await this.retrieveNoteProvider.undoAcknowledgeRetrieveNote(this.retrieveNote.Retrieve_Note_ID);
          this.modalCtrl.dismiss();
        }
      }, {
        text: "Cancel",
        role: "cancel"
      }]
    });

    await alert.present();
  }
}
