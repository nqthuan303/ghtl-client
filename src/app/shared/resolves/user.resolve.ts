import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolve implements Resolve<any> {

    constructor(private service: UserService) { }
    resolve() {
        let result = this.service.listItemsForSelect();
        return result;
    }
}