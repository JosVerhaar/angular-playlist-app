import { PlaylistSongsComponent } from './playlist-songs.component';
import { SongService } from '../../artists/service/song.service';
import { ActivatedRoute } from '@angular/router';
import { PlaylistSongsService } from '../service/playlist-songs.service';
import { createTestPlaylist, createTestPlaylistSongs, createTestSong } from '../../../test/test-objects';
import { Playlist } from '../model/playlist';
import { of } from 'rxjs';
import { PlaylistSongs } from '../model/playlist-songs';
import { Rows } from '../../../base/models/rows';
import { RequestParams } from '../../../base/models/request-params';

describe('PlaylistSongsComponent', () => {
  let component: PlaylistSongsComponent;
  let songService: jest.Mocked<SongService>;
  let playlistSongsService: jest.Mocked<PlaylistSongsService>;
  let activatedRoute: ActivatedRoute;

  let playlistOnRoute: Playlist;
  let playlistSongs: PlaylistSongs[] = [];

  beforeEach(() => {
    playlistSongs = [createTestPlaylistSongs(), createTestPlaylistSongs()];
    playlistSongsService = {
      getPlaylistSongs: jest.fn().mockReturnValue(of(new Rows(playlistSongs.length, playlistSongs))),
      remove: jest.fn().mockReturnValue(of({}))
    } as any;

    songService = {
      getSong: jest.fn().mockReturnValue(of(createTestSong()))
    } as any;

    playlistOnRoute = createTestPlaylist();
    activatedRoute = {
      snapshot: {
        data: {
          playlist: playlistOnRoute
        }
      }
    } as any;
    activatedRoute.snapshot.data.playlist = playlistOnRoute;

    component = new PlaylistSongsComponent(activatedRoute, playlistSongsService, songService);
    component.songTable = {
      handleSongDeleteSuccess: jest.fn()
    } as any;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getItems', () => {
    let params: RequestParams;
    beforeEach(() => {
      let filters = new Map<string, string>();
      filters.set('playlistId', playlistOnRoute.id);
      params = new RequestParams(1, 10, undefined, filters);
      component.getItems(params);
    });

    it('should call the service', () => {
      expect(playlistSongsService.getPlaylistSongs).toHaveBeenCalledWith(params);
    });

    it('should set the songs and totalRows', () => {
      expect(component.playlistSongs).toBe(playlistSongs);
      expect(component.totalRows).toBe(playlistSongs.length);
    });
  });

  describe('removeSongFromPlaylist', () => {
    it('should call the service', () => {
      let songToRemove = createTestSong();
      songToRemove.id = createTestPlaylistSongs().songId;
      component.removeSongFromPlaylist(songToRemove);
      expect(component.songTable.handleSongDeleteSuccess).toHaveBeenCalled();
      expect(playlistSongsService.getPlaylistSongs).toHaveBeenCalled();
    })
  });

  describe('updateRequestParams', () => {
    let testRequestParams: RequestParams;
    beforeEach(() => {
      testRequestParams = new RequestParams(1, 10);
      testRequestParams.filters = new Map<string, string>();
      testRequestParams.filters.set('playlistId', playlistOnRoute.id);
    });

    it('should set default values an creation', () => {
      component.getItems(testRequestParams);
      expect(playlistSongsService.getPlaylistSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the filters', () => {
      testRequestParams.filters = new Map<string, string>();
      testRequestParams.filters.set('filterKey 01', 'filterValue 01');
      testRequestParams.filters.set('filterKey 02', 'filterValue 02');
      component.getItems(testRequestParams);
      expect(playlistSongsService.getPlaylistSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the limit', () => {
      testRequestParams.limit = 100;
      component.getItems(testRequestParams);
      expect(playlistSongsService.getPlaylistSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the page', () => {
      testRequestParams.limit = 15;
      component.getItems(testRequestParams);
      expect(playlistSongsService.getPlaylistSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the searchByName', () => {
      testRequestParams.searchByName = 'Other name to search';
      component.getItems(testRequestParams);
      expect(playlistSongsService.getPlaylistSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });
  });
});
