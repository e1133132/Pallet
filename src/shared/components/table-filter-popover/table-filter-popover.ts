import {Component, Input} from '@angular/core';
import {NavParams, ModalController} from "@ionic/angular";
import {FilterData} from "../../template-models/template-models";

@Component({
  selector: 'table-filter-popover',
  templateUrl: 'table-filter-popover.html'
})
export class TableFilterPopoverComponent {

  private filterData: FilterData;

  constructor(private modalCtrl: ModalController, navParams: NavParams) {
    this.filterData = navParams.get('filterData');
  }

  onChangeFilters(){
    this.modalCtrl.dismiss(this.filterData);
  }

}
