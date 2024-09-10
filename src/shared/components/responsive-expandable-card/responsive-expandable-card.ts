import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CardOptions, FilterData, OrderedColData, PaginationData, RECard} from "../../template-models/template-models";
import {TableFilterPopoverComponent} from "../table-filter-popover/table-filter-popover";
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'responsive-expandable-card',
  templateUrl: 'responsive-expandable-card.html'
})
export class ResponsiveExpandableCardComponent implements OnInit {

  @Input('RECard') card: RECard = { expended: false };

  filterData: FilterData | null = null;  // 设置为允许 null
  paginationData: PaginationData = {} as PaginationData;  // 初始化

  tableOrderedCol: OrderedColData = {
    id: '', name: '', isDescending: true
  };

  @Output('changeFilter') changeFilter: EventEmitter<string> = new EventEmitter();
  @Output('changePagination') changePagination: EventEmitter<any> = new EventEmitter();

  @ViewChild('secondaryActions') secondaryActionsContent!: ElementRef;
  showSecondaries: boolean = true;

  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {
    if (this.card.table) {
      if (this.card.table.orderedAttribute) {
        this.tableOrderedCol = {
          id: this.card.table.orderedAttribute?.primary || '',
          name: this.card.table.displayableAttributes?.find(x => x.name === this.card.table.orderedAttribute?.primary)?.displayName ?? '',

          isDescending: true
        };
      } else if (this.card.table.displayableAttributes) {
        this.tableOrderedCol = {
          id: this.card.table.displayableAttributes[0]?.name || '',
          name: this.card.table.displayableAttributes[0]?.displayName || '',
          isDescending: true
        };
      }

      if (this.card.table.displayCheckboxes == null) {
        this.card.table.displayCheckboxes = true;
      }
    }
    console.log(this.card);
  }

  onExpand() {
    this.card.expended = !this.card.expended;
  }

  async onViewFilters(myEvent: Event) {
    const popover = await this.popoverCtrl.create({
      component: TableFilterPopoverComponent,
      componentProps: { filterData: this.filterData },
      event: myEvent
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data) {
      this.changeFilter.emit(data);
    }
  }

  onChangePagination(myEvent: any) {
    this.changePagination.emit(myEvent);
  }

  get displayColumns() {
    let numOfColumns = 12;
    if (this.card.table?.displayCheckboxes == null || this.card.table?.displayCheckboxes === true) {
      numOfColumns = 11;
    }

    const columns: any[] = [];
    if (this.card.table?.displayableAttributes) {
      for (let item of this.card.table.displayableAttributes) {
        if (item && !item.hide) {
          columns.push(item);
        }
      }
    }

    return columns.slice(0, numOfColumns - 1);
  }
}
