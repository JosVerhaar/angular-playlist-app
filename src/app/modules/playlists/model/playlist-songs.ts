import { BaseItem } from '../../../base/models/base-item';

// TODO: Should I leave this extend a BaseItem? There is no name here
export class PlaylistSongs extends BaseItem {
  constructor(
    public id: number,
    public songId: number,
    public playlistId: string
  ) {
    super(songId, playlistId);
  }
}

export class PlaylistSongsRequest {
  constructor(
    public songId: number,
    public playlistId: string
  ) {
  }
}
