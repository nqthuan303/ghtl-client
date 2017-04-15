import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { UserModel } from '../models/user.model';
import { CommonService } from './common.service';

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private commonService: CommonService
  ) { }

  listItems(options: Object): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/user/list';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  findOne(options: Object): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/user/findOne';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  add(data: UserModel): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/user/add';

    return this.http.post(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  delete(itemId: string): Promise<any> {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    const url: string = URL + '/user/delete/' + itemId;

    return this.http.delete(url, { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result)})
      .catch( error => { return this.commonService.handleError(error) });

  }

  login(data: UserModel): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url: string = URL + '/user/login';

    return this.http.post(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  update(data: UserModel): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);

    let url: string = URL + '/user/update/' + data._id;

    return this.http.put(url, JSON.stringify(data), { headers: headers })
      .toPromise().then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  listItemsForSelect(): Promise<any> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/user/listForSelect';

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

  numOfItem(options: Object): Promise<number> {
    let auth =JSON.parse(localStorage.getItem('auth'));
    let token = auth.token;
    let headers = new Headers();
    headers.append('Authorization', token);

    let url: string = URL + '/user/getCount';

    url = this.commonService.getUrl(url, options);

    return this.http.get(url, { headers: headers }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

}
