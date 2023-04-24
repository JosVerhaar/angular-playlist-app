import { Routes } from '@angular/router';
import { ArtistsOverviewComponent } from './artists-overview/artists-overview.component';
import { ArtistSongsComponent } from './artist-songs/artist-songs.component';
import { ArtistResolverService } from './service/artist-resolver.service';

export const artistsRoutes: Routes = [
  {
    path: 'artist',
    component: ArtistsOverviewComponent
  },
  {
    path: 'artist/:id/songs',
    component: ArtistSongsComponent,
    resolve: {
      artist: ArtistResolverService
    }
  }
];
