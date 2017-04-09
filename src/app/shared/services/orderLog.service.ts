import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { OrderLogModel } from '../models/orderLog.model';
import { CommonService } from './common.service';

@Injectable()
export class OrderLogService {

  constructor(
    private http: Http,
    private commonService: CommonService
  ) { }

  listItems(options: Object): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/client/list';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  add(data: OrderLogModel): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/orderlog/add';

    return this.http.post(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  numOfItem(options: Object): Promise<number> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/client/numOfClient';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }


}
