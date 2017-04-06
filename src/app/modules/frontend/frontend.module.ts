import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendComponent } from './frontend.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { GuideComponent } from './components/guide/guide.component';
import { PriceComponent } from './components/price/price.component';
import { RuleComponent } from './components/rule/rule.component';
import { ServiceComponent } from './components/service/service.component';

import { SharedModule } from '../shared/shared.module';
import { FrontendRoutingModule } from './frontend-routing.module';

@NgModule({
    declarations: [
        FrontendComponent,
        HeaderComponent,
        FooterComponent,
        IndexComponent,
        AboutComponent,
        ContactComponent,
        GuideComponent,
        PriceComponent,
        RuleComponent,
        ServiceComponent
    ],
    imports: [
        CommonModule,
        FrontendRoutingModule,
        SharedModule
    ]
})
export class FrontendModule { }
