import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerManageContactsPage } from './customer-manage-contacts';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    CustomerManageContactsPage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerManageContactsPageModule {}
