import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrderStatusService } from '../services/orderstatus.service';

@Injectable()
export class OrderStatusResolve implements Resolve<any> {

    constructor(private service: OrderStatusService) { }
    resolve() {
        return this.service.listItems();
    }
}