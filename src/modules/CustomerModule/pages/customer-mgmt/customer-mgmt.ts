import {Component} from '@angular/core';
import {
  AlertController, LoadingController, ModalController, NavController, NavParams, Platform,
  PopoverController
} from '@ionic/angular';
import {PaginationData} from "../../../../shared/template-models/template-models";
import {CustomerContactsProvider} from "../../providers/customer-contacts/customer-contacts";
import {RentalStatusProvider} from "../../../../providers/rental-status/rental-status";
import {PalletProfileProvider} from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import {CustomerContactsContextMenuComponent} from "../../components/customer-contacts-context-menu/customer-contacts-context-menu";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerProvider} from "../../providers/customer/customer";
import {RateChargeProvider} from "../../../../providers/rate-charge/rate-charge";
import {CustomerRatechargesContextMenuComponent} from "../../components/customer-ratecharges-context-menu/customer-ratecharges-context-menu";
import {CustomerRateChargeCreatePage} from "../customer-rate-charge-create/customer-rate-charge-create";
import {CustomerManageContactsCreatePage} from "../customer-manage-contacts-create/customer-manage-contacts-create";
import {InvoiceProvider} from "../../../../providers/invoice/invoice";
import {DatePipe} from "@angular/common";
import { EventService } from "../../../../services/event.service";  // 替代 Events 服务

@Component({
  selector: 'page-customer-mgmt',
  templateUrl: 'customer-mgmt.html',
})
export class CustomerMgmtPage {
  // shared variables
  customer;
  paginationData: PaginationData;
  dt;
  dtMinusOne;
  palletTypes;

  // Manage Contacts Variables
  customerContacts: any[] = [];
  paginationDataManageContacts: PaginationData;

  // View Rental Status Variables
  customerRentalStatus: any[];
  paginationDataRentalStatus: PaginationData;

  // Edit Info Variables
  private editCustomerForm: FormGroup;

  // Rate Charge Variables
  paginationDataRateCharges: PaginationData;
  customerRateCharges: any[];

  // Monthly Summary Variables
  years = [];
  months = [];
  currentMonth;
  balanceFromLastMonth = 0;
  balanceThisMonth = 0;
  topCloseBalanceQtyInvoice;
  noOfDays;
  isYearandMthEntered = false;
  custBalanceQtys: number[] = [];
  allCustNotes;
  totalIssueQty = 0;
  totalRetrieveQty = 0;

  // Yearly Invoice Summary Variables
  totalInvAmt = 0;
  totalGSTAmt = 0;
  totalTotalAmt = 0;
  invoiceSummaryReportList;

  ionViewWillEnter() {
    console.log("ivWE MGMT");
    this.loadData();
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              private custContactProvider: CustomerContactsProvider,
              private popOverCtrl: PopoverController,
              private modalCtrl: ModalController,
              private rentalStatusProvider: RentalStatusProvider,
              private palletProfileProvider: PalletProfileProvider,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private custProvider: CustomerProvider,
              private rateChargeProvider: RateChargeProvider,
              private loadingCtrl: LoadingController,
              private invoiceProvider: InvoiceProvider,
              private eventService: EventService) {

    // 初始化分页配置
    this.paginationData = {
      showPagination: true,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 1000,
    };

    this.paginationDataManageContacts = {
      showPagination: true,
      rowsPerPage: [10, 20, 30, 40, 50],
      currentRowsPerPage: 10,
      currentPage: 0,
      totalRow: 1000,
    };

    this.customer = this.navParams.get("customer");

    this.dt = new Date().getFullYear();
    this.dtMinusOne = this.dt - 1;

    for (let i = 0; i < 5; i++) {
      this.years.push(this.dt - i);
    }

    this.currentMonth = new Date().getMonth();

    for (let i = 0; i < 12; i++) {
      this.months.push(1 + i);
    }

    this.eventService.subscribe('reload', data => {
      this.loadData();
    });

    this.editCustomerForm = this.formBuilder.group({
      customer_ID: [''],
      Customer_Name: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Customer_Code: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Business_Type: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Credit_Terms: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Address: ['', Validators.compose([Validators.required])],
      GLN_Code: ['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Currency: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      GST: ['', Validators.compose([Validators.maxLength(50), Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      status: ['']
    });

    this.editCustomerForm.controls["customer_ID"].setValue(this.customer.customer_ID);
    this.editCustomerForm.enable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerMgmtPage');
  }

  async presentLoadingDefault() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Data. Please wait...'
    });
    await loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 8000);
  }

  async EditCustomer(formData) {
    console.log("formData: " + JSON.stringify(formData));

    const alert = await this.alertCtrl.create({
      header: 'Confirm Changes',
      message: 'Confirm All Changes?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            console.log('Changes confirmed');
            await this.custProvider.editCustomer(JSON.stringify(formData));
            this.navCtrl.pop();

            const successAlert = await this.alertCtrl.create({
              header: 'Success!',
              message: 'Customer has been edited',
              buttons: ['OK']
            });
            await successAlert.present();
          }
        }
      ]
    });

    await alert.present();
  }

  async showContactOptions(event, arrayIndex) {
    const popover = await this.popOverCtrl.create({
      component: CustomerContactsContextMenuComponent,
      componentProps: { 'custContact': this.customerContacts[arrayIndex] },
      cssClass: 'custom-customer-popover'
    });

    await popover.present();
    const { data } = await popover.onDidDismiss();
    this.loadData();
  }

  goToCreateCustomerContact() {
    this.navCtrl.navigateForward('CustomerManageContactsCreatePage', {
      queryParams: { customer: this.customer }
    });
  }

  async loadData() {
    const values = await Promise.all([
      this.rentalStatusProvider.getRentalStatusByCustomerIdWithPagination(
        this.customer.customer_ID, this.paginationDataManageContacts.currentPage, this.paginationDataManageContacts.currentRowsPerPage),
      this.palletProfileProvider.getAllPalletProfiles(),
      this.custContactProvider.getCustomerContactsOfOneCustomer(this.customer.customer_ID),
      this.rateChargeProvider.getAllChargeRatesOfCustomerPaginated(this.customer.customer_ID,
        this.paginationDataManageContacts.currentPage, this.paginationDataManageContacts.currentRowsPerPage)
    ]);

    this.customerRentalStatus = values[0].data;
    this.palletTypes = values[1];
    this.customerContacts = values[2];
    this.customerRateCharges = values[3].data;
  }
}
