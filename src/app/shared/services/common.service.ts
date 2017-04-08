import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class CommonService {

  public extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    if (body.statusCode && body.statusCode < 0) {
      throw new Error(body.statusMessage);
    }
    return body || {};
  }

  public handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  public getUrl(url: string, options: Object): string {

    for (let key in options) {
      if (url.includes("?")) {
        url += "&" + key + "=" + options[key];
      } else {
        url += "?" + key + "=" + options[key];
      }
    }

    return url;
  }

}
