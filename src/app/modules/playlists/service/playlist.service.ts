import { Injectable } from '@angular/core';
import { BackendHelper } from '../../../base/services/backend-helper';
import { Playlist } from '../model/playlist';
import { RequestParams } from '../../../base/models/request-params';
import { Observable } from 'rxjs';
import { Rows } from '../../../base/models/rows';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BackendHelper {

  constructor(http: HttpClient) {
    super(http, 'playlists');
  }

  public static convertPlaylist(data: any): Playlist {
    return new Playlist(data.id, data.name);
  }

  getPlaylists(params: RequestParams): Observable<Rows<Playlist>> {
    return this.http.get(this.requestUrl, {observe: 'response', params: params.toHttpParams()}).pipe(
      map((res: any) => {
        return new Rows<Playlist>(this.getTotalCountFromResponse(res), this.getPlaylistsFromResponse(res))
      }));
  }

  searchByName(params: RequestParams): Observable<string[]> {
    return this.http.get(this.requestUrl, {params: params.toHttpParams()}).pipe(
      map((res: any) => {
        let playlistNames: string[] = [];
        res.forEach(data => playlistNames.push(data.name));
        return playlistNames;
      })
    )
  }

  delete(playlist: Playlist): Observable<{}> {
    return this.http.delete(this.requestUrl + `/${playlist.id}`);
  }

  create(playlist: Playlist): Observable<Playlist> {
    return this.http.post(this.requestUrl, playlist).pipe(
      map(res => PlaylistService.convertPlaylist(res))
    );
  }

  getPlaylist(playlistId: string): Observable<Playlist> {
    return this.http.get(this.requestUrl + `/${playlistId}`).pipe(
      map((res: any) => PlaylistService.convertPlaylist(res))
    )
  }

  private getPlaylistsFromResponse(res: any): Playlist[] {
    return res.body.map(data => PlaylistService.convertPlaylist(data))
  }
}
