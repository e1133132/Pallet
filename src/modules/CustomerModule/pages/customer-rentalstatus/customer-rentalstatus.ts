import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from '@ionic/angular';
import {RentalStatusProvider} from "../../../../providers/rental-status/rental-status";
import {PalletProfileProvider} from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import {PaginationData} from "../../../../shared/template-models/template-models";

/**
 * Generated class for the CustomerRentalstatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-rentalstatus',
  templateUrl: 'customer-rentalstatus.html',
})
export class CustomerRentalstatusPage {

  customerChosen;
  customerRentalStatus;
  palletTypes;
  paginationData: PaginationData;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private rentalStatusProvider: RentalStatusProvider,
              private palletProfileProvider: PalletProfileProvider,
              private platform: Platform) {

    this.paginationData = {
      showPagination: true,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 1000
    }

    this.customerChosen= this.navParams.get("customer");

    Promise.all([
      this.rentalStatusProvider.getRentalStatusByCustomerId(this.customerChosen.customer_ID),
      this.palletProfileProvider.getAllPalletProfiles()]).then(values => {
      this.customerRentalStatus = values[0];
      this.palletTypes=values[1];
    });


    //
    // this.rentalStatusProvider.getRentalStatusByCustomerId(this.customerChosen.customer_ID).then(result => {
    //   this.customerRentalStatus=result;
    //
    //   this.palletProfileProvider.getAllPalletProfiles().then(result => {
    //     this.palletTypes=result;
    //   });
    //
    // });

    console.log(this.customerRentalStatus);
    console.log(this.palletTypes);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerRentalstatusPage');

  }

  getPalletType(palletId) {
    if(palletId!=null ) {

      for (let pallet of this.palletTypes) {
        if (pallet.Pallet_Profile_ID == palletId) {
          console.log(pallet.Pallet_Type);
          return pallet.Pallet_Type;
        }
      }
    }
    return null;
  }

  ionViewWillEnter() {


  }

}
