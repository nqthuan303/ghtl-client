import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    moduleId: module.id,
    selector: 'confirm-modal',
    templateUrl: './confirmModal.component.html'
})
export class ConfirmModalComponent {

    @ViewChild('modalDirective') private modalDirective: ModalDirective;
    confirmTitle: string;
    @Output() onConfirm = new EventEmitter<boolean>();

    showModal(options: any) {
        this.confirmTitle = options.confirmTitle;
        this.modalDirective.show();
    }

    hideModal() {
        this.modalDirective.hide();
    }

    confirm() {
        this.onConfirm.emit(true);
    }
}
