import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { OrderModel } from '../models/order.model';
import { CommonService } from './common.service';

@Injectable()
export class ShippingService {

  constructor(
    private http: Http,
    private commonService: CommonService
  ) { }

  listItems(options: Object): Promise<any> {

    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/order/listStorage';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch(error => { return this.commonService.handleError(error) });
  }

  numOfItem(options: Object): Promise<number> {

    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/order/getCountStorage';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch(error => { return this.commonService.handleError(error) });
  }

}
