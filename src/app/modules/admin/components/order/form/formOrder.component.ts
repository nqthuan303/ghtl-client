import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomValidators } from 'ng2-validation';

import { OrderStatusModel } from '../../../../../shared/models/orderstatus.model';
import { OrderModel } from '../../../../../shared/models/order.model';
import { DistrictModel } from '../../../../../shared/models/district.model';
import { WardModel } from '../../../../../shared/models/ward.model';

import { OrderService } from '../../../../../shared/services/order.service';
import { OrderLogService } from '../../../../../shared/services/orderLog.service';
import { ClientService } from '../../../../../shared/services/client.service';
import { OrderStatusService } from '../../../../../shared/services/orderstatus.service';
import { DistrictService } from '../../../../../shared/services/district.service';
import { WardService } from '../../../../../shared/services/ward.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var $: any;
declare var tinymce: any;
declare var App: any;

@Component({
    moduleId: module.id,
    selector: 'admin-form-order',
    templateUrl: './formOrder.component.html',
    providers: [OrderLogService]
})

export class FormOrderComponent implements OnInit {
    objForm: FormGroup;
    objData: OrderModel = new OrderModel();

    clientList: Array<any> = new Array<any>();

    orderStatusList: Array<OrderStatusModel> = new Array<OrderStatusModel>();
    districtList: Array<DistrictModel> = new Array<DistrictModel>();
    wardList: Array<WardModel> = new Array<WardModel>();
    action: string = 'add';
    editor: any;
    params: Params;
    isWardListAvailable: boolean = false;
    orderStatusTemp: string;
    submited: boolean = false;

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        private service: OrderService,
        private orderLogService: OrderLogService,
        private clientService: ClientService,
        private orderStatusService: OrderStatusService,
        private districtService: DistrictService,
        private wardService: WardService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.params = params;
        });

        this.toastr.setRootViewContainerRef(vcr);
        this.objForm = formBuilder.group({
            'client_id': ['', [Validators.required]],
            'reciever_name': ['', [Validators.required]],
            'reciever_phone': ['', [CustomValidators.phone('vi-VN')]],
            'district_id': ['', [Validators.required]],
            'ward_id': [''],
            'address': ['', [Validators.required]],
            'bonus_fee': ['', [CustomValidators.number]],
            'ship_fee': ['', [Validators.required]],
            'orderstatus_id': '',
            'note': ''
        });


    }

    ngOnInit() {

        if (this.params['id']) {
            this.action = 'update';
            this.objData = this.activatedRoute.snapshot.data['dataResolve'];
            this.orderStatusTemp = this.objData.orderstatus_id;

            // this.objForm.get('client_id').setValue(this.objData.client_id);

            let $this = this;
            this.getWardList(this.objData.district_id).then(function (result) {
                $this.isWardListAvailable = true;
            });
        }

        this.districtList = this.activatedRoute.snapshot.data['districtResolve'];
        this.clientList = this.activatedRoute.snapshot.data['clientResolve'];
        this.orderStatusList = this.activatedRoute.snapshot.data['orderStatusResolve'];
    }

    getWardList(districtId: string) {
        return this.wardService.listItems(districtId).then(result => {
            this.wardList = result;
        });
    }

    ngAfterViewInit() {
        // tinymce.init({
        //     selector: '#note',
        //     plugins: ['link', 'paste', 'table'],
        //     skin_url: '../../assets/libs/tinymce/skins/lightgray',
        //     setup: editor => {
        //         this.editor = editor;
        //         editor.on('keyup', () => {
        //             const content = editor.getContent();
        //             this.objData.note = content;
        //         });
        //     },
        // });
    }

    // ngOnDestroy() {
    //     tinymce.remove(this.editor);
    // }

    selectClient(clientId: string) {
        if (clientId) {
            this.objData.client_id = clientId;
        }
    }

    deselectClient() {
        this.objData.client_id = null;
    }

    selectDistrict(districtId: string) {
        let $this = this;
        this.getWardList(districtId).then(function (result) {
            $this.isWardListAvailable = true;
        });
    }

    deselectDistrict() {
        this.objData.district_id = null;
        this.wardList = undefined;
        this.isWardListAvailable = false;
        this.deselectWard();
    }

    deselectWard() {
        this.objData.ward_id = undefined;
    }

    formAction() {
        let $this = this;
        this.submited = true;
        if (!this.objForm.valid) {
            return;
        }
        this.submited = false;
        if (this.action === 'add') {
            App.blockUI();
            this.service.add(this.objData).then((result) => {
                if (result.statusCode == 0) {
                    let orderLogData: any = {
                        'order_id': result.data.order_id,
                        'orderstatus_id': result.data.orderstatus_id
                    };

                    this.orderLogService.add(orderLogData).then(function (addOrderLogResult) {
                        App.unblockUI();
                        if (addOrderLogResult.statusCode == 0) {
                            $this.toastr.success('Thêm đơn hàng thành công!', result.message);
                            let tempShop = $this.objData.client_id;
                            $this.objForm.reset();
                            $this.objForm.get('client_id').setValue(tempShop);
                        }

                    });

                }else{
                    App.unblockUI();
                }
            });
        }

        if (this.action === 'update') {
            App.blockUI();
            this.service.update(this.objData).then((result) => {
                if (result.statusCode == 0) {
                    if (result.data.orderstatus_id != this.orderStatusTemp) {
                        this.orderStatusTemp = result.data.orderstatus_id;

                        let orderLogData: any = {
                            'order_id': result.data.order_id,
                            'orderstatus_id': result.data.orderstatus_id
                        };
                        this.orderLogService.add(orderLogData).then(function (addOrderLogResult) {
                            App.unblockUI();
                        });
                    }else{
                        App.unblockUI();
                    }
                    this.toastr.success('Cập nhật đơn hàng thành công!', result.message);
                } else {
                    App.unblockUI();
                    this.toastr.error('Đã xảy ra lỗi trong quá trình cập nhật!', result.message);
                }
            });
        }
    }
}
