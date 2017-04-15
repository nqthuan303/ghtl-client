import { Component, Inject, OnInit, AfterViewInit, ViewContainerRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


import { OrderService } from '../../../../../shared/services/order.service';
import { ClientService } from '../../../../../shared/services/client.service';
import { OrderLogService } from '../../../../../shared/services/orderLog.service';
import { DistrictService } from '../../../../../shared/services/district.service';
import { WardService } from '../../../../../shared/services/ward.service';


import { ActivatedRoute } from '@angular/router';
import { OrderStatusModel } from '../../../../../shared/models/orderstatus.model';
import { ClientModel } from '../../../../../shared/models/client.model';
import { OrderModel } from '../../../../../shared/models/order.model';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var $: any;
declare var App: any;

@Component({
    moduleId: module.id,
    selector: 'admin-list-order',
    templateUrl: './listOrder.component.html',
    providers: [OrderLogService]
})
export class ListOrderComponent implements OnInit {
    @ViewChild('confirmModal') private confirmModal: any;
    @ViewChild('adminList') private adminList: any;
    
    objData: OrderModel = new OrderModel();

    componentInfo: Object;
    arrHeader: Array<any>;
    arrColumns: Array<any>;
    orderStatusList: Array<OrderStatusModel> = new Array<OrderStatusModel>();
    clientList: Array<ClientModel> = new Array<ClientModel>();
    wardList: any;
    districtList: any;
    formChangeStatus: FormGroup;
    formSearch: FormGroup;
    statusChange: string;
    checkedList: any = {};
    recordsPerPageList: Array<number> = [10, 25, 50];

    confirmAction: string;
    selectedItemId: string;
    selectedStatusId: string;
    

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
        vcr: ViewContainerRef,
        private clientService: ClientService,
        private orderLogService: OrderLogService,
        private activatedRoute: ActivatedRoute,

        private districtService: DistrictService,
        private wardService: WardService
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.orderStatusList = this.activatedRoute.snapshot.data['orderStatusResolve'];
        

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
        let btnChangeStatus = '';

        this.statusChange = '0';
        this.componentInfo = {
            'name': 'order',
            'label': 'Đơn hàng'
        };
        this.arrColumns = [
            { 'type': 'text', 'name': 'client_name' },
            { 'type': 'text', 'name': 'reciever_name' },
            { 'type': 'text', 'name': 'fullAddress' },
            { 'type': 'text', 'name': 'bonus_fee' },
            { 'type': 'text', 'name': 'ship_fee' },
            { 'type': 'text', 'name': 'nameOfCreater' },
            { 'type': 'text', 'name': 'createdAt' },
            {
                'type': 'html',
                'elms': [
                    { 'elmType': 'slb-orderstatus', 'elmData': this.orderStatusList }
                ]

            },
            {
                'type': 'html',
                'elms': [
                    { 'elmType': 'btn-edit' },
                    { 'elmType': 'btn-delete' },
                ]
            }
        ];
        this.arrHeader = [
            { 'label': 'Shop', 'name': 'client_name', 'sort': true },
            { 'label': 'Người nhận', 'name': 'reciever_name', 'sort': true },
            { 'label': 'Địa chỉ giao hàng', 'name': 'fullAddress' },
            { 'label': 'Tiền thu hộ', 'name': 'bonus_fee', 'sort': true },
            { 'label': 'Cước vận chuyển', 'name': 'ship_fee', 'sort': true },
            { 'label': 'Người tạo', 'name': 'createdBy', 'sort': true },
            { 'label': 'Ngày tạo', 'name': 'createdAt', 'sort': true },
            { 'label': 'Status', 'name': 'orderstatus_id', 'sort': true },
            { 'label': 'Thao tác', 'name': 'orderstatus_id' }
        ];
    }

    updateOrderStatus() {
        let dataUpdate = {
            '_id': this.selectedItemId,
            'orderstatus_id': this.selectedStatusId
        };

        this.service.updateStatus(dataUpdate).then((result) => {
            this.confirmModal.hideModal();
            if (result.statusCode == 0) {
                this.toastr.success('Trạng thái của đơn hàng được cập nhật thành công!', result.message);
            } else {
                this.toastr.error('Đã xảy ra lỗi trong quá trình cập nhật!', result.message);
            }
        });
    }
    deleteOrder() {
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
            case 'updateOrderStatus':
                this.updateOrderStatus();
                break;
            case 'deleteOrder':
                this.deleteOrder();
                break;
        }
    }

    ngAfterViewInit() {
        let $this = this;

        $('admin-list-order').on('change', '.slb-orderstatus', function (e) {
            $this.confirmAction = 'updateOrderStatus';

            $this.selectedItemId = this.parentNode.parentNode.children[0].value;
            $this.selectedStatusId = this.parentNode.children[0].value;
            $this.confirmModal.showModal({ confirmTitle:  'Xác nhận cập nhật trạng thái đơn hàng?' });
        });

        $('admin-list-order').on('click', '.btn-delete', function (e) {
            $this.selectedItemId = this.parentNode.parentNode.children[0].value;
            $this.confirmAction = 'deleteOrder';

            $this.confirmModal.showModal({ confirmTitle: 'Xác nhận xóa đơn hàng?' });
        });

    }

    ngOnInit() {
        let $this = this;
        App.blockUI();
        this.clientService.listItemsForSelect().then(function (result) {
            App.unblockUI();
            $this.clientList = result;
        });
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
