import { Injectable } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { Playlist } from '../model/playlist';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolverService implements Resolve<Playlist> {

  constructor(private readonly playlistService: PlaylistService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Playlist> | Promise<Playlist> | Playlist {
    const playlistId: string = route.params['id'];
    if (!playlistId) {
      return of(null);
    } else {
      return this.playlistService.getPlaylist(playlistId);
    }
  }
}
