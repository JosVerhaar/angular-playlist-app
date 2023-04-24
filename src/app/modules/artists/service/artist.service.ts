import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../model/artist';
import { Rows } from '../../../base/models/rows';
import { map } from 'rxjs/operators';
import { RequestParams } from '../../../base/models/request-params';
import { BackendHelper } from '../../../base/services/backend-helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends BackendHelper {

  constructor(http: HttpClient) {
    super(http, 'artists');
  }

  public static convertArtist(data: any): Artist {
    return new Artist(data.id, data.name);
  }

  getArtists(params: RequestParams): Observable<Rows<Artist>> {
    return this.http.get(this.requestUrl, {observe: 'response', params: params.toHttpParams()}).pipe(
      map((res: any) => {
        return new Rows<Artist>(this.getTotalCountFromResponse(res), this.getArtistsFromResponse(res))
      }));
  }

  searchByName(params: RequestParams): Observable<string[]> {
    return this.http.get(this.requestUrl, {params: params.toHttpParams()}).pipe(
      map((res: any) => {
        let artistNames: string[] = [];
        res.forEach(data => artistNames.push(data.name));
        return artistNames;
      })
    )
  }

  getArtist(artistId: number): Observable<Artist> {
    return this.http.get(this.requestUrl + `/${artistId}`).pipe(
      map((res: any) => ArtistService.convertArtist(res))
    )
  }

  private getArtistsFromResponse(res: any): Artist[] {
    return res.body.map(data => ArtistService.convertArtist(data))
  }
}
