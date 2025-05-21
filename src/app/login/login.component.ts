import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup

  constructor(
    private fb:FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
  }
  ngOnInit() {}
  onSubmit() {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }
  }
}
