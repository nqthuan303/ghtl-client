import { Component } from '@angular/core';
import { ClientService } from '../../../../../shared/services/client.service';

@Component({
    moduleId: module.id,
    selector: 'admin-list-client',
    templateUrl: './listShipping.component.html'
})
export class ListShippingComponent {
    componentInfo: Object;
    arrHeader: Array<any>;
    arrColumns: Array<any>;
    checkedList: any = {};

    constructor(public service: ClientService) {
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
            { 'label': 'Shop', 'name': 'name', 'sort': true },
            { 'label': 'Người liên hệ', 'name': 'contact_name', 'sort': true },
            { 'label': 'Địa chỉ', 'name': 'fullAddress' },
            { 'label': 'Số điện thoại', 'name': 'phone_number', 'sort': true },
            { 'label': 'Link', 'name': 'link' },
            { 'label': 'Status', 'name': 'status', 'sort': true }
        ];
    }

    onChecked(oCheckedList: any) {
        this.checkedList = oCheckedList;
    }
}
