import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerMgmtPage } from './customer-mgmt';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    CustomerMgmtPage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerMgmtPageModule {}
