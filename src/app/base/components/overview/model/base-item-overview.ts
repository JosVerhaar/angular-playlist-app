import { RequestParams } from '../../../models/request-params';

export abstract class BaseItemOverview {

  public totalRows: number;
  protected pageLimit: number = 10;
  protected currentPage: number = 1;
  protected requestParams: RequestParams = new RequestParams(this.currentPage, this.pageLimit);

  public abstract getItems(params: RequestParams): void;

  protected updateRequestParams(newParams: RequestParams): RequestParams {
    const searchByName: string = newParams.searchByName ?? this.requestParams.searchByName;
    const filters = newParams.filters ?? this.requestParams.filters;
    return new RequestParams(newParams.page, newParams.limit, searchByName, filters);
  }
}
