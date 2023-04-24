import { SongTableComponent } from './song-table.component';
import { ToastService } from '../../toasts/toast.service';
import { Song } from '../../../../modules/artists/model/song';
import { Playlist } from '../../../../modules/playlists/model/playlist';
import { createTestPlaylist, createTestSong } from '../../../../test/test-objects';
import { $localize } from '@angular/localize/init';

describe('SongTableComponent', () => {
  let component: SongTableComponent;
  let toastService: jest.Mocked<ToastService>;
  let song: Song;
  let playlist: Playlist;

  beforeEach(() => {
    toastService = {
      show: jest.fn(),
      showGeneralError: jest.fn()
    } as any;

    song = createTestSong();
    playlist = createTestPlaylist();

    component = new SongTableComponent(toastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleSongDeleteSuccess should call toastService', () => {
    component.handleSongDeleteSuccess({deletedSong: song, playlist: playlist});
    expect(toastService.show).toHaveBeenCalledWith({
      header: $localize`Song deleted`,
      body: $localize`You have deleted ${song.name} from ${playlist.name}.`
    });
  });

  it('handleSongDeleteFailed should call toastService', () => {
    component.handleSongDeleteFailed();
    expect(toastService.showGeneralError).toHaveBeenCalled();
  });
});
