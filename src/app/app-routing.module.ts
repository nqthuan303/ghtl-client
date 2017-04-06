import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'frontend', pathMatch: 'full' },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: 'user',
    loadChildren: './modules/user/user.module#UserModule'
  },
  {
    path: 'frontend',
    loadChildren: './modules/frontend/frontend.module#FrontendModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
