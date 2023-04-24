import { BaseItem } from '../../../base/models/base-item';

export class Playlist extends BaseItem {
  constructor(
    public id: string,
    public name: string
  ) {
    super(id, name);
  }
}
