import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, PopoverController} from 'ionic-angular';
// import {SoBulkActionPopoverPage} from "../../../modules/sales-order-module/pages/popover-pages/so-bulk-action-popover/so-bulk-action-popover";
// import {SalesOrderRepo} from "../../../models/salesOrder";

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  expended: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverController: PopoverController, public platform: Platform) {
  }

  ionViewDidLoad() {
  }

  // onExpend(){
  //   this.expended = !this.expended;
  // }
  //
  // onMoreActions(myEvent){
  //   let popover = this.popoverController.create(SoBulkActionPopoverPage);
  //   popover.present({
  //     ev: myEvent
  //   });
  //
  //   popover.onDidDismiss(data => {
  //     console.log(data);
  //   });
}

