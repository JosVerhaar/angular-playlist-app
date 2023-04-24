import { ArtistResolverService } from './artist-resolver.service';
import { ArtistService } from './artist.service';
import { createTestArtist } from '../../../test/test-objects';
import { Observable, of } from 'rxjs';
import { RouterStateSnapshot } from '@angular/router';
import { Artist } from '../model/artist';

describe('ArtistResolverService', () => {
  let service: ArtistResolverService;
  let artistService: jest.Mocked<ArtistService>;
  let route: any;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    artistService = {
      getArtist: jest.fn().mockReturnValue(of(createTestArtist()))
    } as any;

    service = new ArtistResolverService(artistService);
  });

  describe('resolve', () => {
    it('should resolve by id', (done) => {
      route = { params: { id: 1234 } };
      (<Observable<Artist>>service.resolve(route, state)).subscribe((value) => {
        expect(value.id).toBe(1234);
        done();
      });
    });

    it('should not resolve by no id', (done) => {
      route = { params: { } };
      (<Observable<Artist>>service.resolve(route, state)).subscribe((value) => {
        expect(value).toBeNull();
        done();
      });
    });
  });
});
