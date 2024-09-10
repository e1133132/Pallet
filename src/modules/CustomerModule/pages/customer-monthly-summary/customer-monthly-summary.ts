import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import {HireOrderProvider} from "../../../HireOrderModule/providers/hire-order/hire-order";
import {IssueNoteProvider} from "../../../IssueNoteModule/providers/issue-note/issue-note";
import {RetrieveNoteProvider} from "../../../RetrieveNoteModule/providers/retrieve-note/retrieve-note";
import {InvoiceProvider} from "../../../../providers/invoice/invoice";
import {CustomerProvider} from "../../providers/customer/customer";

/**
 * Generated class for the CustomerMonthlySummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-monthly-summary',
  templateUrl: 'customer-monthly-summary.html',
})
export class CustomerMonthlySummaryPage {

  customer: any;
  customerIssueOrders;
  customerRetrieveNotes;
  years= [];
  months= [];
  currentMonth;
  balanceFromLastMonth=0;
  balanceThisMonth=0;
  topCloseBalanceQtyInvoice;
  selectYear = new Date().getFullYear();
  selectMonth = new Date().getMonth();
  isYearandMthEntered=false;
  custBalanceQtys:number[]=[];
  allCustNotes;
  selectedDate;
  totalIssueQty=0;
  totalRetrieveQty=0;

  @ViewChild("balThisMonth") balThisMonth: HTMLLabelElement;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private hireOrderProvider: HireOrderProvider,
              private issueOrderProvider: IssueNoteProvider,
              private retrieveNoteProvider: RetrieveNoteProvider,
              private invoiceProvider: InvoiceProvider,
              private custProvider: CustomerProvider) {

    this.customer = this.navParams.get("customer");

    let dt = new Date().getFullYear();

    for(let i=0;i<5;i++) {

      this.years.push(dt-i);
    }

    this.currentMonth = new Date().getMonth();

    for(let i=0;i<12;i++) {
      this.months.push(1+i);
    }



      // this.selectMonth.selectedIndex= this.currentMonth;
      // this.selectYear.selectedIndex=this.years[0];

    // if(this.currentMonth=1) {
    //   this.currentMonth=12;
    //   this.selectYear=this.years[1];
    // }
    // else {
    //   this.selectMonth= this.currentMonth;
    //   this.selectYear=this.years[0];
    // }




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerMonthlySummaryPage');


  }

  generateMthSummary() {
    if(this.selectYear!=null, this.selectMonth!=null) {

        // this.selectYear=this.selectedDate.Year;
        // this.selectMonth= this.selectedDate.Month;

      // Promise.all([this.invoiceProvider.GetTopBalQtyInMthForOneCustomer(this.customer.customer_ID,
      //                    this.selectMonth,this.selectYear),
      //                     this.custProvider.getCombinedIssueAndRetrieveNoteByCustomerByMth
      //                     (this.customer.customer_ID, this.selectYear,this.selectMonth)]).then(values =>{
      //                       this.topCloseBalanceQtyInvoice=values[0];
      //                       this.allCustNotes = values[1];
      //
      //     if(this.customerRetrieveNotes!=null,this.customerIssueOrders!=null,this.topCloseBalanceQtyInvoice!=null) {
      //       this.isYearandMthEntered = true;
      //       this.balanceFromLastMonth = this.topCloseBalanceQtyInvoice.CloseBalanceQty;
      //       this.balanceThisMonth = this.balanceFromLastMonth;
      //     }
      //
      //       for (let notes of this.allCustNotes) {
      //         this.balanceThisMonth=this.balanceThisMonth+notes.Issue_Qty-notes.Retrieve_Qty;
      //         this.custBalanceQtys.push(this.balanceThisMonth);
      //
      //         this.totalIssueQty=this.totalIssueQty+notes.Issue_Qty;
      //         this.totalRetrieveQty=this.totalRetrieveQty+notes.Retrieve_Qty;
      //       }
      // });

      // Promise.all([
      //   this.issueOrderProvider.getIssueNoteOrdersfromCustomerId(this.customer.customer_ID),
      //   this.retrieveNoteProvider.getRetrieveNotesofOneCustomer(this.customer.customer_ID),
      //   this.invoiceProvider.GetTopBalQtyInMthForOneCustomer(this.customer.customer_ID,
      //     this.selectMonth,this.selectYear)]).then(values => {
      //   this.customerIssueOrders= values[0];
      //   this.customerRetrieveNotes=values[1];
      //   this.topCloseBalanceQtyInvoice=values[2];
      //
      //   if(this.customerRetrieveNotes!=null,this.customerIssueOrders!=null,this.topCloseBalanceQtyInvoice!=null) {
      //     this.isYearandMthEntered = true;
      //     this.balanceFromLastMonth=this.topCloseBalanceQtyInvoice.CloseBalanceQty;
      //     this.balanceThisMonth=this.balanceFromLastMonth;
      //
      //
      //     //test works!
      //     for (let is of this.customerIssueOrders) {
      //       this.balanceThisMonth=this.balanceThisMonth+is.Issue_Qty;
      //       this.custBalanceQtys.push(this.balanceThisMonth);
      //     }
      //     //test end
      //
      //   } else {
      //     alert("There are no entries in "+this.selectMonth+"/"+this.selectYear+". Please try again.");
      //   }
      // });



    }
  }


}
