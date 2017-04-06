import { Component } from '@angular/core';
import { OrderLogService } from '../../../../shared/services/orderLog.service';

@Component({
    moduleId: module.id,
    selector: 'admin-order-log',
    templateUrl: './orderLog.component.html',
    providers: [OrderLogService]
})
export class OrderLogComponent {
    componentInfo: Object;
    arrHeader: Array<any>;
    arrColumns: Array<any>;

    constructor(public service: OrderLogService) {
        this.componentInfo = {
            'name': 'client',
            'label': 'Khách hàng'
        };

        this.arrColumns = [
            { 'type': 'text', 'name': 'name' },
            { 'type': 'text', 'name': 'contact_name' },
            { 'type': 'text', 'name': 'fullAddress' },
            { 'type': 'text', 'name': 'phone_number' },
            { 'type': 'text', 'name': 'link' },
            { 'type': 'text', 'name': 'status' }
        ];
        this.arrHeader = [
            { 'label': 'Shop', 'sort': true },
            { 'label': 'Người liên hệ', 'sort': true },
            { 'label': 'Địa chỉ' },
            { 'label': 'Số điện thoại', 'sort': true },
            { 'label': 'Link' },
            { 'label': 'Status', 'sort': true }
        ];
    }
}
