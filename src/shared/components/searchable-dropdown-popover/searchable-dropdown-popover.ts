import {AfterViewInit, Component} from '@angular/core';
import {NavParams, ModalController} from "@ionic/angular";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime'

@Component({
  selector: 'searchable-dropdown-popover',
  templateUrl: 'searchable-dropdown-popover.html'
})
export class SearchableDropdownPopoverComponent implements AfterViewInit{

  value: string = '';
  url: string = '';
  itemList: string[] = [];

  searchControl: FormControl;

  constructor(public modalCtrl: ModalController, public navParams: NavParams) {
    this.value = navParams.get('value');
    this.url = navParams.get('url');
  }

  ngAfterViewInit(){
    // this.onInputData();  //different API calls from EDBPM Mobile so this is not needed.
  }


  onSelectItem(item: string){
    this.value = item;
    this.modalCtrl.dismiss(item);
  }

  // onInputData(){
  //   this.api.post(this.url, {'keywords': this.value}).subscribe(data =>{
  //     this.itemList = data as string[];
  //   })
  // }
}
