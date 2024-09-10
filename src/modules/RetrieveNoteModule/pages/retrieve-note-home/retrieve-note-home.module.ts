import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RetrieveNoteHomePage } from './retrieve-note-home';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    RetrieveNoteHomePage,
  ],
  imports: [
    IonicModule,
    ComponentsModule
  ],
})
export class RetrieveNoteHomePageModule {}
