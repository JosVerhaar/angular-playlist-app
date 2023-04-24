import { Component, OnInit } from '@angular/core';
import { BaseItemOverview } from '../../../base/components/overview/model/base-item-overview';
import { RequestParams } from '../../../base/models/request-params';
import { Song } from '../model/song';
import { Artist } from '../model/artist';
import { SongService } from '../service/song.service';
import { ActivatedRoute } from '@angular/router';
import { Rows } from '../../../base/models/rows';
import { SongBaseItemService } from '../service/song-base-item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSongToPlaylistComponent } from '../../playlists/add-song-to-playlist/add-song-to-playlist.component';

@Component({
  selector: 'app-artist-songs',
  templateUrl: './artist-songs.component.html',
  providers: [
    {provide: 'baseItemService', useClass: SongBaseItemService}
  ]
})
export class ArtistSongsComponent extends BaseItemOverview implements OnInit {

  public songs: Song[] = [];
  public artist: Artist;

  constructor(private readonly songService: SongService, private readonly activatedRoute: ActivatedRoute,
              private readonly modalService: NgbModal) {
    super();
  }

  ngOnInit(): void {
    this.reload();
  }

  private reload(): void {
    this.artist = this.activatedRoute.snapshot.data['artist'];
    let filters = new Map<string, string>();
    filters.set('artist', this.artist.name);
    this.requestParams.filters = filters;
    this.getItems(this.requestParams);
  }

  public getItems(params: RequestParams): void {
    this.requestParams = this.updateRequestParams(params);
    this.songService.getSongs(this.requestParams).subscribe(
      (response: Rows<Song>) => {
        this.songs = response.rows;
        this.totalRows = response.totalCount;
      }
    );
  }

  public addSongToPlaylist(song: Song): void {
    const modalRef = this.modalService.open(AddSongToPlaylistComponent);
    modalRef.componentInstance.song = song;
    modalRef.result.then(() => this.reload(), () => {
    })
  }

}
