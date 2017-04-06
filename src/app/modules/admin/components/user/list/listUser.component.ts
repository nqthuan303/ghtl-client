import { Component } from '@angular/core';
import { UserService } from '../../../../../shared/services/user.service';

@Component({
    moduleId: module.id,
    selector: 'admin-list-user',
    templateUrl: './listUser.component.html'
})
export class ListUserComponent {
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

    constructor(public service: UserService) {
        this.componentInfo = {
            'name': 'user',
            'label': 'Người dùng'
        };

        this.arrColumns = [
            { 'type': 'text', 'name': 'name' },
            { 'type': 'text', 'name': 'fullAddress' },
            { 'type': 'text', 'name': 'phone_number' },
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
            { 'label': 'Họ Và Tên', 'name': 'name', 'sort': true },
            { 'label': 'Địa chỉ', 'name': 'fullAddress' },
            { 'label': 'Số điện thoại', 'name': 'phone_number', 'sort': true },
            { 'label': 'Status', 'name': 'status', 'sort': true },
            { 'label': 'Thao tác' }
        ];
    }

    onChecked(oCheckedList: any) {
        this.checkedList = oCheckedList;
    }
}
