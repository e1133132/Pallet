import { Component, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavController, NavParams, Platform, PopoverController } from '@ionic/angular';
import { HireOrderProvider } from "../../providers/hire-order/hire-order";
import { PalletProfileProvider } from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import { CustomerProvider } from "../../../CustomerModule/providers/customer/customer";
import { HireOrderContextMenuComponent } from "../../components/hire-order-context-menu/hire-order-context-menu";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'page-hire-order-home',
  templateUrl: 'hire-order-home.html',
})
export class HireOrderHomePage {

  allHireOrders;
  allHireOrdersCopy;
  @ViewChild('hireOrderSearchBar') hireOrderSearchBar: HTMLInputElement;
  isHireOrderNotChecked: boolean = true;
  hoHireOrder = "Hire Order";
  checkedHiredOrder;
  @ViewChild("hireOrderCheckBox") hireOrderCheckBox: HTMLSelectElement;

  paginationDataHO = {
    showPagination: true,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 1000
  };

  hoTableOrderedCol: { name: string, isDescending: boolean, id: string } = {
    name: 'Hire_Order_No',
    isDescending: false,
    id: 'Hire_Order_No'
  };

  ionViewWillEnter() {
    this.hireOrderSearchBar.value = "";
    this.isHireOrderNotChecked = true;
    this.loadHireOrders();
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private hireOrderProvider: HireOrderProvider,
              private palletProvider: PalletProfileProvider,
              private customerProvider: CustomerProvider,
              private modalCtrl: ModalController,
              private popOverCtrl: PopoverController,
              private platform: Platform,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HireOrderHomePage');
  }

  async loadHireOrders() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Data. Please wait...'
    });
    await loading.present();

    try {
      let searchTerms = this.hireOrderSearchBar.value.toString();
      this.paginationDataHO.currentPage = 0;
      this.isHireOrderNotChecked = true;

      const result = await this.hireOrderProvider.getAllHireOrdersWithPaginationOrderable(
        this.paginationDataHO.currentPage,
        this.paginationDataHO.currentRowsPerPage,
        this.hoTableOrderedCol.id,
        this.hoTableOrderedCol.isDescending,
        searchTerms
      );

      this.allHireOrders = result.data;
      this.paginationDataHO.totalRow = result.paging.TotalRecordCount;
    } finally {
      await loading.dismiss(); // Dismiss the loading indicator
    }
  }

  onChangePaginationOrColumnHO(event) {
    let searchTerms = this.hireOrderSearchBar.value.toString();

    this.isHireOrderNotChecked = true;
    this.hireOrderProvider.getAllHireOrdersWithPaginationOrderable(
      this.paginationDataHO.currentPage,
      this.paginationDataHO.currentRowsPerPage,
      this.hoTableOrderedCol.id,
      this.hoTableOrderedCol.isDescending,
      searchTerms
    ).then(data => {
      this.allHireOrders = data.data;
      this.paginationDataHO.totalRow = data.paging.TotalRecordCount;
    });
  }

  isChecked(hireOrder): boolean {
    return !this.checkedHiredOrder;
  }

  onHireOrderClick(hireOrder) {
    this.navCtrl.navigateForward("HireOrderMgmtPage", { queryParams: { hireOrder } });
  }

  openActionPanel(checkbox, hireOrder) {
    if (checkbox.checked) {
      if (this.isHireOrderNotChecked) {
        this.checkedHiredOrder = hireOrder;
        this.hoHireOrder = this.checkedHiredOrder.Hire_Order_No;
        this.isHireOrderNotChecked = false;
      }
    } else {
      if (!this.isHireOrderNotChecked) {
        this.checkedHiredOrder = null;
        this.hoHireOrder = "Hire Order";
        this.isHireOrderNotChecked = true;
      }
    }
  }

  goToCreateHireOrder() {
    this.navCtrl.navigateForward("HireOrderCreatePage");
  }

  searchHireOrders(event) {
    let searchTerms = this.hireOrderSearchBar.value.toString();
    this.paginationDataHO.currentPage = 0;

    this.hireOrderProvider.getAllHireOrdersWithPaginationOrderable(
      this.paginationDataHO.currentPage,
      this.paginationDataHO.currentRowsPerPage,
      this.hoTableOrderedCol.id,
      this.hoTableOrderedCol.isDescending,
      searchTerms
    ).then(result => {
      this.allHireOrders = result.data;  // paginated orderable list
      this.paginationDataHO.totalRow = result.paging.TotalRecordCount;
    });
  }

  async openHireOrderContextMenu(event) {
    const popover = await this.popOverCtrl.create({
      component: HireOrderContextMenuComponent,
      componentProps: {
        'hireOrder': this.checkedHiredOrder
      },
      cssClass: 'custom-customer-popover'
    });

    await popover.present();  // Use await for present

    const { data } = await popover.onDidDismiss();  // Use await for onDidDismiss

    if (data) {
      this.loadHireOrders();
    }
  }
}
