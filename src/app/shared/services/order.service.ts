import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { OrderModel } from '../models/order.model';
import { CommonService } from './common.service';

@Injectable()
export class OrderService {

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

    let url: string = URL + '/order/list';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) }).catch(this.commonService.handleError);
  }

  findOneBy(options: Object): Promise<any> {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/order/findOneBy';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) }).catch(this.commonService.handleError);
  }

  numOfItem(options: Object): Promise<number> {

    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/order/numOfOrder';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) }).catch(this.commonService.handleError);
  }

  add(data: OrderModel): Promise<any> {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    const url: string = URL + '/order/add';

    return this.http.post(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) }).catch(this.commonService.handleError);
  }

  update(data: any): Promise<any> {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/order/update/' + data._id;

    return this.http.put(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) }).catch(this.commonService.handleError);
  }

  delete(itemId: string): Promise<any> {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    const url: string = URL + '/order/delete/' + itemId;

    return this.http.delete(url, { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result)}).catch(this.commonService.handleError);

  }
  updateStatus(data: any): Promise<any> {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/order/updateStatus/' + data._id;

    return this.http.put(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) }).catch(this.commonService.handleError);
  }

}
