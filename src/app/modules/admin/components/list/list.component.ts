import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'

declare var $: any;
declare var App: any;

@Component({
    moduleId: module.id,
    selector: 'admin-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    @Input('service') service;
    @Input('arrHeader') arrHeader;
    @Input('arrColumns') arrColumns;
    @Input('componentInfo') componentInfo;
    @Input('options') options; //Input là nhận dữ liệu từ component cha
    @Input('recordsPerPageList') recordsPerPageList;

    @Output() onChecked = new EventEmitter<any>();

    /* this variable is used for order list only */
    @Output() onChangeStatus = new EventEmitter<any>();
    /* ===========================================*/

    items: Array<any> = new Array<any>();
    numOfItem: number;

    pageList: Array<number>;
    showFrom: number = 1;
    showTo: number;
    rowNumberList: Array<number>;
    checkedList: any = {};
    lastPage: number;
    checkedAll = false;

    constructor(private router: Router) {

    }
    //tự chạy khi mới vào component
    ngOnInit() {
        this.showTo = this.recordsPerPageList[0];
        this.getData(true);
    }

    ngAfterViewInit() {
        let $this = this;
        $('#main-content').on('click', '.btn-edit', function (e) {
            let itemId = this.parentNode.parentNode.children[0].value;
            let editLink = 'admin/' + $this.componentInfo.name + '/form/' + itemId;
            $this.router.navigate([editLink]);
        });
    }

    sort(sortField: string, allowSort: boolean) {
        if (!allowSort) { return; }
        this.options['sortField'] = sortField;

        if (this.options['sortValue']) {
            this.options['sortValue'] = - this.options['sortValue'];
        } else {
            this.options['sortValue'] = 1;
        }
        this.getData(false);
    }
    getData(getNumOfItem: boolean) {
        App.blockUI();
        this.service.listItems(this.options).then(result => {

            this.items = result;
            this.showFrom = this.options.recordsPerPage * (this.options.page - 1) + 1;
            this.showTo = this.options.recordsPerPage * this.options.page;

            if (this.options.page == this.lastPage) {
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
            this.service.numOfItem(this.options).then(result => {
                this.numOfItem = 0;
                if(result.length > 0) {
                    this.numOfItem = result;
                }
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
        this.onChecked.emit(this.checkedList);

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
        this.onChecked.emit(this.checkedList);
    }

    changeRecoresPerPage($event) {
        this.options.recordsPerPage = $event.target.value;
        this.options.page = 1;
        this.getData(false);
    }
    trackByIndex(index: number, obj: any): any {

        if (obj.province_id && obj.district_id && obj.ward_id) {
            let fullAddress: string = '';

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

        return obj;
    }

    goPage(page: number) {
        this.options.page = page;
        this.getData(false);
    }
    goPrevPage() {
        if (this.options.page <= 1) {
            return;
        }
        this.options.page = this.options.page - 1;
        this.getData(false);
    }
    goNextPage() {
        if (this.options.page >= this.lastPage) {
            return;
        }
        this.options.page = this.options.page + 1;
        this.getData(false);
    }

    goFirstPage() {
        this.options.page = 1;
        this.getData(false);
    }

    goLastPage() {
        this.options.page = this.lastPage;
        this.getData(false);
    }

    getLastPage(): number {
        let result: number;
        if (this.numOfItem % this.options.recordsPerPage == 0) {
            result = this.numOfItem / this.options.recordsPerPage;
        } else {
            result = Math.floor(this.numOfItem / this.options.recordsPerPage) + 1;
        }
        return result;
    }

    setPageList(): void {
        this.pageList = [];

        let currentPage = this.options.page;
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
