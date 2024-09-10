import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerCreatePage } from './customer-create';

@NgModule({
  declarations: [
    CustomerCreatePage,
  ],
  imports: [
    IonicModule,  // 替换 IonicPageModule
  ],
})
export class CustomerCreatePageModule {}
