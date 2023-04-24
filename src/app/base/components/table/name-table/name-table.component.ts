import { Component, Input, TemplateRef } from '@angular/core';
import { Playlist } from '../../../../modules/playlists/model/playlist';
import { Artist } from '../../../../modules/artists/model/artist';

@Component({
  selector: 'app-name-table',
  templateUrl: './name-table.component.html'
})
export class NameTableComponent {

  @Input() namedItems: Artist[] | Playlist[] = [];
  @Input() rowActionsTemplate: TemplateRef<any>;

}
