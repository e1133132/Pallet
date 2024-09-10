import {Component} from '@angular/core';
import {NavParams, Platform} from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import {RetrieveNoteProvider} from "../../providers/retrieve-note/retrieve-note";
import {ApiURL} from "../../../../shared/ApiURL";

/**
 * Generated class for the RetrieveNoteModalSummaryReportComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'retrieve-note-modal-summary-report',
  templateUrl: 'retrieve-note-modal-summary-report.html'
})
export class RetrieveNoteModalSummaryReportComponent {

  // @ViewChild("startDate") startDate: HTMLInputElement;
  // @ViewChild("endDate") endDate: HTMLInputElement;

  startDate = new Date().toISOString();
  endDate = new Date().toISOString();

  constructor(public navParams: NavParams,
              private modalCtrl: ModalController,
              public platform: Platform,
              private retrieveNoteProvider: RetrieveNoteProvider,
              private api:ApiURL) {
    console.log('Hello RetrieveNoteModalSummaryReportComponent Component');

  }

  generateXLTotalQtySummaryReport(start, end) {

    let startYear = parseInt(start.substring(0,4));
    let startMonth= parseInt(start.substring(5,7));
    let startDay = parseInt(start.substring(8,10));

    let endYear = parseInt(end.substring(0,4));
    let endMonth= parseInt(end.substring(5,7));
    let endDay = parseInt(end.substring(8,10));

    this.retrieveNoteProvider.getXLOfTotalQtyReport(startYear,startMonth,startDay,endYear,endMonth, endDay).then(result => {
      var blob = new Blob([result],
        {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},);

      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      if(this.api.getIsSGDb()==true) {
        link.download="SG_Total Qty Returned ("+startDay+ startMonth+ startYear + "-" + endDay + endMonth+ endYear +").xlsx";
      }
      else {
        link.download="MY_Total Qty Returned ("+startDay+ startMonth+ startYear + "-" + endDay + endMonth+ endYear +").xlsx";
      }

      link.click();
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
