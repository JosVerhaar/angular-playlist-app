import { ArtistSongsComponent } from './artist-songs.component';
import { SongService } from '../service/song.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../model/song';
import { Rows } from '../../../base/models/rows';
import { of } from 'rxjs';
import { createTestArtist, createTestSongs } from '../../../test/test-objects';
import { RequestParams } from '../../../base/models/request-params';
import { AddSongToPlaylistComponent } from '../../playlists/add-song-to-playlist/add-song-to-playlist.component';
import { Artist } from '../model/artist';

describe('ArtistSongsComponent', () => {
  let component: ArtistSongsComponent;
  let songService: jest.Mocked<SongService>;
  let modalService: jest.Mocked<NgbModal>;
  let activatedRoute: ActivatedRoute;

  let testSongs: Song[];
  let modalMock: any;
  let artistOnRoute: Artist;

  beforeEach(() => {
    testSongs = createTestSongs();
    songService = {
      getSongs: jest.fn().mockReturnValue(of(new Rows(testSongs.length, testSongs))),
    } as any;

    modalMock = {
      result: Promise.resolve(),
      componentInstance: {}
    } as any;
    modalService = {
      open: jest.fn().mockReturnValue(modalMock)
    } as any;

    artistOnRoute = createTestArtist();
    activatedRoute = {
      snapshot: {
        data: {
          artist: Artist
        }
      }
    } as any;
    activatedRoute.snapshot.data.artist = artistOnRoute;

    component = new ArtistSongsComponent(songService, activatedRoute, modalService);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('reload', () => {
    it('should add filter when artist is on route', () => {
      let filters = new Map<string, string>();
      filters.set('artist', artistOnRoute.name);
      const requestParams: RequestParams = new RequestParams(1, 10, undefined, filters);
      expect(songService.getSongs).toHaveBeenCalledWith(requestParams);
    });
  });

  describe('getItems', () => {
    let params: RequestParams;
    beforeEach(() => {
      let filters = new Map<string, string>();
      filters.set('artist', artistOnRoute.name);
      params = new RequestParams(1, 10, undefined, filters);
      component.getItems(params);
    });

    it('should call the service', () => {
      expect(songService.getSongs).toHaveBeenCalledWith(params);
    });

    it('should set the songs and totalRows', () => {
      expect(component.songs).toBe(testSongs);
      expect(component.totalRows).toBe(testSongs.length);
    });
  });

  describe('addSongToPlaylist', () => {
    beforeEach(() => {
      component.addSongToPlaylist(testSongs[0]);
    });

    it('should call the service', () => {
      expect(modalService.open).toHaveBeenCalledWith(AddSongToPlaylistComponent);
    });

    it('should set the song', () => {
      expect(modalMock.componentInstance.song).toBe(testSongs[0]);
    });
  });

  describe('updateRequestParams', () => {
    let testRequestParams: RequestParams;
    beforeEach(() => {
      testRequestParams = new RequestParams(1, 10);
      testRequestParams.filters = new Map<string, string>();
      testRequestParams.filters.set('artist', artistOnRoute.name);
    });

    it('should set default values an creation', () => {
      component.getItems(testRequestParams);
      expect(songService.getSongs).toHaveBeenCalledWith({
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
      expect(songService.getSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the limit', () => {
      testRequestParams.limit = 100;
      component.getItems(testRequestParams);
      expect(songService.getSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the page', () => {
      testRequestParams.limit = 15;
      component.getItems(testRequestParams);
      expect(songService.getSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the searchByName', () => {
      testRequestParams.searchByName = 'Other name to search';
      component.getItems(testRequestParams);
      expect(songService.getSongs).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });
  });
});
