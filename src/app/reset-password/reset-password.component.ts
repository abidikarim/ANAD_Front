import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordData } from '../models/classes/passwordData';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { BaseResponse } from '../models/classes/baseResponse';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  form!: FormGroup
  loading: boolean = false
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirm_password: [null, [Validators.required]]
    }, { validators: this.passwordsMatchValidator })
  }
  passwordsMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.loading = true
    const data = this.form.value
    data.code = this.activeRoute.snapshot.queryParamMap.get("code")
    this.authService.resetPassword(data).subscribe({
      next: (res: BaseResponse) => {
        if (res.status === 200) {
          this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
          this.route.navigate(["/login"])
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message })
        }
      },
      error: (error) => {
        this.loading = true
        this.messageService.add({ severity: "error", summary: "Success", detail: "Somthing went wrong. Please try again." })
      }
    })
  }
}
