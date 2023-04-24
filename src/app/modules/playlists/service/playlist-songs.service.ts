import { Injectable } from '@angular/core';
import { PlaylistSongs, PlaylistSongsRequest } from '../model/playlist-songs';
import { BackendHelper } from '../../../base/services/backend-helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestParams } from '../../../base/models/request-params';
import { Rows } from '../../../base/models/rows';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistSongsService extends BackendHelper {

  constructor(http: HttpClient) {
    super(http, 'playlist-songs');
  }

  public static convertPlaylistSongs(data: any): PlaylistSongs {
    return new PlaylistSongs(data.id, data.songId, data.playlistId);
  }

  getPlaylistSongs(params: RequestParams): Observable<Rows<PlaylistSongs>> {
    return this.http.get(this.requestUrl, {observe: 'response', params: params.toHttpParams()}).pipe(
      map((res: any) => {
        return new Rows<PlaylistSongs>(this.getTotalCountFromResponse(res), this.getPlaylistSongsFromResponse(res))
      })
    )
  }

  create(playlistSongRequest: PlaylistSongsRequest): Observable<PlaylistSongs> {
    return this.http.post(this.requestUrl, playlistSongRequest).pipe(
      map(res => PlaylistSongsService.convertPlaylistSongs(res))
    );
  }

  remove(playlistSongs: PlaylistSongs): Observable<{}> {
    return this.http.delete(this.requestUrl + `/${playlistSongs.id}`);
  }

  private getPlaylistSongsFromResponse(res: any): PlaylistSongs[] {
    return res.body.map(data => PlaylistSongsService.convertPlaylistSongs(data));
  }
}
