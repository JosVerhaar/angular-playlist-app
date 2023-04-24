import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaylistService } from '../service/playlist.service';
import { ToastService } from '../../../base/components/toasts/toast.service';
import { Song } from '../../artists/model/song';
import { Playlist } from '../model/playlist';
import { RequestParams } from '../../../base/models/request-params';
import { Rows } from '../../../base/models/rows';
import { PlaylistSongsService } from '../service/playlist-songs.service';
import { PlaylistSongsRequest } from '../model/playlist-songs';
import { $localize } from '@angular/localize/init';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-song-to-playlist',
  templateUrl: './add-song-to-playlist.component.html'
})
export class AddSongToPlaylistComponent implements OnInit, OnDestroy {

  @ViewChild('playlistFormElement', {static: true}) playlistFormElement: NgForm;

  @Input() song: Song;

  public playlistForm: UntypedFormGroup;
  public playlists: Playlist[] = [];
  public selectedPlaylistId: string;

  private subscriptions: Subscription[] = [];

  constructor(private readonly formBuilder: UntypedFormBuilder, public modal: NgbActiveModal,
              private readonly playlistService: PlaylistService, private readonly playlistSongsService: PlaylistSongsService,
              private readonly toastService: ToastService) {
  }

  ngOnInit(): void {
    this.playlistService.getPlaylists(new RequestParams(0, 0)).subscribe(
      (response: Rows<Playlist>) => this.playlists = response.rows );
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initForm(): void {
    this.playlistForm = this.formBuilder.group({
      playlist: [null, [Validators.required]]
    });

    this.subscriptions.push(
      this.playlistForm.get('playlist').valueChanges.subscribe(
        (playlistId: string) => this.selectedPlaylistId = playlistId)
    );
  }

  private saveSongToPlaylist(): void {
    this.playlistSongsService.create(new PlaylistSongsRequest(this.song.id, this.selectedPlaylistId)).subscribe(
      () => {
        const coupledPlaylist: Playlist[] = this.playlists.filter((playlist) => playlist.id === this.selectedPlaylistId);
        this.toastService.show({
          header: $localize `Song added`,
          body: $localize `You have added ${ this.song.name } to ${ coupledPlaylist[0].name }.`
        });
        this.modal.close();
      }, () => {
        this.toastService.showGeneralError();
      });
  }

  public checkForm(): void {
    this.playlistFormElement.onSubmit(new CustomEvent('Click'));
    if (!this.playlistForm.valid) {
      return;
    } else {
      this.saveSongToPlaylist();
    }
  }

  get playlist() {
    return this.playlistForm.get('playlist');
  }
}
