import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { PalletProfileCreatePage } from './pallet-profile-create';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    PalletProfileCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PalletProfileCreatePage),
    ComponentsModule
  ],
})
export class PalletProfileCreatePageModule {}
