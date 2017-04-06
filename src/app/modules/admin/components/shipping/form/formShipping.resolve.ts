import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ClientService } from '../../../../../shared/services/client.service';

@Injectable()
export class FormShippingResolve implements Resolve<any> {

    constructor(private service: ClientService) { }
    resolve(route: ActivatedRouteSnapshot) {
        return this.service.findOneBy({ 'id': route.params['id'] });
    }
}