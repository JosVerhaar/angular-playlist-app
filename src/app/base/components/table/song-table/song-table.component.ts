import { Component, Input, TemplateRef } from '@angular/core';
import { Song } from '../../../../modules/artists/model/song';
import { $localize } from '@angular/localize/init';
import { ToastService } from '../../toasts/toast.service';
import { Playlist } from '../../../../modules/playlists/model/playlist';
import { ArtistService } from '../../../../modules/artists/service/artist.service';

interface HandleSongTableActions {
  deletedSong: Song,
  playlist: Playlist
}

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html'
})
export class SongTableComponent {

  @Input() songs: Song[] = [];
  @Input() rowActionsTemplate: TemplateRef<any>;

  constructor(private readonly toastService: ToastService) {
  }

  public handleSongDeleteSuccess(handleSongTableActions: HandleSongTableActions): void {
    this.toastService.show({
      header: $localize`Song deleted`,
      body: $localize`You have deleted ${handleSongTableActions.deletedSong.name} from ${handleSongTableActions.playlist.name}.`
    });
  }

  public handleSongDeleteFailed(): void {
    this.toastService.showGeneralError();
  }

}
