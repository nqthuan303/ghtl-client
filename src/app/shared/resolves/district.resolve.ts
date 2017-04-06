import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DistrictService } from '../services/district.service';

@Injectable()
export class DistrictResolve implements Resolve<any> {

    constructor(private service: DistrictService) { }
    resolve() {
        let result = this.service.listItems('587124bcbe644a04d4b14e8b');
        return result;
    }
}