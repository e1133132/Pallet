import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import {IssueNoteProvider} from "../../../IssueNoteModule/providers/issue-note/issue-note";
import {DatePipe} from "@angular/common";

/**
 * Generated class for the HireOrderLinkedIssueOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hire-order-linked-issue-order',
  templateUrl: 'hire-order-linked-issue-order.html',
})
export class HireOrderLinkedIssueOrderPage {

  hireOrderId;
  issueNotesOfHireOrder;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private issueNoteProvider: IssueNoteProvider) {
    this.hireOrderId = this.navParams.get("hireOrderId");
    // this.issueNoteProvider.getIssueNoteOrdersFromHireOrderId(this.hireOrderId).then(data => {
    //   this.issueNotesOfHireOrder=data;
    // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HireOrderLinkedIssueOrderPage');
  }

}
