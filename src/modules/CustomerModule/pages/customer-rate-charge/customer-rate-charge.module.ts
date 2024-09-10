import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerRateChargePage } from './customer-rate-charge';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    CustomerRateChargePage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerRateChargePageModule {}
