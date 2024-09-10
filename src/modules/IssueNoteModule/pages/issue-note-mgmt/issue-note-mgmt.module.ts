import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { IssueNoteMgmtPage } from './issue-note-mgmt';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    IssueNoteMgmtPage,
  ],
  imports: [
    IonicPageModule.forChild(IssueNoteMgmtPage),
    ComponentsModule
  ],
})
export class IssueNoteMgmtPageModule {}
