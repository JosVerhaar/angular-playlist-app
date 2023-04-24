import { PlaylistResolverService } from './playlist-resolver.service';
import { PlaylistService } from './playlist.service';
import { Observable, of } from 'rxjs';
import { createTestPlaylist } from '../../../test/test-objects';
import { RouterStateSnapshot } from '@angular/router';
import { Playlist } from '../model/playlist';

describe('PlaylistResolverService', () => {
  let service: PlaylistResolverService;
  let playlistService: jest.Mocked<PlaylistService>;
  let route: any;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    playlistService = {
      getPlaylist: jest.fn().mockReturnValue(of(createTestPlaylist()))
    } as any;

    service = new PlaylistResolverService(playlistService);
  });

  describe('resolve', () => {
    it('should resolve by id', (done) => {
      route = {params: {id: 'test-UUID-345-897'}};
      (<Observable<Playlist>>service.resolve(route, state)).subscribe((value) => {
        expect(value.id).toBe('test-UUID-345-897');
        done();
      });
    });

    it('should not resolve by no id', (done) => {
      route = {params: {}};
      (<Observable<Playlist>>service.resolve(route, state)).subscribe((value) => {
        expect(value).toBeNull();
        done();
      });
    });
  });
});
