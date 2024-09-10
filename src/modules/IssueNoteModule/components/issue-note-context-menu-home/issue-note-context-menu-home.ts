import { Component } from '@angular/core';
import {AlertController, NavParams, ModalController} from "@ionic/angular";
import {IssueNoteProvider} from "../../providers/issue-note/issue-note";
import {ApiURL} from "../../../../shared/ApiURL";

/**
 * Generated class for the IssueNoteContextMenuHomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'issue-note-context-menu-home',
  templateUrl: 'issue-note-context-menu-home.html'
})
export class IssueNoteContextMenuHomeComponent {

  issueNote;
  constructor(public navParams: NavParams,
              public modalCtrl: ModalController,
              private issueNoteProvider: IssueNoteProvider,
              public alertCtrl: AlertController,
              private api: ApiURL) {

    console.log('Hello IssueNoteContextMenuHomeComponent Component');
    this.issueNote = this.navParams.get("issueNote");

  }

  async deleteIssueNote() {
    const confirmAlert = await this.alertCtrl.create({
      header:"Confirm Removal of Issue Note",
      message: "Are you sure? This action cannot be undone.",
      buttons: [{
        text: "Yes",
        role: "cancel",
        handler: async () => {
          if(this.issueNote.Status=="New") {
            await this.issueNoteProvider.deleteIssueNote(this.issueNote.Issue_Note_ID).then(result => {
              console.log(result);
            });
            const alert = await this.alertCtrl.create({
              header: "Success!",
              message: "Issue Note has been removed.",
              buttons: [{
                text: "OK",
                role:"cancel",
                handler: ()=> {}
              }]
            });
            await alert.present();
            this.modalCtrl.dismiss();
          }
          else {
            const alert = await this.alertCtrl.create({
              header: "Failed!",
              message: "Issue Note cannot be removed. Please ensure you are removing a new Issue Note.",
              buttons: [{
                text: "OK",
                role:"cancel",
                handler: ()=> {}
              }]
            });
            await alert.present();
          }
        }
      }, {
        text: "Cancel",
        role: "cancel",
        handler:()=>{}
      }]
    });

    await confirmAlert.present();
}


  generatePDFOfIssueNote() {
    this.issueNoteProvider.getPDFOfIssueNote(this.issueNote).then(data => {
      var blob = new Blob([data],
        {type:'application/pdf'},);

      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      if(this.api.getIsSGDb()==true) {
        link.download="SG_"+this.issueNote.Issue_Note_No+".pdf";    //filename
      }
      else {
        link.download="MY_"+this.issueNote.Issue_Note_No+".pdf";    //filename
      }
      link.click();
      // window.open(link.href);
    });

    //For Excel
    // this.issueNoteProvider.getXLOfIssueNote(this.issueNote).then(data => {
    //   var blob = new Blob([data],
    //     {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},);
    //
    //   var link=document.createElement('a');
    //   link.href=window.URL.createObjectURL(blob);
    //   if(this.api.getIsSGDb()==true) {
    //     link.download="SG_"+this.issueNote.Issue_Note_No+".xlsx";    //filename
    //   }
    //   else {
    //     link.download="MY_"+this.issueNote.Issue_Note_No+".xlsx";    //filename
    //   }
    //
    //   link.click();
    // });


  }

  async setIssueNoteToIssued() {
    await this.issueNoteProvider.setIssueNoteStatusFromNewToIssued(this.issueNote.Issue_Note_ID).then(async result => {
      const alert = await this.alertCtrl.create({
        header: "Success",
        message: "This Issue Note Status has been set to Issued",
        buttons: [{
          text: "OK",
          role: "cancel",
          handler: () => {
            this.modalCtrl.dismiss();
          }
        }]
      });
      await alert.present();
    });
}

async setIssueNoteToCompleted() {
    await this.issueNoteProvider.setIssueNoteStatusFromIssuedToCompleted(this.issueNote.Issue_Note_ID).then(async result => {
      console.log(result);
      if (result === "HOCompleted") {
        const alert = await this.alertCtrl.create({
          header: "Acknowledgement Success",
          message: "This Issue Note Status has been completed. The Hire Order has also been completed.",
          buttons: [{
            text: "OK",
            role: "cancel",
            handler: () => {
              this.modalCtrl.dismiss();
            }
          }]
        });
        await alert.present();
      } else {
        const alert = await this.alertCtrl.create({
          header: "Acknowledgement Success",
          message: "This Issue Note Status has been completed.",
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
    });
}


}
