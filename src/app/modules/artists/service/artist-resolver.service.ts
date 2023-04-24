import { inject, Injectable } from '@angular/core';
import { Artist } from '../model/artist';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArtistService } from './artist.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistResolverService implements Resolve<Artist>{

  constructor(private readonly artistService: ArtistService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Artist> | Promise<Artist> | Artist {
    const artistId: number = Number(route.params['id']);
    if (!artistId) {
      return of(null);
    } else {
      return this.artistService.getArtist(artistId);
    }
  }
}
