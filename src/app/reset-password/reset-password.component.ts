import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
    form!:FormGroup

    constructor(
      private fb:FormBuilder
    ) {
      this.form = this.fb.group({
        password:[null,[Validators.required,Validators.min(8)]],
        confirm_password:[null,[Validators.required]]
      }, { validators: this.passwordsMatchValidator })
    }
    passwordsMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
