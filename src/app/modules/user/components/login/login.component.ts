import { Component, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../../../shared/models/user.model';
import { ValidationService } from '../../../../shared/services/validation.service';
import { UserService } from '../../../../shared/services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var App: any;

@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',
    providers: [ UserService ]
})
export class LoginComponent {
    objForm: FormGroup;
    objData: UserModel = new UserModel();
    submited: boolean;

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        private service: UserService,
        private router: Router,
        private toastr: ToastsManager,
        vcr: ViewContainerRef,
    ) {

        this.toastr.setRootViewContainerRef(vcr);
        this.objForm = formBuilder.group({
            'username': ['', [Validators.required]],
            'password': ['', [Validators.required]]
        });
    }

    login() {
        this.submited = true;
        if (!this.objForm.valid) {
            return;
        }
        this.submited = false;
        App.blockUI();
        this.service.login(this.objData).then((result) => {
            App.unblockUI();
            if(result.status == 'success') {
                localStorage.setItem('auth', JSON.stringify(result.data));
                this.router.navigate(['/admin']);
            }else{
                this.toastr.error(result.data.msg, 'Error!');
            }
        });
    }

}
