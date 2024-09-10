import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerManageContactsEditPage } from './customer-manage-contacts-edit';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    CustomerManageContactsEditPage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerManageContactsEditPageModule {}
