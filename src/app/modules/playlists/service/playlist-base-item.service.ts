import { inject, Injectable } from '@angular/core';
import { BaseItemService } from '../../../base/services/base-item.service';
import { RequestParams } from '../../../base/models/request-params';
import { Observable } from 'rxjs';
import { Rows } from '../../../base/models/rows';
import { PlaylistService } from './playlist.service';
import { Playlist } from '../model/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistBaseItemService extends BaseItemService<Playlist> {

  private readonly playlistService = inject(PlaylistService);

  public getItems(params: RequestParams): Observable<Rows<Playlist>> {
    return this.playlistService.getPlaylists(params);
  }

  public searchItem(params: RequestParams): Observable<string[]> {
    return this.playlistService.searchByName(params);
  }
}
