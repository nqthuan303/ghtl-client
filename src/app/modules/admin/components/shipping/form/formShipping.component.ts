import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { OrderService } from '../../../../../shared/services/order.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { OrderModel } from '../../../../../shared/models/order.model';

declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'admin-form-client',
    templateUrl: './formShipping.component.html'
})
export class FormShippingComponent {
    objData: OrderModel = new OrderModel();
    objForm: FormGroup;
    componentInfo: Object;
    arrHeader: Array<any>;
    arrColumns: Array<any>;
    formChangeStatus: FormGroup;
    formSearch: FormGroup;
    statusChange: string;
    checkedList: any = {};
    recordsPerPageList: Array<number> = [10, 25, 50];
    
    listOptions: any = {
        "recordsPerPage": this.recordsPerPageList[0],
        "page": 1,
        'keyword': '',
        'clientId': '0',
        'orderStatusId': '0',
        'wardId': '0',
        'districtId': '0'
    };

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        public service: OrderService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);


        this.formChangeStatus = formBuilder.group({
            'statusChange': ['0']
        });

        this.formSearch = formBuilder.group({
            'keyword': [''],
            'clientId': ['0'],
            'orderStatusId': ['0'],
            'wardId': ['0'],
            'districtId': ['0'],
        });

        this.initListTable();
    }
    initListTable() {
        let slbChangeStatus = '';

        this.statusChange = '0';
        this.componentInfo = {
            'name': 'order',
            'label': 'Đơn hàng'
        };
        this.arrColumns = [
            { 'type': 'text', 'name': 'client_name' },
            { 'type': 'text', 'name': 'fullAddress' },
            { 'type': 'text', 'name': 'bonus_fee' },
            {
                'type': 'html',
                'elms': [
                    { 'elmType': 'btn-add-orderstatus' }
                ]
            }
        ];
        this.arrHeader = [
            { 'label': 'Shop', 'name': 'client_name', 'sort': true },
            { 'label': 'Địa chỉ', 'name': 'fullAddress' },
            { 'label': 'Tiền thu hộ', 'name': 'bonus_fee', 'sort': true },
            { 'label': 'Thao tác' }
        ];
    }
    ngAfterViewInit() {
        let $this = this;

        $('#main-content').on('click', '.btn-changeStatus', function (e) {
            let itemId = this.parentNode.parentNode.children[0].value;
            let selectedStatus = this.parentNode.children[0].value

            let dataUpdate = {
                '_id': itemId,
                'orderstatus_id': selectedStatus
            };

            $this.service.updateStatus(dataUpdate).then((result) => {
                if (result.statusCode == 0) {
                    $this.toastr.success('Trạng thái của đơn hàng được cập nhật thành công!', result.message);
                } else {
                    $this.toastr.error('Đã xảy ra lỗi trong quá trình cập nhật!', result.message);
                }
            });

        });

    }

    ngOnInit() {
        let $this = this;
    }
    onChecked(oCheckedList: any) {
        this.checkedList = oCheckedList;
    }
}
