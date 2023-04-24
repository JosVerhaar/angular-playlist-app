import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  @Input() typeAheadFunction: OperatorFunction<string, readonly any[]> | null | undefined;
  @Output() searchCompleted: EventEmitter<string> = new EventEmitter<string>();

  public searchTerm: string = '';
  public isSearching: boolean = false;
  public searchFailed: boolean = false;

  public clearSearchTerm(): void {
    this.searchTerm = '';
    this.searchCompleted.emit(this.searchTerm);
  }


}
