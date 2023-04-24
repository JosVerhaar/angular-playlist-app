import { Song } from '../modules/artists/model/song';
import { Playlist } from '../modules/playlists/model/playlist';
import { ToastInfo } from '../base/components/toasts/toast.service';
import { RequestParams } from '../base/models/request-params';
import { Artist } from '../modules/artists/model/artist';
import { PlaylistSongs, PlaylistSongsRequest } from '../modules/playlists/model/playlist-songs';

export function createTestSong(): Song {
  return new Song(1046, "(Sittin' on the) Dock of the Bay (Take 2)", 1967, "Otis Redding",
    "dockofthebay", 102, 170025, "R&B/Soul/Funk", "6Ud9fOJQ9ZO2qnsMFPiJsh",
    "Remember Me");
}

export function createTestSongs(numberOf: number = 5): Song[] {
  let songs: Song[] = [];
  for (let i = 0; i < numberOf; i++) {
    songs.push(createTestSong());
  }
  return songs;
}

export function createTestPlaylist(): Playlist {
  return new Playlist('test-UUID-345-897', 'Playlist-name');
}

export function createTestPlaylistSongs(): PlaylistSongs {
  return new PlaylistSongs(1200, 1234, 'some-nice-uuid');
}

export function createTestPlaylistSongsRequest(): PlaylistSongsRequest {
  return new PlaylistSongsRequest(1200, 'some-nice-uuid');
}

export function createTestToast(): ToastInfo {
  return { header: 'Header of Toast', body: 'Body of Toast', type: null, delay: 10000 } as ToastInfo;
}

export function createTestRequestParams(): RequestParams {
  return new RequestParams(1, 10);
}

export function createTestArtist(): Artist {
  return new Artist(1234, 'Artist name');
}
