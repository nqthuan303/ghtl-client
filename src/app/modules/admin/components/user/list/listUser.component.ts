import { Component, Inject, OnInit, AfterViewInit, ViewContainerRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { UserService } from '../../../../../shared/services/user.service';
import { DistrictService } from '../../../../../shared/services/district.service';
import { WardService } from '../../../../../shared/services/ward.service';

declare var $: any;
declare var App: any;

@Component({
    moduleId: module.id,
    selector: 'admin-list-user',
    templateUrl: './listUser.component.html'
})
export class ListUserComponent {
    @ViewChild('confirmModal') private confirmModal: any;
    @ViewChild('adminList') private adminList: any;

    districtList: any;
    wardList: any;
    formSearch: FormGroup;
    componentInfo: Object;
    arrHeader: Array<any>;
    arrColumns: Array<any>;
    checkedList: any = {};
    confirmAction: string;
    selectedItemId: string;

    recordsPerPageList: Array<number> = [10, 25, 50];
    listOptions: any = {
        "recordsPerPage": this.recordsPerPageList[0],
        "page": 1,
        'keyword': '',
        'wardId': '0',
        'districtId': '0'
    };

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        public service: UserService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef,
        private districtService: DistrictService,
        private wardService: WardService
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        
        this.formSearch = formBuilder.group({
            'keyword': [''],
            'wardId': ['0'],
            'districtId': ['0'],
        });
        this.componentInfo = {
            'name': 'user',
            'label': 'Người dùng'
        };

        this.arrColumns = [
            { 'type': 'text', 'name': 'name' },
            { 'type': 'text', 'name': 'fullAddress' },
            { 'type': 'text', 'name': 'phone_number' },
            { 'type': 'text', 'name': 'nameOfCreater' },
            { 'type': 'text', 'name': 'createdAt' },
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
            { 'label': 'Người tạo', 'name': 'createdBy', 'sort': true },
            { 'label': 'Ngày tạo', 'name': 'createdAt', 'sort': true },
            { 'label': 'Status', 'name': 'status', 'sort': true },
            { 'label': 'Thao tác' }
        ];
    }

    ngAfterViewInit() {
        let $this = this;

        $('admin-list-user').on('click', '.btn-delete', function (e) {
            $this.selectedItemId = this.parentNode.parentNode.children[0].value;
            $this.confirmAction = 'deleteItem';
            $this.confirmModal.showModal({ confirmTitle: 'Xác nhận xóa user?' });
        });

    }

    onConfirmModal() {
        switch(this.confirmAction){
            case 'deleteItem':
                this.deleteItem();
                break;
        }
    }

    deleteItem() {
        this.service.delete(this.selectedItemId).then((result) => {
            let data = result.data;
            if (data.statusCode == 0) {
                this.adminList.getData(true);
                this.toastr.success('Xóa user thành công!', data.message);
            } else {
                this.toastr.error('Đã xảy ra lỗi!', data.message);
            }
            this.confirmModal.hideModal();
        });
    }

    ngOnInit() {
        let $this = this;
        App.blockUI();
        this.districtService.listItems('587124bcbe644a04d4b14e8b').then(function(result) {
            App.unblockUI();
            $this.districtList = result;
        });
    }

    getWardList() {
        this.wardService.listItems(this.listOptions.districtId).then(result => {
            this.wardList = result;
            this.listOptions.wardId = '0';
        });
    }

    onChecked(oCheckedList: any) {
        this.checkedList = oCheckedList;
    }
}
