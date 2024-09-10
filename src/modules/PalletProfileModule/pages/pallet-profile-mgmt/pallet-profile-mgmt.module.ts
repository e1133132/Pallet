import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PalletProfileMgmtPage } from './pallet-profile-mgmt';
import { ComponentsModule } from "../../../../shared/components/components.module";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PalletProfileMgmtPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
})
export class PalletProfileMgmtPageModule {}
