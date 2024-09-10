import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { HomePage } from '../modules/HomeModule/home';
import { CustomerHomePage } from "../modules/CustomerModule/pages/customer-home/customer-home";
import { HireOrderHomePage } from "../modules/HireOrderModule/pages/hire-order-home/hire-order-home";
import { IssueNoteHomePage } from "../modules/IssueNoteModule/pages/issue-note-home/issue-note-home";
import { RetrieveNoteHomePage } from "../modules/RetrieveNoteModule/pages/retrieve-note-home/retrieve-note-home";
import { SettingsProvider } from "../providers/settings/settings";
import { PalletProfileHomePage } from "../modules/PalletProfileModule/pages/pallet-profile-home/pallet-profile-home";
import { LoginPage } from "../modules/LoginModule/pages/login/login";
import { ApiURL } from "../shared/ApiURL";

@Component({
  templateUrl: 'app.component.html'
})
export class MyApp {
  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  selectedTheme: string = ''; // 初始化 selectedTheme

  constructor(
    public platform: Platform,
    public statusBar: StatusBar, // 使用 ngx 版本的 StatusBar
    public splashScreen: SplashScreen, // 使用 ngx 版本的 SplashScreen
    private settings: SettingsProvider,
    private api: ApiURL,
    private navCtrl: NavController
  ) {
    this.initializeApp();

    // 导航目的
    this.pages = [
      { title: 'Customers', component: CustomerHomePage },
      { title: 'Hire Orders', component: HireOrderHomePage },
      { title: 'Issue Notes', component: IssueNoteHomePage },
      { title: 'Retrieve Notes', component: RetrieveNoteHomePage },
      { title: 'Pallet Profile', component: PalletProfileHomePage },
      { title: 'Logout(Testing)', component: PalletProfileHomePage }
    ];

    // 根据国家数据库更改主题
    this.settings.getActiveTheme().subscribe((val: string) => {
      this.selectedTheme = val;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (localStorage.getItem('token')) {
        this.api.updateBearerToken();
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  openPage(page: { component: any }) {
    this.navCtrl.navigateRoot(page.component);
  }

  restart() {
    document.location.href = "/";
  }
}
