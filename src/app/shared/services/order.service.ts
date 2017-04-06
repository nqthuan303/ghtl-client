import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { OrderModel } from '../models/order.model';

@Injectable()
export class OrderService {

  constructor(
    private http: Http
  ) { }

  listItems(options: Object): Promise<any> {

    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/order/list';

    for (const key in options) {
      if (url.includes('?')) {
        url += '&' + key + '=' + options[key];
      } else {
        url += '?' + key + '=' + options[key];
      }
    }

    return this.http.get(url, { headers: headers }).toPromise().then(
      result => { return this.extractData(result); }
    ).catch(this.handleError);
  }

  findOneBy(options: Object): Promise<any> {
    let auth = JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/order/findOneBy';

    for (let key in options) {
      if (url.includes("?")) {
        url += "&" + key + "=" + options[key];
      } else {
        url += "?" + key + "=" + options[key];
      }
    }

    return this.http.get(url, { headers: headers }).toPromise().then(
      result => { return this.extractData(result); }
    ).catch(this.handleError);
  }

  numOfItem(options: Object): Promise<number> {

    let auth = JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/order/numOfOrder';

    for (let key in options) {
      if (url.includes("?")) {
        url += "&" + key + "=" + options[key];
      } else {
        url += "?" + key + "=" + options[key];
      }
    }

    return this.http.get(url, { headers: headers }).toPromise().then(
      result => { return this.extractData(result); }
    ).catch(this.handleError);
  }

  add(data: OrderModel): Promise<any> {
    let auth = JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/order/add';

    return this.http.post(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(
      result => { return this.extractData(result); }
      ).catch(this.handleError);
  }

  update(data: any): Promise<any> {
    let auth = JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/order/update/' + data._id;

    return this.http.put(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(
      result => { return this.extractData(result); }
      ).catch(this.handleError);
  }

  updateStatus(data: any): Promise<any> {
    let auth = JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/order/updateStatus/' + data._id;

    return this.http.put(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(
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
