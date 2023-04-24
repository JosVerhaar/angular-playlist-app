import { BaseItem } from '../../../base/models/base-item';

export class Artist extends BaseItem {
  constructor(
    public id: number,
    public name: string,
  ) {
    super(id, name);
  }
}
