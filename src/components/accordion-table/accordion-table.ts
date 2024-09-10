import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the AccordionTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordion-table',
  templateUrl: 'accordion-table.html'
})
export class AccordionTableComponent {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input ('expanded') expanded;
  @Input ('expandHeight') expandHeight;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer2) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePage');
  }

  ngAfterViewInit(){
    //this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');   // based on  deprecated Renderer (not 2)
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight+'px');
  }

}
