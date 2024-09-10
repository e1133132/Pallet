import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { PopoverController } from "@ionic/angular";
import { SearchableDropdownPopoverComponent } from "../searchable-dropdown-popover/searchable-dropdown-popover";

@Component({
  selector: 'searchable-dropdown',
  templateUrl: 'searchable-dropdown.html'
})
export class SearchableDropdownComponent {

  @Input('value') value = '';
  @Input('url') url: string | null = null;
  @Output() valueEmit: EventEmitter<string> = new EventEmitter();

  constructor(private popoverCtrl: PopoverController) {}

  @HostListener('click', ['$event']) async onClick(myEvent: MouseEvent) {
    const popover = await this.popoverCtrl.create({
      component: SearchableDropdownPopoverComponent,
      componentProps: { url: this.url, value: this.value },
      event: myEvent  // 将事件传递给 create 而不是 present
    });
  
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
    if (data) {
      console.log(data);
      this.value = data;
      this.valueEmit.emit(this.value);
    }
  }
  
}
