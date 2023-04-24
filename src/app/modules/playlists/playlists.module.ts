import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistOverviewComponent } from './playlist-overview/playlist-overview.component';
import { ComponentsModule } from '../../base/components/components.module';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSongToPlaylistComponent } from './add-song-to-playlist/add-song-to-playlist.component';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PlaylistOverviewComponent,
    CreatePlaylistComponent,
    AddSongToPlaylistComponent,
    PlaylistSongsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class PlaylistsModule { }
