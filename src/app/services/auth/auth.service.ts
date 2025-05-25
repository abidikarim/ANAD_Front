import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../models/classes/login';
import { baseURL } from '../../models/baseUrl';
import { TokenResponse } from '../../models/classes/tokenResponse';
import { PasswordData } from '../../models/classes/passwordData';
import { BaseResponse } from '../../models/classes/baseResponse';
import { ForgetPassword } from '../../models/classes/forgetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(data:Login) {
    const formData = new FormData()
    formData.append("username",data.username)
    formData.append("password",data.password)
    return this.http.post<TokenResponse>(`${baseURL}auth/login`,formData)
  }
  confirmAccount(data:PasswordData) {
      return this.http.patch<BaseResponse>(`${baseURL}auth/confirm_account`,data)
  }
  forgetPassword(data:ForgetPassword) {
    return this.http.post<BaseResponse>(`${baseURL}auth/forget_password`,data)
  }
  resetPassword(data:PasswordData) {
    return this.http.patch<BaseResponse>(`${baseURL}auth/reset_password`,data)
  }
}
