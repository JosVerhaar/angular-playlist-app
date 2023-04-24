import { AddSongToPlaylistComponent } from './add-song-to-playlist.component';
import { PlaylistService } from '../service/playlist.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistSongsService } from '../service/playlist-songs.service';
import { ToastService } from '../../../base/components/toasts/toast.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Rows } from '../../../base/models/rows';
import { createTestPlaylist, createTestPlaylistSongs, createTestSong } from '../../../test/test-objects';
import { Playlist } from '../model/playlist';
import { EventEmitter } from '@angular/core';
import { PlaylistSongsRequest } from '../model/playlist-songs';

describe('AddSongToPlaylistComponent', () => {
  let component: AddSongToPlaylistComponent;
  let modal: jest.Mocked<NgbActiveModal>;
  let playlistService: jest.Mocked<PlaylistService>;
  let playlistSongsService: jest.Mocked<PlaylistSongsService>;
  let toastService: jest.Mocked<ToastService>;

  let playlists: Playlist[] = [];
  let playlist01: Playlist;

  beforeEach(() => {
    modal = {
      close: jest.fn(),
      dismiss: jest.fn()
    } as any;

    playlist01 = createTestPlaylist();
    playlist01.id = 'uuid-of-playlist';
    playlists = [playlist01, createTestPlaylist()];
    playlistService = {
      getPlaylists: jest.fn().mockReturnValue(of(new Rows(playlists.length, playlists)))
    } as any;

    playlistSongsService = {
      create: jest.fn().mockReturnValue(of(createTestPlaylistSongs()))
    } as any;

    toastService = {
      show: jest.fn(),
      showGeneralError: jest.fn()
    } as any;

    component = new AddSongToPlaylistComponent(new FormBuilder(), modal, playlistService, playlistSongsService,
      toastService);
    component.playlistFormElement = {
      onSubmit: jest.fn(),
      valid: true,
      resetForm: jest.fn(),
      ngSubmit: new EventEmitter()
    } as any;
    component.song = createTestSong();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get all the playlists', () => {
      expect(playlistService.getPlaylists).toHaveBeenCalled();
    });

    it('should have the form defined', () => {
      expect(component.playlistForm).toBeDefined();
    });
  });

  describe('playlist select valueChanges', () => {
    it('should set the selectedPlaylistId', () => {
      component.playlistForm.get('playlist').setValue(987);
      expect(component.selectedPlaylistId).toBe(987);
    });
  });

  describe('checkForm', () => {
    it('should not save when form is not valid', () => {
      component.playlistForm.get('playlist').setValue(null);
      component.checkForm();
      expect(playlistSongsService.create).not.toHaveBeenCalled();
    });

    it('should save the song playlist', () => {
      component.playlistForm.get('playlist').setValue(playlist01.id);
      component.checkForm();
      expect(playlistSongsService.create).toHaveBeenCalledWith(new PlaylistSongsRequest(component.song.id, playlist01.id));
      expect(toastService.show).toHaveBeenCalled();
      expect(modal.close).toHaveBeenCalled();
    });
  });
});
