import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { IssueNoteHomePage } from './issue-note-home';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    IssueNoteHomePage,
  ],
  imports: [
    IonicPageModule.forChild(IssueNoteHomePage),
    ComponentsModule
  ],
})
export class IssueNoteHomePageModule {}
