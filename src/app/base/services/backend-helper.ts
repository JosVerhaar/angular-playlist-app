import { HttpClient } from '@angular/common/http';

export const BACKEND_API_BASE_URL: string = 'http://localhost:3000/';

export class BackendHelper {
  protected requestUrl: string;

  constructor(protected readonly http: HttpClient, requestUrlAppend: string) {
    this.requestUrl = BACKEND_API_BASE_URL + requestUrlAppend;
  }

  protected getTotalCountFromResponse(res: any): number {
    return Number(res.headers.get('X-Total-Count') ?? res.body.length);
  }

}
