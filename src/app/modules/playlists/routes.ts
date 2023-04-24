import { Routes } from '@angular/router';
import { PlaylistOverviewComponent } from './playlist-overview/playlist-overview.component';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { PlaylistResolverService } from './service/playlist-resolver.service';

export const playlistRoutes: Routes = [
  {
    path: 'playlist',
    component: PlaylistOverviewComponent
  },
  {
    path: 'playlist/:id/songs',
    component: PlaylistSongsComponent,
    resolve: {
      playlist: PlaylistResolverService
    }
  }
]
