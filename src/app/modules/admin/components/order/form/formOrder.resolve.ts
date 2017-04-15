import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from '../../../../../shared/services/order.service';

@Injectable()
export class FormOrderResolve implements Resolve<any> {

    constructor(private service: OrderService) { }
    resolve(route: ActivatedRouteSnapshot) {
        let result = this.service.findOne({'id': route.params['id']});
        return result;
    }
}