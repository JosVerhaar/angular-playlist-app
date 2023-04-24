import { Component, OnInit } from '@angular/core';
import { BaseItemOverview } from '../../../base/components/overview/model/base-item-overview';
import { Playlist } from '../model/playlist';
import { PlaylistService } from '../service/playlist.service';
import { RequestParams } from '../../../base/models/request-params';
import { Rows } from '../../../base/models/rows';
import { PlaylistBaseItemService } from '../service/playlist-base-item.service';
import { ToastService } from '../../../base/components/toasts/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';

@Component({
  selector: 'app-playlist-overview',
  templateUrl: './playlist-overview.component.html',
  providers: [
    {provide: 'baseItemService', useClass: PlaylistBaseItemService}
  ]
})
export class PlaylistOverviewComponent extends BaseItemOverview implements OnInit {

  public playlists: Playlist[] = [];

  constructor(private readonly playlistService: PlaylistService, private readonly toastService: ToastService,
              private readonly modalService: NgbModal) {
    super();
  }

  ngOnInit(): void {
    this.getItems(new RequestParams(this.currentPage, this.pageLimit));
  }

  public getItems(params: RequestParams) {
    this.requestParams = this.updateRequestParams(params);
    this.playlistService.getPlaylists(this.requestParams).subscribe(
      (response: Rows<Playlist>) => {
        this.playlists = response.rows;
        this.totalRows = response.totalCount;
      }
    );
  }

  public deletePlaylist(playlist: Playlist): void {
    this.playlistService.delete(playlist).subscribe(() => {
      this.toastService.show({
        header: $localize`Delete playlist`,
        body: $localize`The playlist has been successfully deleted.`
      });
      this.getItems(new RequestParams(this.currentPage, this.pageLimit));
    }, error => {
      this.toastService.showGeneralError();
    });
  }

  public createPlaylist(): void {
    this.modalService.open(CreatePlaylistComponent).result.then(() => {
      this.getItems(new RequestParams(this.currentPage, this.pageLimit));
    }, () => {
    });
  }

}
