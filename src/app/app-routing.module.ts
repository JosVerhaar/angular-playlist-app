import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { artistsRoutes } from './modules/artists/routes';
import { playlistRoutes } from './modules/playlists/routes';
import { homeRoutes } from './modules/home/routes';

const routes: Routes = [
  ...homeRoutes,
  ...artistsRoutes,
  ...playlistRoutes,
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
