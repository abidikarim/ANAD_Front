import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '../../models/classes/filter';
import { PagedResponse } from '../../models/classes/pagedResponse';
import { Report } from '../../models/classes/report';
import { baseURL } from '../../models/baseUrl';
import { BaseResponse } from '../../models/classes/baseResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  getReports(filter:Filter) {
    const headers = new HttpHeaders({
      "content-type":"application/json",
      Authorization:"Bearer "+localStorage.getItem("token")
    })
    let params = new HttpParams()
    .set("page_size",filter.page_size)
    .set("page_number",filter.page_number)
    if(filter.name_substr) params = params.set("name_substr",filter.name_substr)
      return this.http.get<PagedResponse<Report>>(`${baseURL}report`,{params,headers})
  }
  addReport(data:Report) {
    const headers = new HttpHeaders({
      "content-type":"application/json",
      Authorization:"Bearer "+localStorage.getItem("token")
    })
    return this.http.post<BaseResponse>(`${baseURL}report`,data,{headers})
  }
}
