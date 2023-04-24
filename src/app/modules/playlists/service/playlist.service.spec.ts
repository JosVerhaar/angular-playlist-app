import { PlaylistService } from './playlist.service';
import { HttpClient } from '@angular/common/http';
import { createTestPlaylist, createTestRequestParams } from '../../../test/test-objects';
import { of } from 'rxjs';
import { BACKEND_API_BASE_URL } from '../../../base/services/backend-helper';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let http: jest.Mocked<HttpClient>;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      delete: jest.fn().mockReturnValue(of({})),
      post: jest.fn().mockReturnValue(of({ "id": "a5cba0e7-8e34-45b3-9eb5-061477d1023a", "name": "Tweede lijst"}))
    } as any;

    service = new PlaylistService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPlaylists', () => {
    let params = createTestRequestParams();
    params.searchByName = 'Name of playlist';
    params.filters = new Map<string, string>();
    params.filters.set('filter01', 'value01');
    params.filters.set('filter02', 'value02');
    beforeEach(() => {
      http.get.mockReturnValue(of([{
        "id": "a5cba0e7-8e34-45b3-9eb5-061477d1023a",
        "name": "Tweede lijst"
      },
        {
          "id": "1bea9ea0-e324-43f7-8dd0-6f04c81f6461",
          "name": "Lege lijst"
        }]));
      service.getPlaylists(params);
    });

    it('should call to the right endpoint', () => {
      const calledUrl = http.get.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + 'playlists');
    });

    it('should send the correct params', () => {
      const requestParams = http.get.mock.calls[0][1].params['updates'];
      expect(requestParams[0].param).toEqual('_page');
      expect(requestParams[0].value).toEqual('1');
      expect(requestParams[1].param).toEqual('_limit');
      expect(requestParams[1].value).toEqual('10');
      expect(requestParams[2].param).toEqual('name_like');
      expect(requestParams[2].value).toEqual('Name of playlist');
      expect(requestParams[3].param).toEqual('filter01');
      expect(requestParams[3].value).toEqual('value01');
      expect(requestParams[4].param).toEqual('filter02');
      expect(requestParams[4].value).toEqual('value02');
    });
  });

  describe('searchByName', () => {
    let params = createTestRequestParams();
    params.searchByName = 'Name of playlist';
    beforeEach(() => {
      http.get.mockReturnValue(of([{
        "id": "a5cba0e7-8e34-45b3-9eb5-061477d1023a",
        "name": "Tweede lijst"
      },
        {
          "id": "1bea9ea0-e324-43f7-8dd0-6f04c81f6461",
          "name": "Lege lijst"
        }]));
    });

    it('should return an array with the names of the playlist', (done) => {
      service.searchByName(params).subscribe((result) => {
        expect(result.length).toBe(2);
        expect(result).toEqual(['Tweede lijst', 'Lege lijst']);
        done();
      });
    });
  });

  describe('delete', () => {
    it('should call the right end point', () => {
      const playlistToDelete = createTestPlaylist();
      service.delete(playlistToDelete);
      const calledUrl = http.delete.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + `playlists/${playlistToDelete.id}`);
    });
  });

  describe('create', () => {
    it('should call the right end point', () => {
      const playlistToCreate = createTestPlaylist();
      service.create(playlistToCreate);
      const calledUrl = http.post.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + `playlists`);
    });
  });

  describe('getPlaylist', () => {
    it('should call the right endpoint', () => {
      http.get.mockReturnValue(of({
        "id": "1bea9ea0-e324-43f7-8dd0-6f04c81f6461",
        "name": "Lege lijst"
      }));
      service.getPlaylist('1bea9ea0-e324-43f7-8dd0-6f04c81f6461');
      const calledUrl = http.get.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + `playlists/1bea9ea0-e324-43f7-8dd0-6f04c81f6461`);
    });
  });
});
