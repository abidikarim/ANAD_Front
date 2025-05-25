import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AdminService } from '../services/admin/admin.service';
import { Admin } from '../models/classes/admin';
import { MessageService } from 'primeng/api';
import { BaseResponse } from '../models/classes/baseResponse';

@Component({
  selector: 'app-admin-profile',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  form!: FormGroup
  admin!: Admin
  token!: string
  id!: number
  loading: boolean = false
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService
  ) {
    this.createForm()
    this.token = localStorage.getItem("token") || ""
    const payload = this.token.split('.')[1];
    this.id = JSON.parse(atob(payload)).id;
  }
  ngOnInit() {
    this.adminService.getById(this.id).subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.admin = res
          this.createForm()
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: "Error while fetch admin." })
        }
      },
      error: (error) => {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Somthing went wrong." })
      }
    })
  }
  createForm() {
    this.form = this.fb.group({
      first_name: [this.admin?.first_name || null, [Validators.required]],
      last_name: [this.admin?.last_name || null, [Validators.required]],
      email: [this.admin?.email || null, [Validators.required, Validators.email]],
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
    this.adminService.edit(this.admin.id, data).subscribe({
      next: (res: BaseResponse) => {
        this.loading = false
        if (res.status === 200) {
          this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
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
