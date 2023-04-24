import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from '../model/song';
import { RequestParams } from '../../../base/models/request-params';
import { Observable } from 'rxjs';
import { Rows } from '../../../base/models/rows';
import { map } from 'rxjs/operators';
import { BackendHelper } from '../../../base/services/backend-helper';

@Injectable({
  providedIn: 'root'
})
export class SongService extends BackendHelper {

  constructor(http: HttpClient) {
    super(http, 'songs');
  }

  public static convertSong(data: any): Song {
    return new Song(data.id, data.name, data.year, data.artist, data.shortName, data.bpm, data.duration, data.genre,
      data.spotifyId, data.album);
  }

  getSongs(params: RequestParams): Observable<Rows<Song>> {
    return this.http.get(this.requestUrl, {observe: 'response', params: params.toHttpParams()}).pipe(
      map((res: any) => {
        return new Rows<Song>(this.getTotalCountFromResponse(res), this.getSongsFromResponse(res))
      }));
  }

  searchByName(params: RequestParams): Observable<string[]> {
    return this.http.get(this.requestUrl, {params: params.toHttpParams()}).pipe(
      map((res: any) => {
        let songNames: string[] = [];
        res.forEach(data => songNames.push(data.name));
        return songNames;
      })
    )
  }

  getSong(songId: number): Observable<Song> {
    return this.http.get(this.requestUrl + `/${songId}`).pipe(
      map((res: any) => SongService.convertSong(res))
    )
  }

  private getSongsFromResponse(res: any): Song[] {
    return res.body.map(data => SongService.convertSong(data));
  }
}
