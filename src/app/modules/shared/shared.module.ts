import { NgModule,CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { ValidationService } from '../../shared/services/validation.service';
import { ControlMessagesComponent } from './components/control-messages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ControlMessagesComponent
  ],
  exports:[ControlMessagesComponent]
})
export class SharedModule {}
