import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerManageContactsCreatePage } from './customer-manage-contacts-create';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    CustomerManageContactsCreatePage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerManageContactsCreatePageModule {}
