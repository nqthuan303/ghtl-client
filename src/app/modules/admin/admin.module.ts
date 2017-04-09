import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*========== import modules ===========*/
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SelectModule } from 'angular2-select';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

/*========== import services ===========*/
import { OrderService } from '../../shared/services/order.service';
import { ClientService } from '../../shared/services/client.service';
import { UserService } from '../../shared/services/user.service';
import { OrderStatusService } from '../../shared/services/orderstatus.service';
import { DistrictService } from '../../shared/services/district.service';
import { WardService } from '../../shared/services/ward.service';

/*========== import resolves ===========*/
import { ClientResolve } from '../../shared/resolves/client.resolve';
import { UserResolve } from '../../shared/resolves/user.resolve';
import { OrderStatusResolve } from '../../shared/resolves/orderStatus.resolve';
import { FormOrderResolve } from './components/order/form/formOrder.resolve';
import { FormClientResolve } from './components/client/form/formClient.resolve';
import { FormUserResolve } from './components/user/form/formUser.resolve';
import { DistrictResolve } from '../../shared/resolves/district.resolve';

/*========== import pipes ===========*/
import { SafeHtmlPipe } from '../../shared/pipes/safeHtml.pipe';
import { ProcessHtmlColumnPipe } from './components/list/processHtmlColumn.pipe';

/*========== import components ===========*/
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListComponent } from './components/list/list.component';
import { IndexComponent } from './components/index/index.component';
import { ListClientComponent } from './components/client/list/listClient.component';
import { FormClientComponent } from './components/client/form/formClient.component';
import { ListOrderComponent } from './components/order/list/listOrder.component';
import { FormOrderComponent } from './components/order/form/formOrder.component';
import { ListUserComponent } from './components/user/list/listUser.component';
import { FormUserComponent } from './components/user/form/formUser.component';
import { OrderLogComponent } from './components/orderLog/orderLog.component';
import { ListShippingComponent } from './components/shipping/list/listShipping.component';
import { FormShippingComponent } from './components/shipping/form/formShipping.component';

@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ListComponent,
    IndexComponent,
    ListClientComponent,
    FormClientComponent,
    ListOrderComponent,
    FormOrderComponent,
    FormUserComponent,
    ListUserComponent,
    ListShippingComponent,
    FormShippingComponent,
    OrderLogComponent, 
    SafeHtmlPipe,
    ProcessHtmlColumnPipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SelectModule,
    ToastModule.forRoot(),
    SharedModule,
    AdminRoutingModule
  ],
  providers: [
    ClientService,
    OrderService,
    OrderStatusService,
    DistrictService,
    WardService,
    ClientResolve,
    OrderStatusResolve,
    FormOrderResolve,
    FormClientResolve,
    FormUserResolve,
    DistrictResolve,
    UserService,
    UserResolve
  ]
})
export class AdminModule { }
