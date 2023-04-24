import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistService } from './service/artist.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../base/components/components.module';
import { ArtistsOverviewComponent } from './artists-overview/artists-overview.component';
import { ArtistSongsComponent } from './artist-songs/artist-songs.component';

@NgModule({
  declarations: [
    ArtistsOverviewComponent,
    ArtistSongsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
  ],
  providers: [
    ArtistService
  ]
})
export class ArtistsModule {
}
