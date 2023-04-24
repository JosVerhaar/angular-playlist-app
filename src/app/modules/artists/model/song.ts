import { BaseItem } from '../../../base/models/base-item';

export class Song extends BaseItem {
  constructor(
    public id: number,
    public name: string,
    public year: number,
    public artist: string,
    public short: string,
    public bpm: number,
    public duration: number,
    public genre: string,
    public spotifyId: string,
    public album: string
  ) {
    super(id, name);
  }

}
