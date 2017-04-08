import { NgModule }       from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { ConfirmModalComponent } from './components/confirmModal.component';

@NgModule({
  imports: [
    ModalModule.forRoot()
  ],
  declarations: [
    ConfirmModalComponent
  ],
  exports:[ ConfirmModalComponent ]
})
export class SharedModule {}
