import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams, Platform, PopoverController} from '@ionic/angular';
import {PalletProfileProvider} from "../../providers/pallet-profile/pallet-profile";
import {PalletProfileMgmtPage} from "../pallet-profile-mgmt/pallet-profile-mgmt";
import {PalletProfileContextMenuHomeComponent} from "../../components/pallet-profile-context-menu-home/pallet-profile-context-menu-home";
import {PalletProfileCreatePage} from "../pallet-profile-create/pallet-profile-create";
import {SettingsProvider} from "../../../../providers/settings/settings";

/**
 * Generated class for the PalletProfileHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pallet-profile-home',
  templateUrl: 'pallet-profile-home.html',
})
export class PalletProfileHomePage {

  allPalletProfiles;
  @ViewChild('palletProfileSearchBar') palletProfileSearchBar: HTMLInputElement;
  isPalletProfileNotChecked:boolean = true;
  checkedPalletProfile;
  checkedPalletProfilePalletType:string;
  @ViewChild("palletProfileCheckBox") palletProfileCheckBox: HTMLSelectElement;
  selectedTheme:String;

  ppTableOrderedCol: { name: string, isDescending: boolean, id: string } = {
    name: 'Pallet Type',
    isDescending: true,
    id: 'Pallet_Type'
  };

  palletProfilePaginationData = {
    showPagination: true,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 10
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private palletProfileProvider: PalletProfileProvider,
              public popOverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public platform: Platform,
              private settings: SettingsProvider) {

    this.settings.getActiveTheme().subscribe(val => {
      this.selectedTheme = val;
    });
  }

  ionViewWillEnter() {
    this.loadSearchOrderArrangeData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PalletProfileHomePage');
  }

  createPalletProfile() {
    this.navCtrl.navigateForward('/pallet-profile-create');
  }

  loadSearchOrderArrangeData(event?) {
    let searchTerms = this.palletProfileSearchBar.value.toString();
    this.isPalletProfileNotChecked = true;
    if (searchTerms!=null) {
      this.palletProfilePaginationData.currentPage=0;
    }

    Promise.all([this.palletProfileProvider.getAllPalletProfilesPaginatedOrderedSearched(
                                                this.palletProfilePaginationData.currentPage,
                                                this.palletProfilePaginationData.currentRowsPerPage,
                                                this.ppTableOrderedCol.id,
                                                this.ppTableOrderedCol.isDescending,searchTerms)]).then(values => {
        this.allPalletProfiles = values[0].data;
        this.palletProfilePaginationData.totalRow = values[0].paging.TotalRecordCount;
    });

  }

  isChecked(palletProfile):boolean {
    return !this.checkedPalletProfile;
  }

  onPalletProfileClick(palletProfile) {
    this.navCtrl.navigateForward('/pallet-profile-mgmt', { state: { palletProfile: palletProfile } });
  }

  openActionPanel(checkbox, palletProfile) {
    if(checkbox.checked) {
      if(this.isPalletProfileNotChecked) {
        this.checkedPalletProfile=palletProfile;
        this.checkedPalletProfilePalletType = this.checkedPalletProfile.Pallet_Type;
        this.isPalletProfileNotChecked=false;
      }
    }
    else {
      if(!this.isPalletProfileNotChecked) {
        this.checkedPalletProfile=null;
        this.checkedPalletProfilePalletType = "Pallet Type";
        this.isPalletProfileNotChecked=true;
      }
    }
  }

  openPalletProfileContextMenu(event) {
    this.popOverCtrl.create({
      component: PalletProfileContextMenuHomeComponent,
      componentProps: {'palletProfile': this.checkedPalletProfile},
      cssClass: this.selectedTheme + ' custom-customer-popover',
      event: event
    }).then(popover => {
      popover.present();
      return popover.onDidDismiss();
    }).then(result => {
      this.loadSearchOrderArrangeData();
      this.isPalletProfileNotChecked = true;
    });
  }





}
