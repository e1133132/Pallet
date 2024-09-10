import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RetrieveNoteMgmtPage } from './retrieve-note-mgmt';
import { ComponentsModule } from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    RetrieveNoteMgmtPage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class RetrieveNoteMgmtPageModule {}
