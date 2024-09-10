import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams} from '@ionic/angular';
import {CustomerProvider} from "../../providers/customer/customer";

/**
 * Generated class for the CustomerTotalHiredQtyByDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-total-hired-qty-by-date',
  templateUrl: 'customer-total-hired-qty-by-date.html',
})
export class CustomerTotalHiredQtyByDatePage {

  totalHiredQtyByCustomersByDate;
  @ViewChild("dateChosen") dateChosen: HTMLInputElement;
  dt;
  dateTime;

  constructor(public navCtrl: NavController, public navParams: NavParams, private custProvider: CustomerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerTotalHiredQtyByDatePage');
  }

  generateTotalHiredQtyReport() {
    // console.log(this.dateChosen.value);
    // this.dateTime=this.dateChosen.value;
    // this.dt = new Date(this.dateTime.year,this.dateTime.month, this.dateTime.day).toISOString();
    // console.log(this.dt);
    //   this.custProvider.getTotalHiredQtyofCustomersByDate(this.dateTime).then(result => {
    //     this.totalHiredQtyByCustomersByDate=result;
    //   });
  }

}
