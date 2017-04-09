import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { CommonService } from './common.service';

@Injectable()
export class OrderStatusService {

  constructor(
    private http: Http,
    private commonService: CommonService
  ) { }

  listItems(): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/orderStatus/listForSelect';

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

}
