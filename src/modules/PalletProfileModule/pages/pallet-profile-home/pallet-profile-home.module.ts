import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { PalletProfileHomePage } from './pallet-profile-home';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    PalletProfileHomePage,
  ],
  imports: [
    IonicPageModule.forChild(PalletProfileHomePage),
    ComponentsModule
  ],
})
export class PalletProfileHomePageModule {}
