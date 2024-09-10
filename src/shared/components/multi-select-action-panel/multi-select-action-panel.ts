import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ButtonListPopoverComponent } from '../button-list-popover/button-list-popover';

@Component({
  selector: 'ms-action-panel',
  templateUrl: 'multi-select-action-panel.html',
})
export class MultiSelectActionPanelComponent {

  @ViewChild('msap', { read: ElementRef }) msap!: ElementRef;  // 确定类型
  @Input('expanded') expanded = false;
  @Input('showMore') showMore = false;
  @Input('buttons') buttons: string[] = [];

  @Output('clickAction') clickEmitter: EventEmitter<string> = new EventEmitter();

  constructor(public popoverCtrl: PopoverController) {}

  async onMoreActions(myEvent: Event) {  // 明确类型
    const popover = await this.popoverCtrl.create({
      component: ButtonListPopoverComponent,
      componentProps: { buttons: this.buttons },
      event: myEvent  // event参数修正
    });

    await popover.present();  // 使用 await 确保异步处理

    const { data } = await popover.onDidDismiss();  // 使用 await
    if (data) {
      this.clickEmitter.emit(data);
    }
  }

  ngAfterViewInit() {
    // 此处可以进行初始化
  }
}
