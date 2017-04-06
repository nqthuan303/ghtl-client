import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { IndexComponent } from './components/index/index.component';

import { ListClientComponent } from './components/client/list/listClient.component';
import { FormClientComponent } from './components/client/form/formClient.component';
import { FormClientResolve } from './components/client/form/formClient.resolve';
import { ClientResolve } from '../../shared/resolves/client.resolve';

import { ListOrderComponent } from './components/order/list/listOrder.component';
import { FormOrderComponent } from './components/order/form/formOrder.component';
import { FormOrderResolve } from './components/order/form/formOrder.resolve';
import { DistrictResolve } from '../../shared/resolves/district.resolve';

import { ListUserComponent } from './components/user/list/listUser.component';
import { FormUserComponent } from './components/user/form/formUser.component';
import { FormUserResolve } from './components/user/form/formUser.resolve';
import { UserResolve } from '../../shared/resolves/user.resolve';

import { ListShippingComponent } from './components/shipping/list/listShipping.component';
import { FormShippingComponent } from './components/shipping/form/formShipping.component';

import { OrderLogComponent } from './components/orderLog/orderLog.component';
import { OrderStatusResolve } from '../../shared/resolves/orderStatus.resolve';

import { AuthGuard } from '../../auth-guard.service';

let clientRoutes = {
  path: 'client',
  children: [
    { path: '', component: ListClientComponent },
    {
      path: 'form',
      component: FormClientComponent,
      resolve: {
        districtResolve: DistrictResolve
      }
    },
    {
      path: 'form/:id',
      component: FormClientComponent,
      resolve: {
        dataResolve: FormClientResolve,
        districtResolve: DistrictResolve
      }
    }
  ]
};

let orderRoutes = {
  path: 'order',
  children: [
    {
      path: '', component: ListOrderComponent,
      resolve: {
        orderStatusResolve: OrderStatusResolve
      }
    },
    {
      path: 'form',
      component: FormOrderComponent,
      resolve: {
        clientResolve: ClientResolve,
        orderStatusResolve: OrderStatusResolve,
        districtResolve: DistrictResolve
      }
    },
    {
      path: 'form/:id',
      component: FormOrderComponent,
      resolve: {
        dataResolve: FormOrderResolve,
        clientResolve: ClientResolve,
        orderStatusResolve: OrderStatusResolve,
        districtResolve: DistrictResolve
      }
    },
  ]
};

let userRoutes = {
  path: 'user',
  children: [
    { path: '', component: ListUserComponent },
    {
      path: 'form', component: FormUserComponent,
      resolve: {
        districtResolve: DistrictResolve
      }
    },
    {
      path: 'form/:id', component: FormUserComponent,
      resolve: {
        dataResolve: FormUserResolve,
        districtResolve: DistrictResolve
      }
    },
  ]
};

let indexRoutes = { path: 'index', component: IndexComponent };
let orderLogRoutes = { path: 'orderlog', component: OrderLogComponent };
let shippingRoutes = {
  path: 'shipping',
  children: [
    { path: '', component: ListShippingComponent },
    { path: 'form', component: FormShippingComponent }
  ]

};

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [indexRoutes, orderLogRoutes, clientRoutes, orderRoutes, userRoutes, shippingRoutes]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }