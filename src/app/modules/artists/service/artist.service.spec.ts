import { ArtistService } from './artist.service';
import { createTestRequestParams } from '../../../test/test-objects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { BACKEND_API_BASE_URL } from '../../../base/services/backend-helper';

describe('ArtistService', () => {
  let service: ArtistService;
  let http: jest.Mocked<HttpClient>;

  beforeEach(() => {
    http = {
      get: jest.fn()
    } as any;

    service = new ArtistService(http);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getArtists', () => {
    let params = createTestRequestParams();
    params.searchByName = 'Name of artist';
    params.filters = new Map<string, string>();
    params.filters.set('filter01', 'value01');
    params.filters.set('filter02', 'value02');
    beforeEach(() => {
      http.get.mockReturnValue(of([{'id': 760, 'name': 'artist01'}, {'id': 780, 'name': 'artist02'}]));
      service.getArtists(params);
    });

    it('should call to the right endpoint', () => {
      const calledUrl = http.get.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + 'artists');
    });

    it('should send the correct params', () => {
      const requestParams = http.get.mock.calls[0][1].params['updates'];
      expect(requestParams[0].param).toEqual('_page');
      expect(requestParams[0].value).toEqual('1');
      expect(requestParams[1].param).toEqual('_limit');
      expect(requestParams[1].value).toEqual('10');
      expect(requestParams[2].param).toEqual('name_like');
      expect(requestParams[2].value).toEqual('Name of artist');
      expect(requestParams[3].param).toEqual('filter01');
      expect(requestParams[3].value).toEqual('value01');
      expect(requestParams[4].param).toEqual('filter02');
      expect(requestParams[4].value).toEqual('value02');
    });
  });

  describe('searchByName', () => {
    let params = createTestRequestParams();
    params.searchByName = 'Name of artist';
    beforeEach(() => {
      http.get.mockReturnValue(of([{'id': 760, 'name': 'artist01'}, {'id': 780, 'name': 'artist02'}]));
    });

    it('should return an array with the names of the artists', (done) => {
      service.searchByName(params).subscribe((result) => {
        expect(result.length).toBe(2);
        expect(result).toEqual(['artist01', 'artist02']);
        done();
      });
    });
  });

  describe('getArtist', () => {
    it('should call the right endpoint', () => {
      http.get.mockReturnValue(of({'id': 1200, 'name': 'artist01'}));
      service.getArtist(1200);
      const calledUrl = http.get.mock.calls[0][0];
      expect(calledUrl).toEqual(BACKEND_API_BASE_URL + 'artists/1200');
    });
  });
});
