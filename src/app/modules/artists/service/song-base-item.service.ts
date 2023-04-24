import { inject, Injectable } from '@angular/core';
import { BaseItemService } from '../../../base/services/base-item.service';
import { Song } from '../model/song';
import { SongService } from './song.service';
import { Rows } from '../../../base/models/rows';
import { Observable } from 'rxjs';
import { RequestParams } from '../../../base/models/request-params';

@Injectable({
  providedIn: 'root'
})
export class SongBaseItemService extends BaseItemService<Song> {

  private readonly songService = inject(SongService);

  public getItems(params: RequestParams): Observable<Rows<Song>> {
    return this.songService.getSongs(params);
  }

  public searchItem(params: RequestParams): Observable<string[]> {
    return this.songService.searchByName(params);
  }
}
