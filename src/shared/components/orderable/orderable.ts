import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'orderable',
  templateUrl: 'orderable.html'
})
export class OrderableComponent {

  @Input('isOrdered') isOrdered: boolean = false;
  @Input('name') name: string = null;

  @Output('order') order: EventEmitter<any> = new EventEmitter();

  isDescending: boolean = true;

  @HostListener('click') onClick(){
    if(this.isOrdered){
      this.isDescending = !this.isDescending;
    } else {
      this.isOrdered = true;
    }

    this.order.emit({name: this.name, isOrdered: this.isOrdered, isDescending: this.isDescending});
  }

  constructor() {
  }



}
