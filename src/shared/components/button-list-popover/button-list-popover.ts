import { Component } from '@angular/core';
import {NavParams, ModalController} from "@ionic/angular";

@Component({
  selector: 'button-list-popover',
  templateUrl: 'button-list-popover.html'
})
export class ButtonListPopoverComponent {

  buttons: string[] = [];

  constructor(public navParams: NavParams,public modalCtrl: ModalController) {
    this.buttons = navParams.get('buttons');
  }

  onClickButton(value){
    this.modalCtrl.dismiss(value);
  }

}
