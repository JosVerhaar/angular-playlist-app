import { PlaylistOverviewComponent } from './playlist-overview.component';
import { PlaylistService } from '../service/playlist.service';
import { ToastService } from '../../../base/components/toasts/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { RequestParams } from '../../../base/models/request-params';
import { createTestPlaylist, createTestRequestParams } from '../../../test/test-objects';
import { Playlist } from '../model/playlist';
import { Rows } from '../../../base/models/rows';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';

describe('PlaylistOverviewComponent', () => {
  let component: PlaylistOverviewComponent;
  let playlistService: jest.Mocked<PlaylistService>;
  let toastService: jest.Mocked<ToastService>;
  let modalService: jest.Mocked<NgbModal>;

  let playlists: Playlist[] = [];
  let modalMock: any;

  beforeEach(() => {

    playlists = [createTestPlaylist(), createTestPlaylist()];
    playlistService = {
      getPlaylists: jest.fn().mockReturnValue(of(new Rows(playlists.length, playlists))),
      delete: jest.fn().mockReturnValue(of({}))
    } as any;

    toastService = {
      show: jest.fn(),
      showGeneralError: jest.fn()
    } as any;

    modalMock = {
      result: Promise.resolve(),
      componentInstance: {}
    } as any;
    modalService = {
      open: jest.fn().mockReturnValue(modalMock)
    } as any;

    component = new PlaylistOverviewComponent(playlistService, toastService, modalService);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getItems', () => {
    let params: RequestParams;
    beforeEach(() => {
      params = createTestRequestParams();
      component.getItems(params);
    });

    it('should call the service', () => {
      expect(playlistService.getPlaylists).toHaveBeenCalledWith(params);
    });

    it('should set the artists and totalRows', () => {
      expect(component.playlists).toBe(playlists);
      expect(component.totalRows).toBe(playlists.length);
    });
  });

  describe('deletePlaylist', () => {
    let playListToDelete;
    beforeEach(() => {
      playListToDelete = createTestPlaylist();
      component.deletePlaylist(playListToDelete);
    });

    it('should call the service', () => {
      expect(playlistService.delete).toHaveBeenCalledWith(playListToDelete);
    });

    it('should call the toast service', () => {
      expect(toastService.show).toHaveBeenCalled();
    });

    it('should fetch the data again', () => {
      expect(playlistService.getPlaylists).toHaveBeenCalled();
    });
  });

  describe('createPlaylist', () => {
    it('should open the modal', () => {
      component.createPlaylist();
      expect(modalService.open).toHaveBeenCalledWith(CreatePlaylistComponent);
    });
  });

  describe('updateRequestParams', () => {
    let testRequestParams: RequestParams;
    beforeEach(() => {
      testRequestParams = new RequestParams(1, 10);
    });

    it('should set default values an creation', () => {
      component.getItems(testRequestParams);
      expect(playlistService.getPlaylists).toHaveBeenCalledWith({
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
      expect(playlistService.getPlaylists).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the limit', () => {
      testRequestParams.limit = 100;
      component.getItems(testRequestParams);
      expect(playlistService.getPlaylists).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the page', () => {
      testRequestParams.limit = 15;
      component.getItems(testRequestParams);
      expect(playlistService.getPlaylists).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the searchByName', () => {
      testRequestParams.searchByName = 'Other name to search';
      component.getItems(testRequestParams);
      expect(playlistService.getPlaylists).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });
  });
});
