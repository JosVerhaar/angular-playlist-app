import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PlaylistService } from '../service/playlist.service';
import { Playlist } from '../model/playlist';
import { v4 as uuidv4 } from 'uuid';
import { ToastService } from '../../../base/components/toasts/toast.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html'
})
export class CreatePlaylistComponent implements OnInit {

  @ViewChild('playlistFormElement', {static: true}) playlistFormElement: NgForm;

  public playlistForm: UntypedFormGroup;

  constructor(private readonly formBuilder: UntypedFormBuilder, public modal: NgbActiveModal,
              private readonly playlistService: PlaylistService, private readonly toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.playlistForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  private saveNewPlaylist(): void {
    this.playlistService.create(new Playlist(uuidv4(), this.playlistForm.value.name)).subscribe(
      (newPlayList: Playlist) => {
        this.toastService.show({
          header: $localize`Create playlist`,
          body: $localize`You have created a new playlist with the name: ${newPlayList.name}.`
        });
        this.modal.close();
      }, () => {
        this.toastService.showGeneralError();
      });
  }

  public checkForm(): void {
    this.playlistFormElement.onSubmit(new CustomEvent('click'));
    if (!this.playlistForm.valid) {
      return;
    } else {
      this.saveNewPlaylist();
    }
  }

  get name() {
    return this.playlistForm.get('name');
  }

}
