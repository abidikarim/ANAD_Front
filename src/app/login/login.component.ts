import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../models/classes/login';
import { AuthService } from '../services/auth/auth.service';
import { TokenResponse } from '../models/classes/tokenResponse';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup
  loading: boolean = false
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }
    this.loading = true
    const login: Login = this.loginForm.value
    this.authService.login(login).subscribe({
      next: (res: TokenResponse) => {
        this.loading = false
        if (res.status === 200) {
          this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
          localStorage.setItem("token", res.access_token)
          this.router.navigate(['/dashboard/profile'])
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message })
        }
      },
      error: (error) => {
        this.loading = false
        this.messageService.add({ severity: "error", summary: "Error", detail: "Something went wrong. Try again please." })
      }
    })

  }
}
