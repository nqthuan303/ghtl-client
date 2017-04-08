import { Component, Inject, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ClientService } from '../../../../../shared/services/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { DistrictService } from '../../../../../shared/services/district.service';
import { WardService } from '../../../../../shared/services/ward.service';

declare var App: any;
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'admin-list-client',
    templateUrl: './listClient.component.html'
})
export class ListClientComponent implements OnInit, AfterViewInit {
    @ViewChild('confirmModal') private confirmModal: any;
    @ViewChild('adminList') private adminList: any;

    formSearch: FormGroup;
    componentInfo: Object;
    arrHeader: Array<any>;
    arrColumns: Array<any>;
    checkedList: any = {};
    recordsPerPageList: Array<number> = [10, 25, 50];
    districtList: any;
    wardList: any;
    selectedItemId: string;
    confirmAction: string;

    listOptions: any = {
        "recordsPerPage": this.recordsPerPageList[0],
        "page": 1,
        'keyword': '',
        'wardId': '0',
        'districtId': '0'
    };

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        public service: ClientService,
        private districtService: DistrictService,
        private wardService: WardService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.formSearch = formBuilder.group({
            'keyword': [''],
            'wardId': ['0'],
            'districtId': ['0'],
        });

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

    ngAfterViewInit() {
        let $this = this;

        $('admin-list-client').on('click', '.btn-delete', function (e) {
            $this.selectedItemId = this.parentNode.parentNode.children[0].value;
            $this.confirmAction = 'deleteItem';

            $this.confirmModal.showModal({ confirmTitle: 'Xác nhận xóa đơn hàng?' });
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

    deleteItem() {
        this.service.delete(this.selectedItemId).then((result) => {
            let data = result.data;
            if (data.statusCode == 0) {
                this.adminList.getData(true);
                this.toastr.success('Xóa đơn hàng thành công!', data.message);
            } else {
                this.toastr.error('Đã xảy ra lỗi trong quá trình xóa đơn hàng!', data.message);
            }
            this.confirmModal.hideModal();
        });
    }

    onConfirmModal() {
        switch(this.confirmAction){
            case 'deleteItem':
                this.deleteItem();
                break;
        }
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
