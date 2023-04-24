import { inject, Injectable } from '@angular/core';
import { BaseItemService } from '../../../base/services/base-item.service';
import { Artist } from '../model/artist';
import { ArtistService } from './artist.service';
import { RequestParams } from '../../../base/models/request-params';
import { Observable } from 'rxjs';
import { Rows } from '../../../base/models/rows';

@Injectable()
export class ArtistBaseItemService extends BaseItemService<Artist> {

  private readonly artistService = inject(ArtistService);

  public getItems(params: RequestParams): Observable<Rows<Artist>> {
    return this.artistService.getArtists(params);
  }

  public searchItem(params: RequestParams): Observable<string[]> {
    return this.artistService.searchByName(params);
  }
}
