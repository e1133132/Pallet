import { Component } from '@angular/core';
import { NavParams, Platform, ModalController } from "@ionic/angular";
import { CustomerProvider } from "../../providers/customer/customer";
import { ApiURL } from "../../../../shared/ApiURL";
import { SettingsProvider } from "../../../../providers/settings/settings";

@Component({
  selector: 'customer-modal-monthly-summary',
  templateUrl: 'customer-modal-monthly-summary.html'
})
export class CustomerModalMonthlySummaryComponent {

  dt = new Date().toISOString();
  customer;

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,  // 使用 ModalController 替换 ViewController
              private custProvider: CustomerProvider,
              private platform: Platform,
              private api: ApiURL,
              private settings: SettingsProvider) {

    console.log('Hello CustomerModalMonthlySummaryComponent Component');
    this.customer = this.navParams.get("customer");
  }

  generateXLMonthlySummaryReport(chosenDate) {
    let year = chosenDate.substring(0, 4); // 提取年份
    let month = chosenDate.substring(5, 7); // 提取月份

    parseInt(year);
    parseInt(month);

    this.custProvider.getXLMonthlySummary(this.customer.customer_ID, year, month).then(data => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      var linkb = document.createElement('a');
      linkb.href = window.URL.createObjectURL(blob);
      if (this.api.getIsSGDb() == true) {
        linkb.download = "SG_" + this.customer.Customer_Code + " Monthly Summary Report (" + month + "-" + year + ").xlsx";
      } else {
        linkb.download = "MY_" + this.customer.Customer_Code + " Monthly Summary Report (" + month + "-" + year + ").xlsx";
      }

      linkb.click();
    });
  }

  close() {
    this.modalCtrl.dismiss();  // 使用 ModalController 关闭模态窗口
  }
}
