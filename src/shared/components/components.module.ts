import { NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable';
import {CommonModule} from "@angular/common";
import { MultiSelectActionPanelComponent } from './multi-select-action-panel/multi-select-action-panel';
import {IonicModule} from "@ionic/angular";
import { ExpandableCardComponent } from './expandable-card/expandable-card';
import { TablePaginationComponent } from './table-pagination/table-pagination';
import {CustomerRatechargesModalEditComponent} from "../../modules/CustomerModule/components/customer-ratecharges-modal-edit/customer-ratecharges-modal-edit";
import {HireOrderCreateComponent} from "../../modules/HireOrderModule/components/hire-order-create/hire-order-create";
import {AccordionTableComponent} from "../../components/accordion-table/accordion-table";
import {CustomerRatechargesModalCreateComponent} from "../../modules/CustomerModule/components/customer-ratecharges-modal-create/customer-ratecharges-modal-create";
import {HireOrderContextMenuComponent} from "../../modules/HireOrderModule/components/hire-order-context-menu/hire-order-context-menu";
import {CustomerContextMenuComponent} from "../../modules/CustomerModule/components/customer-context-menu/customer-context-menu";
import {CustomerContactsModalEditComponent} from "../../modules/CustomerModule/components/customer-contacts-modal-edit/customer-contacts-modal-edit";
import {CustomerContactsContextMenuComponent} from "../../modules/CustomerModule/components/customer-contacts-context-menu/customer-contacts-context-menu";
import {CustomerContactsModalCreateComponent} from "../../modules/CustomerModule/components/customer-contacts-modal-create/customer-contacts-modal-create";
import {CustomerRatechargesContextMenuComponent} from "../../modules/CustomerModule/components/customer-ratecharges-context-menu/customer-ratecharges-context-menu";
import {HireOrderCreateSelectCustomerPopoverComponent} from "../../modules/HireOrderModule/components/hire-order-create-select-customer-popover/hire-order-create-select-customer-popover";
import {TableFilterPopoverComponent} from "./table-filter-popover/table-filter-popover";
import {OrderableComponent} from "./orderable/orderable";
import {ButtonListPopoverComponent} from "./button-list-popover/button-list-popover";
import {TableHeaderComponent} from "./table-header/table-header";
import {TableRowComponent} from "./table-row/table-row";
import {TableDataComponent} from "./table-data/table-data";
import {SearchableDropdownComponent} from "./searchable-dropdown/searchable-dropdown";
import {SearchableDropdownPopoverComponent} from "./searchable-dropdown-popover/searchable-dropdown-popover";
import {CustomerModalMonthlySummaryComponent} from "../../modules/CustomerModule/components/customer-modal-monthly-summary/customer-modal-monthly-summary";
import {PopoverNewHireOrdersComponent} from "../../modules/IssueNoteModule/components/popover-new-hire-orders/popover-new-hire-orders";
import {IssueNoteContextMenuHomeComponent} from "../../modules/IssueNoteModule/components/issue-note-context-menu-home/issue-note-context-menu-home";
import {RetrieveNoteContextMenuHomeComponent} from "../../modules/RetrieveNoteModule/components/retrieve-note-context-menu-home/retrieve-note-context-menu-home";
import {RetrieveNoteCreateCustomerSelectPopoverComponent} from "../../modules/RetrieveNoteModule/components/retrieve-note-create-customer-select-popover/retrieve-note-create-customer-select-popover";
import {RetrieveNoteModalSummaryReportComponent} from "../../modules/RetrieveNoteModule/components/retrieve-note-modal-summary-report/retrieve-note-modal-summary-report";
import {PalletProfileContextMenuHomeComponent} from "../../modules/PalletProfileModule/components/pallet-profile-context-menu-home/pallet-profile-context-menu-home";

@NgModule({
	declarations: [ExpandableComponent,
    MultiSelectActionPanelComponent,
    ExpandableCardComponent,
    TablePaginationComponent,
    TableFilterPopoverComponent,
    OrderableComponent,
    ButtonListPopoverComponent,
    MultiSelectActionPanelComponent,
    CustomerContextMenuComponent,
    CustomerContactsContextMenuComponent,
    CustomerContactsModalEditComponent,
    CustomerContactsModalCreateComponent,
    CustomerModalMonthlySummaryComponent,
    AccordionTableComponent,
    CustomerRatechargesContextMenuComponent,
    CustomerRatechargesModalCreateComponent,
    CustomerRatechargesModalEditComponent,
    HireOrderCreateComponent,
    HireOrderCreateSelectCustomerPopoverComponent,
    HireOrderContextMenuComponent,
    TableHeaderComponent,
    TableRowComponent,
    TableDataComponent,
    PopoverNewHireOrdersComponent,
    IssueNoteContextMenuHomeComponent,
    RetrieveNoteContextMenuHomeComponent,
    RetrieveNoteCreateCustomerSelectPopoverComponent,
    RetrieveNoteModalSummaryReportComponent,
  PalletProfileContextMenuHomeComponent],
	imports: [CommonModule, IonicModule],
	exports: [ExpandableComponent,
    MultiSelectActionPanelComponent,
    ExpandableCardComponent,
    TablePaginationComponent,
    TableFilterPopoverComponent,
    OrderableComponent,
    ButtonListPopoverComponent,
    MultiSelectActionPanelComponent,
    CustomerContextMenuComponent,
    CustomerContactsContextMenuComponent,
    CustomerContactsModalEditComponent,
    CustomerContactsModalCreateComponent,
    CustomerModalMonthlySummaryComponent,
    AccordionTableComponent,
    CustomerRatechargesContextMenuComponent,
    CustomerRatechargesModalCreateComponent,
    CustomerRatechargesModalEditComponent,
    HireOrderCreateComponent,
    HireOrderCreateSelectCustomerPopoverComponent,
    HireOrderContextMenuComponent,
    TableHeaderComponent,
    TableRowComponent,
    TableDataComponent,
    PopoverNewHireOrdersComponent,
    IssueNoteContextMenuHomeComponent,
    RetrieveNoteContextMenuHomeComponent,
    RetrieveNoteCreateCustomerSelectPopoverComponent,
    RetrieveNoteModalSummaryReportComponent,
    PalletProfileContextMenuHomeComponent],
  entryComponents: [
    CustomerContextMenuComponent,
    CustomerContactsContextMenuComponent,
    CustomerContactsModalEditComponent,
    CustomerContactsModalCreateComponent,
    CustomerModalMonthlySummaryComponent,
    AccordionTableComponent,
    CustomerRatechargesModalCreateComponent,
    CustomerRatechargesContextMenuComponent,
    CustomerRatechargesModalEditComponent,
    HireOrderCreateComponent,
    HireOrderCreateSelectCustomerPopoverComponent,
    HireOrderContextMenuComponent,
    TableFilterPopoverComponent,
    ButtonListPopoverComponent,
    TableHeaderComponent,
    TableRowComponent,
    TableDataComponent,
    PopoverNewHireOrdersComponent,
    IssueNoteContextMenuHomeComponent,
    RetrieveNoteContextMenuHomeComponent,
    RetrieveNoteCreateCustomerSelectPopoverComponent,
    RetrieveNoteModalSummaryReportComponent,
    PalletProfileContextMenuHomeComponent
  ],
})
export class ComponentsModule {}
