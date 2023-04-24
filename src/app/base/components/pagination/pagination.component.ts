import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestParams } from '../../models/request-params';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

  @Input() disabled: boolean = false;
  @Input() collectionSize: number;
  @Output() onPageSizeChange: EventEmitter<RequestParams> = new EventEmitter<RequestParams>();
  @Output() onPageChange: EventEmitter<RequestParams> = new EventEmitter<RequestParams>();

  public pageLimit: number;
  public currentPage: number = 1;
  public pageSizes: number[] = [10, 20, 50, 100];

  ngOnInit(): void {
    this.pageLimit = this.pageSizes[0];
  }

  public handlePageSizeChange(newPageSize: string): void {
    this.pageLimit = Number(newPageSize);
    this.currentPage = 1;
    this.onPageSizeChange.emit(this.getRequestParams());
  }

  public handlePageChange(): void {
    this.onPageChange.emit(this.getRequestParams());
  }

  public getRequestParams(): RequestParams {
    return new RequestParams(this.currentPage, this.pageLimit);
  }

}
