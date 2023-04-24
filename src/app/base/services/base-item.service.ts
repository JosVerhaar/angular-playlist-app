import { BaseItem } from '../models/base-item';
import { RequestParams } from '../models/request-params';
import { Observable } from 'rxjs';
import { Rows } from '../models/rows';

export abstract class BaseItemService<T extends BaseItem> {

  abstract getItems(params: RequestParams): Observable<Rows<T>>;

  abstract searchItem(params: RequestParams): Observable<string[]>;
}
