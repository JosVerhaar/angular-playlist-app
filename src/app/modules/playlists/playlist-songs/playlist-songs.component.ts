import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaylistSongsBaseItemService } from '../service/playlist-songs-base-item.service';
import { PlaylistSongs } from '../model/playlist-songs';
import { Playlist } from '../model/playlist';
import { ActivatedRoute } from '@angular/router';
import { RequestParams } from '../../../base/models/request-params';
import { PlaylistSongsService } from '../service/playlist-songs.service';
import { Rows } from '../../../base/models/rows';
import { BaseItemOverview } from '../../../base/components/overview/model/base-item-overview';
import { Song } from '../../artists/model/song';
import { SongService } from '../../artists/service/song.service';
import { SongTableComponent } from '../../../base/components/table/song-table/song-table.component';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  providers: [
    {provide: 'baseItemService', useClass: PlaylistSongsBaseItemService}
  ]
})
export class PlaylistSongsComponent extends BaseItemOverview implements OnInit {

  @ViewChild(SongTableComponent) songTable: SongTableComponent;

  public playlistSongs: PlaylistSongs[] = [];
  public playlist: Playlist;
  public songs: Song[] = [];

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly playlistSongsService: PlaylistSongsService,
              private readonly songService: SongService) {
    super();
  }

  ngOnInit(): void {
    this.reload();
  }

  public getItems(params: RequestParams): void {
    this.requestParams = this.updateRequestParams(params);
    this.playlistSongsService.getPlaylistSongs(this.requestParams).subscribe((res: Rows<PlaylistSongs>) => {
      this.playlistSongs = res.rows;
      this.totalRows = res.totalCount;
      this.fetchSongsForPlaylist();
    });
  }

  public removeSongFromPlaylist(song: Song): void {
    this.playlistSongsService.remove(this.getPlaylistSongsObject(song)).subscribe(
      () => {
        this.songTable.handleSongDeleteSuccess({deletedSong: song, playlist: this.playlist});
        this.reload();
      }, () => {
        this.songTable.handleSongDeleteFailed();
      });
  }

  private reload(): void {
    this.playlistSongs = [];
    this.playlist = this.activatedRoute.snapshot.data['playlist'];
    let filters = new Map<string, string>();
    filters.set('playlistId', this.playlist.id);
    this.requestParams.filters = filters;
    this.getItems(this.requestParams);
  }

  private fetchSongsForPlaylist(): void {
    this.songs = [];
    this.playlistSongs.forEach((playlistSong: PlaylistSongs) => {
      this.songService.getSong(playlistSong.songId).subscribe(
        (song: Song) => {
          this.songs.push(song)
        });
    });
  }

  private getPlaylistSongsObject(song: Song): PlaylistSongs {
    const foundPlaylistSong = this.playlistSongs.filter(ps => ps.songId === song.id);
    return foundPlaylistSong[0] ?? null;
  }

}
