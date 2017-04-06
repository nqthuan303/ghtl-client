import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ClientService } from '../services/client.service';

@Injectable()
export class ClientResolve implements Resolve<any> {

    constructor(private service: ClientService) { }
    resolve() {
        let result = this.service.listItemsForSelect();
        return result;
    }
}