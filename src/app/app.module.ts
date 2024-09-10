import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicModule, IonApp } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../modules/HomeModule/home';
import { ListPage } from '../pages/list/list';
import { CustomerHomePage } from "../modules/CustomerModule/pages/customer-home/customer-home";
import { HireOrderHomePage } from "../modules/HireOrderModule/pages/hire-order-home/hire-order-home";
import { RetrieveNoteHomePage } from "../modules/RetrieveNoteModule/pages/retrieve-note-home/retrieve-note-home";
import { PalletProfileHomePage } from "../modules/PalletProfileModule/pages/pallet-profile-home/pallet-profile-home";
import { LoginPage } from "../modules/LoginModule/pages/login/login";

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { CustomerProvider } from '../modules/CustomerModule/providers/customer/customer';
import { CustomerContactsProvider } from '../modules/CustomerModule/providers/customer-contacts/customer-contacts';
import { RentalStatusProvider } from '../providers/rental-status/rental-status';
import { PalletProfileProvider } from '../modules/PalletProfileModule/providers/pallet-profile/pallet-profile';
import { RateChargeProvider } from '../providers/rate-charge/rate-charge';
import { RetrieveNoteProvider } from '../modules/RetrieveNoteModule/providers/retrieve-note/retrieve-note';
import { IssueNoteProvider } from '../modules/IssueNoteModule/providers/issue-note/issue-note';
import { HireOrderProvider } from '../modules/HireOrderModule/providers/hire-order/hire-order';
import { InvoiceProvider } from '../providers/invoice/invoice';
import { RentalChargeProvider } from '../providers/rental-charge/rental-charge';
import { ApiURL } from "../shared/ApiURL";
import { AdvanceOrderProvider } from '../providers/advance-order/advance-order';
import { SettingsProvider } from '../providers/settings/settings';
import { MovementHistoryProvider } from '../modules/PalletProfileModule/providers/movement-history/movement-history';
import { AdvanceProductionProvider } from '../providers/advance-production/advance-production';
import { LoginProvider } from '../modules/LoginModule/providers/login/login';

import { ComponentsModule } from "../shared/components/components.module";
import { CustomerHomePageModule } from "../modules/CustomerModule/pages/customer-home/customer-home.module";
import { IssueNoteHomePageModule } from "../modules/IssueNoteModule/pages/issue-note-home/issue-note-home.module";
import { RetrieveNoteHomePageModule } from "../modules/RetrieveNoteModule/pages/retrieve-note-home/retrieve-note-home.module";
import { PalletProfileHomePageModule } from "../modules/PalletProfileModule/pages/pallet-profile-home/pallet-profile-home.module";
import { LoginPageModule } from "../modules/LoginModule/pages/login/login.module";

@NgModule({
  declarations: [
    MyApp,  // 确保 MyApp 作为主组件
    HomePage,
    ListPage,
    HireOrderHomePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),  // 保持 IonicModule.forRoot()
    ComponentsModule,
    CustomerHomePageModule,
    IssueNoteHomePageModule,
    RetrieveNoteHomePageModule,
    PalletProfileHomePageModule,
    LoginPageModule
  ],
  bootstrap: [IonApp],  // 保持 IonApp
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: ErrorHandler },
    CustomerProvider,
    CustomerContactsProvider,
    RentalStatusProvider,
    PalletProfileProvider,
    RateChargeProvider,
    RetrieveNoteProvider,
    IssueNoteProvider,
    HireOrderProvider,
    InvoiceProvider,
    RentalChargeProvider,
    ApiURL,
    AdvanceOrderProvider,
    SettingsProvider,
    MovementHistoryProvider,
    AdvanceProductionProvider,
    LoginProvider,
  ]
})
export class AppModule {}
