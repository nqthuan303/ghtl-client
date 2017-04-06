import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';

@Injectable()
export class OrderStatusService {

  constructor(
    private http: Http
  ) { }

  listItems(): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/orderStatus/listForSelect';

    return this.http.get(url, { headers: headers }).toPromise().then(
      result => { return this.extractData(result); }
    ).catch(this.handleError);
  }

  

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    if (body.statusCode && body.statusCode < 0) {
      throw new Error(body.statusMessage);
    }
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
