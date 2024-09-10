import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HireOrderHomePage } from './hire-order-home';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    HireOrderHomePage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class HireOrderHomePageModule {}
