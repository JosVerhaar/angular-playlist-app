import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { RequestParams } from '../../models/request-params';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ArtistBaseItemService } from '../../../modules/artists/service/artist-base-item.service';
import { BaseItem } from '../../models/base-item';
import { BaseItemService } from '../../services/base-item.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-base-item-overview',
  templateUrl: './base-item-overview.component.html'
})
export class BaseItemOverviewComponent {

  @Output() searchCompleted: EventEmitter<RequestParams> = new EventEmitter<RequestParams>();
  @Output() onPageChange: EventEmitter<RequestParams> = new EventEmitter<RequestParams>();
  @Output() onPageSizeChange: EventEmitter<RequestParams> = new EventEmitter<RequestParams>();
  @Output() actionButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  @Input() totalRows: number;
  @Input() showActionButton: boolean = false;

  @ViewChild(PaginationComponent) pagination: PaginationComponent;

  public isSearching: boolean = false;
  public searchFailed: boolean = false;

  private readonly baseItemService: BaseItemService<BaseItem>;

  constructor(@Inject('baseItemService') baseItemService: BaseItemService<BaseItem>) {
    this.baseItemService = baseItemService;
  }

  public searchItem: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap(searchTerm =>
        this.baseItemService.searchItem(new RequestParams(1, 20, searchTerm)).pipe(
          tap(() => {
            this.searchFailed = false;
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.isSearching = false)
    );

  public handleSearchComplete(searchTerm: string): void {
    let params: RequestParams = this.pagination.getRequestParams();
    params.searchByName = searchTerm;
    this.searchCompleted.emit(params);
  }

}
