import {Component, Input, ViewChild, ElementRef, Renderer2, SimpleChanges} from '@angular/core';
import { OnChanges } from "@angular/core";

@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded = false;
  @Input('expandHeight') expandHeight = 500;
  @Input('expandTime') expandTime = .375;

  //delay expansion for animation
  delayExpand: boolean;

  constructor(public renderer: Renderer2) {
  }

  ngAfterViewInit(){
    this.delayExpand = this.expanded;
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight + 'px');
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'transition-duration', this.expandTime + 's');
  }

  ngOnChanges(changes: SimpleChanges){
    let change = changes['expanded'];
    if(!change.isFirstChange() && !change.currentValue){
      setTimeout(() => { this.delayExpand = this.expanded }, this.expandTime * 1000);
    } else if (change.currentValue){
      this.delayExpand = this.expanded;
    }
  }

}
