import { Component, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../../../shared/models/user.model';
import { ValidationService } from '../../../../shared/services/validation.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',
    providers: [ UserService ]
})
export class LoginComponent {
    objForm: FormGroup;
    objData: UserModel = new UserModel();

    constructor(
        @Inject(FormBuilder) formBuilder: FormBuilder,
        private service: UserService,
        private router: Router
    ) {

        this.objForm = formBuilder.group({
            'username': ['', [Validators.required, ValidationService.usernameValidator]],
            'password': ['', [Validators.required, ValidationService.passwordValidator]]
        });
    }

    login() {
        if (!this.objForm.valid) {
            return;
        }
        this.service.login(this.objData).then((result) => {
            if(result.status == 'success') {
                localStorage.setItem('auth', JSON.stringify(result.data));
                this.router.navigate(['/admin']);
            }
        });
    }

}
