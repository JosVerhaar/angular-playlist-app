import { ArtistsOverviewComponent } from './artists-overview.component';
import { ArtistService } from '../service/artist.service';
import { Rows } from '../../../base/models/rows';
import { Artist } from '../model/artist';
import { createTestArtist, createTestRequestParams } from '../../../test/test-objects';
import { RequestParams } from '../../../base/models/request-params';
import { of } from 'rxjs';

describe('ArtistsOverviewComponent', () => {
  let component: ArtistsOverviewComponent;
  let artistService: jest.Mocked<ArtistService>;

  let artists: Artist[];

  beforeEach(() => {
    artists = [createTestArtist(), createTestArtist()];
    artistService = {
      getArtists: jest.fn().mockReturnValue(of(new Rows(artists.length, artists)))
    } as any;

    component = new ArtistsOverviewComponent(artistService);
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
      expect(artistService.getArtists).toHaveBeenCalledWith(params);
    });

    it('should set the artists and totalRows', () => {
      expect(component.artists).toBe(artists);
      expect(component.totalRows).toBe(artists.length);
    });
  });

  describe('updateRequestParams', () => {
    let testRequestParams: RequestParams;
    beforeEach(() => {
      testRequestParams = new RequestParams(1, 10);
    });

    it('should set default values an creation', () => {
      component.getItems(testRequestParams);
      expect(artistService.getArtists).toHaveBeenCalledWith({
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
      expect(artistService.getArtists).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the limit', () => {
      testRequestParams.limit = 100;
      component.getItems(testRequestParams);
      expect(artistService.getArtists).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the page', () => {
      testRequestParams.limit = 15;
      component.getItems(testRequestParams);
      expect(artistService.getArtists).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });

    it('should override the searchByName', () => {
      testRequestParams.searchByName = 'Other name to search';
      component.getItems(testRequestParams);
      expect(artistService.getArtists).toHaveBeenCalledWith({
        "filters": testRequestParams.filters,
        "limit": testRequestParams.limit,
        "page": testRequestParams.page,
        "searchByName": testRequestParams.searchByName
      });
    });
  });
});
