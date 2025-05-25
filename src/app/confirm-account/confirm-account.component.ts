import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth/auth.service';
import { BaseResponse } from '../models/classes/baseResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirm-account',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.css'
})
export class ConfirmAccountComponent {
  form!: FormGroup
  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
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
    this.authService.confirmAccount(data).subscribe({
      next: (res: BaseResponse) => {
        this.loading = false
        if (res.status === 200) {
          this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
          this.router.navigate(["/login"])
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message })
        }
      },
      error: (error) => {
        this.loading = false
        this.messageService.add({ severity: "error", summary: "Error", detail: "Something went wrong. Please try again" })
      }
    })
  }
}
