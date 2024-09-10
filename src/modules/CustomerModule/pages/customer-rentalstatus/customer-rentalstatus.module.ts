import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerRentalstatusPage } from './customer-rentalstatus';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    CustomerRentalstatusPage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerRentalstatusPageModule {}
