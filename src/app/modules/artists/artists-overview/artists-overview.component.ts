import { Component, OnInit } from '@angular/core';
import { RequestParams } from '../../../base/models/request-params';
import { ArtistService } from '../service/artist.service';
import { Artist } from '../model/artist';
import { BaseItemOverview } from '../../../base/components/overview/model/base-item-overview';
import { Rows } from '../../../base/models/rows';
import { ArtistBaseItemService } from '../service/artist-base-item.service';

@Component({
  selector: 'app-artists-overview',
  templateUrl: './artists-overview.component.html',
  providers: [
    {provide: 'baseItemService', useClass: ArtistBaseItemService}
  ]
})
export class ArtistsOverviewComponent extends BaseItemOverview implements OnInit {

  public artists: Artist[] = [];

  constructor(private readonly artistService: ArtistService) {
    super();
  }

  ngOnInit(): void {
    this.getItems(new RequestParams(this.currentPage, this.pageLimit));
  }

  public getItems(params: RequestParams): void {
    this.requestParams = this.updateRequestParams(params);
    this.artistService.getArtists(this.requestParams).subscribe(
      (response: Rows<Artist>) => {
        this.artists = response.rows;
        this.totalRows = response.totalCount;
      }
    );
  }

}
