import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, Platform } from '@ionic/angular';
import { CustomerHomePage } from "../CustomerModule/pages/customer-home/customer-home";
import { HireOrderHomePage } from "../HireOrderModule/pages/hire-order-home/hire-order-home";
import { IssueNoteHomePage } from "../IssueNoteModule/pages/issue-note-home/issue-note-home";
import { ApiURL } from "../../shared/ApiURL";
import { RetrieveNoteHomePage } from "../RetrieveNoteModule/pages/retrieve-note-home/retrieve-note-home";
import { PalletProfileHomePage } from "../PalletProfileModule/pages/pallet-profile-home/pallet-profile-home";
import { SettingsProvider } from "../../providers/settings/settings";
import { LoginPage } from "../LoginModule/pages/login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pageName: any;
  selectedDBisSG: boolean = false;
  selectedDBisMY: boolean = false;
  selectedTheme: String;
  username;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private api: ApiURL,
    private alertCtrl: AlertController,
    private settings: SettingsProvider,
    public loadingCtrl: LoadingController
  ) {
    console.log("Home: " + localStorage.getItem('token'));
    this.selectCountryDB();
    this.settings.getActiveTheme().subscribe(val => {
      this.selectedTheme = val;
    });
    this.username = localStorage.getItem('userName');
  }

  async selectCountryDB() {
    const alert = await this.alertCtrl.create({
      header: "Select Country", // 替换 title 为 header
      message: "Please select the country whose operations you would like to manage.",
      buttons: [{
        text: 'Singapore',
        handler: () => {
          this.api.setSGApiUrl();
          this.selectedDBisSG = true;
          this.settings.setActiveTheme("blue-theme");
        }
      },
      {
        text: 'Malaysia',
        handler: () => {
          this.api.setMYApiUrl();
          this.selectedDBisMY = true;
          this.settings.setActiveTheme("orange-theme");
        }
      }],
      backdropDismiss: false // 替换 enableBackdropDismiss 为 backdropDismiss
    });
    await alert.present(); // 使用 await 处理 present()
  }

  gotoPage(index: number) {
    switch (index) {
      case (1): this.pageName = CustomerHomePage; break;
      case (2): this.pageName = HireOrderHomePage; break;
      case (3): this.pageName = IssueNoteHomePage; break;
      case (4): this.pageName = RetrieveNoteHomePage; break;
      case (5): this.pageName = PalletProfileHomePage; break;
    }
    this.navCtrl.navigateForward(this.pageName); // 替换 push 为 navigateForward
  }

  getDeviceSize() {
    if (this.platform.width() >= 992) {
      return 'lg'
    } else if (this.platform.width() >= 768) {
      return 'md'
    } else if (this.platform.width() >= 576) {
      return 'sm'
    } else {
      return 'xs'
    }
  }

  async logout() {
    const loading = await this.loadingCtrl.create({
      message: "Logging out..." // 将 content 替换为 message
    });
    await loading.present(); // 使用 await 处理 present()

    localStorage.clear();
    this.api.resetBearerToken();
    this.navCtrl.navigateRoot('/login'); // 替换 setRoot 为 navigateRoot

    await loading.dismiss(); // 使用 await 处理 dismiss()
  }
}
