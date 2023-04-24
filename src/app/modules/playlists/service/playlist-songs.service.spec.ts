import { PlaylistSongsService } from './playlist-songs.service';
import { HttpClient } from '@angular/common/http';
import {
  createTestPlaylistSongs,
  createTestPlaylistSongsRequest,
  createTestRequestParams
} from '../../../test/test-objects';
import { of } from 'rxjs';
import { BACKEND_API_BASE_URL } from '../../../base/services/backend-helper';

describe('PlaylistSongsService', () => {
  let service: PlaylistSongsService;
  let http: jest.Mocked<HttpClient>;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      delete: jest.fn().mockReturnValue(of({})),
      post: jest.fn().mockReturnValue(of({"id": 1, "songId": 1200, "playlistId": "63de05fd-7ec2-4b0f-8164-a3d06e1dd934"}))
    } as any;

    service = new PlaylistSongsService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPlaylistSongs', () => {
    let params = createTestRequestParams();
    params.filters = new Map<string, string>();
    params.filters.set('filter01', 'value01');
    params.filters.set('filter02', 'value02');
    beforeEach(() => {
      http.get.mockReturnValue(of([
        {"id": 1, "songId": 1200, "playlistId": "63de05fd-7ec2-4b0f-8164-a3d06e1dd934"},
        {"id": 1, "songId": 1200, "playlistId": "63de05fd-7ec2-4b0f-8164-a3d06e1dd934"}
      ]));
      service.getPlaylistSongs(params);
    });

    it('should call to the right endpoint', () => {
      const calledUrl = http.get.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + 'playlist-songs');
    });

    it('should send the correct params', () => {
      const requestParams = http.get.mock.calls[0][1].params['updates'];
      expect(requestParams[0].param).toEqual('_page');
      expect(requestParams[0].value).toEqual('1');
      expect(requestParams[1].param).toEqual('_limit');
      expect(requestParams[1].value).toEqual('10');
      expect(requestParams[2].param).toEqual('filter01');
      expect(requestParams[2].value).toEqual('value01');
      expect(requestParams[3].param).toEqual('filter02');
      expect(requestParams[3].value).toEqual('value02');
    });
  });

  describe('create', () => {
    it('should call the right end point', () => {
      const playlistSongRequest = createTestPlaylistSongsRequest();
      service.create(playlistSongRequest);
      const calledUrl = http.post.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + `playlist-songs`);
    });
  });

  describe('remove', () => {
    it('should call the right end point', () => {
      const playlistSongsToDelete = createTestPlaylistSongs();
      service.remove(playlistSongsToDelete);
      const calledUrl = http.delete.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + `playlist-songs/${playlistSongsToDelete.id}`);
    });
  });
});
