import { Component, AfterViewInit } from '@angular/core';

declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent {
    ngAfterViewInit() {
        $('#nav-accordion').dcAccordion({
            eventType: 'click',
            autoClose: true,
            saveState: true,
            disableLink: true,
            speed: 'slow',
            showCount: false,
            autoExpand: true,
            //        cookie: 'dcjq-accordion-1',
            classExpand: 'dcjq-current-parent'
        });
    }
}
