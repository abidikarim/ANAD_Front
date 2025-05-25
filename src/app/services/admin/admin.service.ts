import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../../models/classes/admin';
import { baseURL } from '../../models/baseUrl';
import { BaseResponse } from '../../models/classes/baseResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getById(id:number) {
    const headers = new HttpHeaders({
      "content-type":"application/json",
      Authorization:"Bearer "+ localStorage.getItem("token")
    })
    return this.http.get<Admin>(`${baseURL}admin/${id}`,{headers})
  }
  edit(id:number,data:Admin) {
    const headers = new HttpHeaders({
      "content-type":"application/json",
      Authorization:"Bearer "+ localStorage.getItem("token")
    })
    return this.http.put<BaseResponse>(`${baseURL}admin/${id}`,data,{headers})
  }
}
