import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HireOrderMgmtPage } from './hire-order-mgmt';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    HireOrderMgmtPage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class HireOrderMgmtPageModule {}
