import { NgModule } from '@angular/core';
import { IssueNoteContextMenuHomeComponent } from '../modules/IssueNoteModule/components/issue-note-context-menu-home/issue-note-context-menu-home';
import { RetrieveNoteContextMenuHomeComponent } from '../modules/RetrieveNoteModule/components/retrieve-note-context-menu-home/retrieve-note-context-menu-home';
import { RetrieveNoteCreateCustomerSelectPopoverComponent } from '../modules/RetrieveNoteModule/components/retrieve-note-create-customer-select-popover/retrieve-note-create-customer-select-popover';
import { RetrieveNoteModalSummaryReportComponent } from '../modules/RetrieveNoteModule/components/retrieve-note-modal-summary-report/retrieve-note-modal-summary-report';
import { PalletProfileContextMenuHomeComponent } from '../modules/PalletProfileModule/components/pallet-profile-context-menu-home/pallet-profile-context-menu-home';

@NgModule({
	declarations: [IssueNoteContextMenuHomeComponent,
    RetrieveNoteContextMenuHomeComponent,
    RetrieveNoteCreateCustomerSelectPopoverComponent,
    RetrieveNoteModalSummaryReportComponent,
    PalletProfileContextMenuHomeComponent],
	imports: [],
	exports: [IssueNoteContextMenuHomeComponent,
    RetrieveNoteContextMenuHomeComponent,
    RetrieveNoteCreateCustomerSelectPopoverComponent,
    RetrieveNoteModalSummaryReportComponent,
    PalletProfileContextMenuHomeComponent]
})
export class ComponentsModule {}
