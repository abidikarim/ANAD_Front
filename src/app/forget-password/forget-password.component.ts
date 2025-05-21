import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
    form!:FormGroup

    constructor(
      private fb:FormBuilder
    ) {
      this.form = this.fb.group({
        email:[null,[Validators.required,Validators.email]]
      })
    }
}
