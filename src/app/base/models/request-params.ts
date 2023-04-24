import { HttpParams } from '@angular/common/http';

export class RequestParams {
  constructor(
    public page: number,
    public limit: number,
    public searchByName?: string,
    public filters?: Map<string, string>
  ) { }

  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams()

    if (this.page) {
      httpParams = httpParams.set('_page', String(this.page));
    }
    if (this.limit) {
      httpParams = httpParams.set('_limit', String(this.limit));
    }
    if (this.searchByName) {
      httpParams = httpParams.set('name_like', String(this.searchByName));
    }
    if (this.filters && this.filters.size) {
      this.filters.forEach((value: string, key: string) => {
        httpParams = httpParams.set(String(key), String(value));
      });
    }

    return httpParams;
  }
}
