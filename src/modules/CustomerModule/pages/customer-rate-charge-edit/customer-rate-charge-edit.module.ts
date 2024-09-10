import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerRateChargeEditPage } from './customer-rate-charge-edit';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    CustomerRateChargeEditPage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerRateChargeEditPageModule {}
