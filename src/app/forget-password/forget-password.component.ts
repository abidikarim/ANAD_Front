import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ForgetPassword } from '../models/classes/forgetPassword';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { BaseResponse } from '../models/classes/baseResponse';

@Component({
  selector: 'app-forget-password',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  form!: FormGroup
  loading: boolean = false
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.loading = true
    const data: ForgetPassword = this.form.value
    this.authService.forgetPassword(data).subscribe({
      next: (res: BaseResponse) => {
        this.loading = false
        if (res.status === 200) {
          this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
          this.form.reset()
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message })
        }
      },
      error: (error) => {
        this.loading = false
        this.messageService.add({ severity: "error", summary: "Error", detail: "Somthing went wrong. Please try again." })
      }
    })
  }
}
