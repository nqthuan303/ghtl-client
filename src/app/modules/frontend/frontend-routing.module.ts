import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontendComponent } from './frontend.component';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { GuideComponent } from './components/guide/guide.component';
import { PriceComponent } from './components/price/price.component';
import { RuleComponent } from './components/rule/rule.component';
import { ServiceComponent } from './components/service/service.component';

const userRoutes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'index', pathMatch: 'full' },
          { path: 'index', component: IndexComponent },
          { path: 'about', component: AboutComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'guide', component: GuideComponent },
          { path: 'price', component: PriceComponent },
          { path: 'rule', component: RuleComponent },
          { path: 'service', component: ServiceComponent },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FrontendRoutingModule { }