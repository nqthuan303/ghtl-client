import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { CommonService } from './common.service';

@Injectable()
export class ProvinceService {

  constructor(
    private http: Http,
    private commonService: CommonService
  ) { }

  listItems(): Promise<any> {
    
    let url: string = URL + '/province/listForSelect';

    return this.http.get(url, { headers: null }).toPromise()
      .then(result => { return this.commonService.extractData(result) }).catch(this.commonService.handleError);
  }

}
