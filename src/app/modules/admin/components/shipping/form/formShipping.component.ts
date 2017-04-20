import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { ShippingService } from '../../../../../shared/services/shipping.service';
import { ClientService } from '../../../../../shared/services/client.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ClientModel } from '../../../../../shared/models/client.model';
import { OrderModel } from '../../../../../shared/models/order.model';

declare var $: any;
declare var App: any;

@Component({
    moduleId: module.id,
    selector: 'admin-form-shipping',
    templateUrl: './formShipping.component.html'
})
export class FormShippingComponent implements OnInit {
    objData: OrderModel = new OrderModel();
    objForm: FormGroup;
    componentInfo: Object;
    arrColumns: Array<any>;
    clientList: Array<ClientModel> = new Array<ClientModel>();
    formSearch: FormGroup;
    checkedList: any = {};
    recordsPerPageList: Array<number> = [10, 25, 50];
    selectedOrderStorageList: Array<OrderModel> = new Array<OrderModel>();

    items: Array<OrderModel> = new Array<OrderModel>();
    showFrom: number = 1;
    showTo: number;
    numOfItem: number;
    lastPage: number;
    rowNumberList: Array<number>;
    checkedAll = false;
    pageList: Array<number>;

    listOptions: any = {
        'recordsPerPage': this.recordsPerPageList[0],
        'page': 1,
        'keyword': '',
        'clientId': '0',
        'orderStatusId': '0',
        'wardId': '0',
        'districtId': '0'
    };

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        public service: ShippingService,
        private clientService: ClientService,
        private toastr: ToastsManager,
        vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);

        this.formSearch = formBuilder.group({
            'keyword': [''],
            'clientId': ['0'],
            'orderStatusId': ['0'],
            'wardId': ['0'],
            'districtId': ['0'],
        });
    }

    ngOnInit() {
        let $this = this;
        this.clientService.listItemsForSelect().then(function (result) {
            App.unblockUI();
            $this.clientList = result;
        });
        this.showTo = this.recordsPerPageList[0];
        this.getData(true);

    }
    onChecked(oCheckedList: any) {
        this.checkedList = oCheckedList;
    }

    sort(sortField: string, allowSort: boolean) {
        if (!allowSort) { return; }
        this.listOptions['sortField'] = sortField;

        if (this.listOptions['sortValue']) {
            this.listOptions['sortValue'] = - this.listOptions['sortValue'];
        } else {
            this.listOptions['sortValue'] = 1;
        }
        this.getData(false);
    }
    getData(getNumOfItem: boolean) {
        App.blockUI();
        this.service.listItems(this.listOptions).then(result => {

            this.items = result;
            this.showFrom = this.listOptions.recordsPerPage * (this.listOptions.page - 1) + 1;
            this.showTo = this.listOptions.recordsPerPage * this.listOptions.page;

            if (this.listOptions.page == this.lastPage) {
                this.showTo = this.numOfItem;
            }

            this.rowNumberList = [];
            for (let i = this.showFrom; i <= this.showTo; i++) {
                this.rowNumberList.push(i);
            }
            this.setPageList();
            App.unblockUI();
        });

        if (getNumOfItem === true) {
            App.blockUI();
            this.service.numOfItem(this.listOptions).then(result => {
                this.numOfItem = result;
                
                this.lastPage = this.getLastPage();
                App.unblockUI();
            });
        }
    }

    checkAll() {
        this.checkedList = {};
        this.checkedAll = !this.checkedAll;

        if (this.checkedAll === true) {
            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i];
                this.checkedList[item._id] = { 'id': item._id };
            }
        }
        // this.onChecked.emit(this.checkedList);

    }

    checkEl(checkedId: string) {
        if (this.checkedList[checkedId]) {
            delete this.checkedList[checkedId];
        } else {
            this.checkedList[checkedId] = { 'id': checkedId };
        }
        this.checkedAll = false;
        if (Object.keys(this.checkedList).length == this.items.length) {
            this.checkedAll = true;
        }
        // this.onChecked.emit(this.checkedList);
    }

    changeRecoresPerPage($event) {
        this.listOptions.recordsPerPage = $event.target.value;
        this.listOptions.page = 1;
        this.getData(false);
    }
    trackByIndex(index: number, obj: any): any {

        if (obj.province_id && obj.district_id) {
            let fullAddress = '';

            if (obj.ward_id) {
                fullAddress = obj.address + ', ' +
                    obj.ward_id.type + ' ' + obj.ward_id.name + ', ' +
                    obj.district_id.type + ' ' + obj.district_id.name + ', ' +
                    obj.province_id.type + ' ' + obj.province_id.name;
            } else {
                fullAddress = obj.address + ', ' +
                    obj.district_id.type + ' ' + obj.district_id.name + ', ' +
                    obj.province_id.type + ' ' + obj.province_id.name;
            }
            obj.fullAddress = fullAddress;
        }

        if (obj.client_id) {
            let clientName = obj.client_id.name;
            obj.client_name = clientName;
        }

        if (obj.createdBy) {
            const nameOfCreater = obj.createdBy.name;
            obj.nameOfCreater = nameOfCreater;
        }

        return obj;
    }

    goPage(page: number) {
        this.listOptions.page = page;
        this.getData(false);
    }
    goPrevPage() {
        if (this.listOptions.page <= 1) {
            return;
        }
        this.listOptions.page = this.listOptions.page - 1;
        this.getData(false);
    }
    goNextPage() {
        if (this.listOptions.page >= this.lastPage) {
            return;
        }
        this.listOptions.page = this.listOptions.page + 1;
        this.getData(false);
    }

    goFirstPage() {
        this.listOptions.page = 1;
        this.getData(false);
    }

    goLastPage() {
        this.listOptions.page = this.lastPage;
        this.getData(false);
    }

    getLastPage(): number {
        let result: number;
        if (this.numOfItem % this.listOptions.recordsPerPage == 0) {
            result = this.numOfItem / this.listOptions.recordsPerPage;
        } else {
            result = Math.floor(this.numOfItem / this.listOptions.recordsPerPage) + 1;
        }
        return result;
    }

    setPageList(): void {
        this.pageList = [];

        const currentPage = this.listOptions.page;
        let pageFrom = currentPage - 1;
        let pageTo = currentPage + 1;

        if (this.lastPage == 2) {
            pageFrom = 1;
            pageTo = 2;
        } else {
            if (currentPage == this.lastPage) {
                pageFrom = currentPage - 2;
                pageTo = currentPage;
            }
            if (currentPage == 1) {
                pageFrom = currentPage;
                pageTo = currentPage + 2;
            }
        }
        for (let i = pageFrom; i <= pageTo; i++) {
            this.pageList.push(i);
        }
    }



    
}
