import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbToastModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { BaseItemOverviewComponent } from './overview/base-item-overview.component';
import { ToastsComponent } from './toasts/toasts.component';
import { SongTableComponent } from './table/song-table/song-table.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NameTableComponent } from './table/name-table/name-table.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    BaseItemOverviewComponent,
    PaginationComponent,
    ToastsComponent,
    SongTableComponent,
    NavigationComponent,
    NameTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbToastModule,
  ],
  exports: [
    SearchBarComponent,
    BaseItemOverviewComponent,
    PaginationComponent,
    ToastsComponent,
    SongTableComponent,
    NavigationComponent,
    NameTableComponent,
  ]
})
export class ComponentsModule { }
