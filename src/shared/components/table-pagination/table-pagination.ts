import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginationData} from "../../template-models/template-models";

@Component({
  selector: 'table-pagination',
  templateUrl: 'table-pagination.html'
})
export class TablePaginationComponent {

  @Input('paginationData') paginationData: PaginationData;

  @Output('changePagination') changePagination: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  next(){
    if(this.paginationData.currentPage < (this.paginationData.totalRow / this.paginationData.currentRowsPerPage) - 1){
      this.paginationData.currentPage = this.paginationData.currentPage + 1;
      this.emitData();
    }
  }

  previous(){
    if(this.paginationData.currentPage > 0){
      this.paginationData.currentPage = this.paginationData.currentPage - 1;
      this.emitData();
    }
  }

  get startRow(): any{
    return (this.paginationData.currentPage * this.paginationData.currentRowsPerPage) + 1;
  }

  get endRow(): any{
  return (this.paginationData.currentPage + 1) * this.paginationData.currentRowsPerPage <= this.paginationData.totalRow
    ? (this.paginationData.currentPage + 1) * this.paginationData.currentRowsPerPage
    : this.paginationData.totalRow;
}

  onChangeRPP(value: number){
    this.paginationData.currentPage = 0;
    this.paginationData.currentRowsPerPage = parseInt(value + "");
    this.emitData();
  }

  emitData(){
    this.changePagination.emit(this.paginationData);
  }

}
