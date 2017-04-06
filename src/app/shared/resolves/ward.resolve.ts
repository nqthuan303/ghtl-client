import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WardService } from '../services/ward.service';

@Injectable()
export class WardResolve implements Resolve<any> {

    constructor(private service: WardService) { }
    resolve() {
        let result = this.service.listItems('587124bcbe644a04d4b14e8b');
        return result;
    }
}