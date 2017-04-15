import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../../../../../shared/services/user.service';

@Injectable()
export class FormUserResolve implements Resolve<any> {

    constructor(private service: UserService) { }
    resolve(route: ActivatedRouteSnapshot) {
        return this.service.findOne({ 'id': route.params['id'] });
    }
}