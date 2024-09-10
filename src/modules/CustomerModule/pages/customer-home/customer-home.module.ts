import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CustomerHomePage } from './customer-home';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [CustomerHomePage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class CustomerHomePageModule {}
