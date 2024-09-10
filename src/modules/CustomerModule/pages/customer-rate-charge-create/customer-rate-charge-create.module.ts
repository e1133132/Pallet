import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerRateChargeCreatePage } from './customer-rate-charge-create';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    CustomerRateChargeCreatePage,

  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerRateChargeCreatePageModule {}
