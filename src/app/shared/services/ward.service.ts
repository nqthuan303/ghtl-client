import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { URL } from './app.config';
import { CommonService } from './common.service';

@Injectable()
export class WardService {

  constructor(
    private http: Http,
    private commonService: CommonService
  ) { }

  listItems(districtId: string): Promise<any> {
    let url: string = URL + '/ward/listForSelect?districtId=' + districtId;

    return this.http.get(url, { headers: null }).toPromise()
      .then(result => { return this.commonService.extractData(result) })
      .catch( error => { return this.commonService.handleError(error) });
  }

}
