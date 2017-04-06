import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
// import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        // ToastModule.forRoot(),
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule { }
