import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'table-header',
  templateUrl: 'table-header.html',
  host: {'class': 'col'}
})
export class TableHeaderComponent{

  @Input('orderedColumn') orderedColumn: {name: string, isDescending: boolean, id: string} = null;
  @Input('name') name: string = null;
  @Input('id') id: string = null;

  @Output() order: EventEmitter<any> = new EventEmitter();

  isDescending: boolean = true;

  get isOrdered(){
    return this.name == this.orderedColumn.name;
  }

  @HostListener('click') onClick(){
    if(this.name != this.orderedColumn.name){
      this.orderedColumn.name = this.name;
      this.orderedColumn.id = this.id;
    } else {
      this.isDescending = !this.isDescending;
      this.orderedColumn.isDescending = this.isDescending;
    }

    this.order.emit(this.orderedColumn);
  }

  constructor(private hostElement: ElementRef) {
    // this.name = hostElement.nativeElement.getAttribute('name');
  }
}
