import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FilterData, PaginationData } from "../../template-models/template-models";
import { Platform, PopoverController } from "@ionic/angular";
import { TableFilterPopoverComponent } from "../table-filter-popover/table-filter-popover";

@Component({
  selector: 'expandable-responsive-card',
  templateUrl: 'expandable-responsive-card.html'
})
export class ExpandableResponsiveCardComponent implements AfterViewInit {

  @Input('initialExpand') expanded: boolean = true;
  @Input('expandHeight') expandHeight = 500;
  @Input('expandTime') expandTime = 0.375;

  @Input('filterData') filterData: FilterData | null = null;
  @Input('paginationData') paginationData: PaginationData | null = null;

  @Output('changeFilter') changeFilter: EventEmitter<string> = new EventEmitter();
  @Output('changePagination') changePagination: EventEmitter<any> = new EventEmitter();

  //these view children are to make sure old ng-content works
  @ViewChild('tableHeaders') tableHeadersContent!: ElementRef;
  showTableHeadersContent: boolean = true;

  @ViewChild('secondaryData') secondaryDataContent!: ElementRef;
  @ViewChild('secondaryActions') secondaryActionsContent!: ElementRef;
  showSecondaries: boolean = true;

  @ViewChild('tableData') tableDataContent!: ElementRef;
  showTableDataContent: boolean = true;

  constructor(private popoverCtrl: PopoverController, public platform: Platform) {}

  ngAfterViewInit() {
    this.showTableHeadersContent = this.tableHeadersContent.nativeElement.children.length > 0;
    this.showSecondaries = this.secondaryDataContent.nativeElement.children.length > 0 || this.secondaryActionsContent.nativeElement.children.length > 0;
    this.showTableDataContent = this.tableDataContent.nativeElement.children.length > 0;
  }

  onExpand() {
    this.expanded = !this.expanded;
  }

  async onViewFilters(myEvent: Event) {
    const popover = await this.popoverCtrl.create({
      component: TableFilterPopoverComponent,
      componentProps: { filterData: this.filterData }
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.changeFilter.emit(data);
    }
  }

  onChangePagination(myEvent: Event) {
    this.changePagination.emit(myEvent);
  }
}
