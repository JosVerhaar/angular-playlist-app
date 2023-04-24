import { CreatePlaylistComponent } from './create-playlist.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistService } from '../service/playlist.service';
import { ToastService } from '../../../base/components/toasts/toast.service';
import { Playlist } from '../model/playlist';
import { createTestPlaylist } from '../../../test/test-objects';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('CreatePlaylistComponent', () => {
  let component: CreatePlaylistComponent;
  let modal: jest.Mocked<NgbActiveModal>;
  let playlistService: jest.Mocked<PlaylistService>;
  let toastService: jest.Mocked<ToastService>;

  beforeEach(() => {
    modal = {
      close: jest.fn(),
      dismiss: jest.fn()
    } as any;

    playlistService = {
      create: jest.fn().mockReturnValue(of(createTestPlaylist()))
    } as any;

    toastService = {
      show: jest.fn(),
      showGeneralError: jest.fn()
    } as any;

    component = new CreatePlaylistComponent(new FormBuilder(), modal, playlistService, toastService);
    component.playlistFormElement = {
      onSubmit: jest.fn(),
      valid: true,
      resetForm: jest.fn(),
      ngSubmit: new EventEmitter()
    } as any;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should have the form defined', () => {
      expect(component.playlistForm).toBeDefined();
    });
  });

  describe('checkForm', () => {
    it('should not save when form is not valid', () => {
      component.playlistForm.get('name').setValue(null);
      component.checkForm();
      expect(playlistService.create).not.toHaveBeenCalled();
    });

    it('should save the song playlist', () => {
      component.playlistForm.get('name').setValue('New name for playlist');
      component.checkForm();
      expect(playlistService.create).toHaveBeenCalledWith(new Playlist(expect.anything(), 'New name for playlist'));
      expect(toastService.show).toHaveBeenCalled();
      expect(modal.close).toHaveBeenCalled();
    });
  });
});
