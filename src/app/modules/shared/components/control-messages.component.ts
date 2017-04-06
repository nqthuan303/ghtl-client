import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
  styles: ['control-messages,div {color: #E82C0C;margin: 6px 0;}']
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() {
    // console.log(this.control);
  }

  get errorMessage() {
    if (this.control) {
      for (let propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          // console.log("errorMessage==> "+ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]));
          return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        }
      }
    }


    return null;
  }
}