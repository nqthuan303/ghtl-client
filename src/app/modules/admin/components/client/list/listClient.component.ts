import { Component } from '@angular/core';
import { ClientService } from '../../../../../shared/services/client.service';

@Component({
    moduleId: module.id,
    selector: 'admin-list-client',
    templateUrl: './listClient.component.html'
})
export class ListClientComponent {
    componentInfo: Object;
    arrHeader: Array<any>;
    arrColumns: Array<any>;
    checkedList: any = {};
    recordsPerPageList: Array<number> = [10, 25, 50];
    listOptions: any = {
        "recordsPerPage": this.recordsPerPageList[0],
        "page": 1,
        'keyword': '',
        'wardId': '0',
        'districtId': '0'
    };

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
            { 'type': 'text', 'name': 'status' },
            {
                'type': 'html',
                'elms': [
                    { 'elmType': 'btn-edit' },
                    { 'elmType': 'btn-delete' },
                ]
            }
        ];
        this.arrHeader = [
            { 'label': 'Shop', 'name': 'name', 'sort': true },
            { 'label': 'Người liên hệ', 'name': 'contact_name', 'sort': true },
            { 'label': 'Địa chỉ', 'name': 'fullAddress' },
            { 'label': 'Số điện thoại', 'name': 'phone_number', 'sort': true },
            { 'label': 'Link', 'name': 'link' },
            { 'label': 'Status', 'name': 'status', 'sort': true },
            { 'label': 'Thao tác' }
        ];
    }

    onChecked(oCheckedList: any) {
        this.checkedList = oCheckedList;
    }
}
