import { inject, Injectable } from '@angular/core';
import { BaseItemService } from '../../../base/services/base-item.service';
import { SongService } from '../../artists/service/song.service';
import { RequestParams } from '../../../base/models/request-params';
import { Observable } from 'rxjs';
import { Rows } from '../../../base/models/rows';
import { PlaylistSongsService } from './playlist-songs.service';
import { PlaylistSongs } from '../model/playlist-songs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistSongsBaseItemService extends BaseItemService<PlaylistSongs> {

  private readonly playlistSongsService = inject(PlaylistSongsService);
  private readonly songService = inject(SongService);

  public getItems(params: RequestParams): Observable<Rows<PlaylistSongs>> {
    return this.playlistSongsService.getPlaylistSongs(params);
  }

  public searchItem(params: RequestParams): Observable<string[]> {
    return this.songService.searchByName(params);
  }
}
