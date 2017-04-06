import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomValidators } from 'ng2-validation';

import { DistrictModel } from '../../../../../shared/models/district.model';
import { WardModel } from '../../../../../shared/models/ward.model';
import { UserModel } from '../../../../../shared/models/user.model';

import { UserService } from '../../../../../shared/services/user.service';
import { DistrictService } from '../../../../../shared/services/district.service';
import { WardService } from '../../../../../shared/services/ward.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'admin-form-User',
    templateUrl: './formUser.component.html'
})
export class FormUserComponent {

    objForm: FormGroup;
    objData: UserModel = new UserModel();
    submited: boolean;
    districtList: Array<DistrictModel> = new Array<DistrictModel>();
    wardList: Array<WardModel> = new Array<WardModel>();
    action: string = 'add';
    params: Params;
    isWardListAvailable: boolean = false;

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        private service: UserService,
        private districtService: DistrictService,
        private wardService: WardService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private activatedRoute: ActivatedRoute
    ) {
        this.submited = false;
        this.toastr.setRootViewContainerRef(vcr);
        this.objForm = formBuilder.group({
            'name': ['', [Validators.required]],
            'username': ['', [Validators.required]],
            'password': ['', [Validators.required]],
            'rePassword': ['', [Validators.required, this.checkRePassword]],
            'phone_number': ['', [Validators.required, CustomValidators.phone('vi-VN')]],
            'district_id': ['', [Validators.required]],
            'ward_id': [''],
            'address': ['', [Validators.required]],
            'status': ['']
        });
    }

    ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
            this.params = params;
        });

        if (this.params['id']) {
            this.action = 'update';
            this.objForm.get('password').setValidators(null);
            this.objForm.get('rePassword').setValidators(null);

            this.objData = this.activatedRoute.snapshot.data['dataResolve'];

            let $this = this;
            this.getWardList(this.objData.district_id).then(function (result) {
                $this.isWardListAvailable = true;
            });
        }

        this.districtList = this.activatedRoute.snapshot.data['districtResolve'];
    }

    checkRePassword(control: any) {
        if (control.value === control.root.value.password || !control.value) {
            return null;
        }
        return { "isEqualPass": true };
    }

    getWardList(districtId: string) {
        return this.wardService.listItems(districtId).then(result => {
            this.wardList = result;
        });
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
        this.submited = true;
        if (!this.objForm.valid) {
            return;
        }
        this.submited = false;
        if (this.action === 'add') {
            this.service.add(this.objData).then((result) => {
                if (result.statusCode == 0) {
                    this.toastr.success('Thêm user thành công!', result.message);
                    this.objForm.reset();
                } else{
                    this.toastr.error('Đã xảy ra lỗi trong quá trình thêm user!!',result.message)
                }
            });
        }

        if (this.action === 'update') {
            this.service.update(this.objData).then((result) => {
                if (result.statusCode == 0) {
                    this.toastr.success('Cập nhật thông tin user thành công!', result.message)
                } else {
                    this.toastr.error('Đã xảy ra lỗi trong quá trình cập nhật!', result.message)
                }
            });
        }


    }
}
