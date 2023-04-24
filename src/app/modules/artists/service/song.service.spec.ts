import { SongService } from './song.service';
import { HttpClient } from '@angular/common/http';
import { createTestRequestParams } from '../../../test/test-objects';
import { of } from 'rxjs';
import { BACKEND_API_BASE_URL } from '../../../base/services/backend-helper';

describe('SongService', () => {
  let service: SongService;
  let http: jest.Mocked<HttpClient>;

  beforeEach(() => {
    http = {
      get: jest.fn()
    } as any;

    service = new SongService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSongs', () => {
    let params = createTestRequestParams();
    params.searchByName = 'Name of song';
    params.filters = new Map<string, string>();
    params.filters.set('filter01', 'value01');
    params.filters.set('filter02', 'value02');
    beforeEach(() => {
      http.get.mockReturnValue(of([{
        "id": 2283,
        "name": "My Own Eyes",
        "year": 2014,
        "artist": "\"Weird Al\" Yankovic",
        "shortname": "myowneyes",
        "bpm": 152,
        "duration": 225834,
        "genre": "Novelty",
        "spotifyId": "4zrFUqfb57yiRbVGUCeM6H",
        "album": "Mandatory Fun"
      }, {
        "id": 2284,
        "name": "My Own Eyes",
        "year": 2014,
        "artist": "\"Weird Al\" Yankovic",
        "shortname": "myowneyes",
        "bpm": 152,
        "duration": 225834,
        "genre": "Novelty",
        "spotifyId": "4zrFUqfb57yiRbVGUCeM6H",
        "album": "Mandatory Fun"
      }]));
      service.getSongs(params);
    });

    it('should call to the right endpoint', () => {
      const calledUrl = http.get.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + 'songs');
    });

    it('should send the correct params', () => {
      const requestParams = http.get.mock.calls[0][1].params['updates'];
      expect(requestParams[0].param).toEqual('_page');
      expect(requestParams[0].value).toEqual('1');
      expect(requestParams[1].param).toEqual('_limit');
      expect(requestParams[1].value).toEqual('10');
      expect(requestParams[2].param).toEqual('name_like');
      expect(requestParams[2].value).toEqual('Name of song');
      expect(requestParams[3].param).toEqual('filter01');
      expect(requestParams[3].value).toEqual('value01');
      expect(requestParams[4].param).toEqual('filter02');
      expect(requestParams[4].value).toEqual('value02');
    });
  });

  describe('searchByName', () => {
    let params = createTestRequestParams();
    params.searchByName = 'Name of song';
    beforeEach(() => {
      http.get.mockReturnValue(of([{
        "id": 2283,
        "name": "My Own Eyes",
        "year": 2014,
        "artist": "\"Weird Al\" Yankovic",
        "shortname": "myowneyes",
        "bpm": 152,
        "duration": 225834,
        "genre": "Novelty",
        "spotifyId": "4zrFUqfb57yiRbVGUCeM6H",
        "album": "Mandatory Fun"
      }, {
        "id": 2284,
        "name": "My Own Eyes",
        "year": 2014,
        "artist": "\"Weird Al\" Yankovic",
        "shortname": "myowneyes",
        "bpm": 152,
        "duration": 225834,
        "genre": "Novelty",
        "spotifyId": "4zrFUqfb57yiRbVGUCeM6H",
        "album": "Mandatory Fun"
      }]));
    });

    it('should return an array with the names of the artists', (done) => {
      service.searchByName(params).subscribe((result) => {
        expect(result.length).toBe(2);
        expect(result).toEqual(['My Own Eyes', 'My Own Eyes']);
        done();
      });
    });
  });

  describe('getSong', () => {
    it('should call the right endpoint', () => {
      http.get.mockReturnValue(of({
        "id": 1200,
        "name": "My Own Eyes",
        "year": 2014,
        "artist": "\"Weird Al\" Yankovic",
        "shortname": "myowneyes",
        "bpm": 152,
        "duration": 225834,
        "genre": "Novelty",
        "spotifyId": "4zrFUqfb57yiRbVGUCeM6H",
        "album": "Mandatory Fun"
      }));
      service.getSong(1200);
      const calledUrl = http.get.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + 'songs/1200');
    });
  });
});
