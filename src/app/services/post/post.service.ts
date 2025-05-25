import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '../../models/classes/filter';
import { PagedResponse } from '../../models/classes/pagedResponse';
import { baseURL } from '../../models/baseUrl';
import { Post } from '../../models/classes/post';
import { BaseResponse } from '../../models/classes/baseResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getPosts(filter:Filter) {
    let params = new HttpParams()
      .set("page_number",filter.page_number)
      .set("page_size",filter.page_size)
    if(filter.name_substr) params = params.set("name_substr",filter.name_substr)
    return this.http.get<PagedResponse<Post>>(`${baseURL}post`,{params})
  }
  addPost(post_data:Post,image:File) {
    const headers = new HttpHeaders({
      Authorization:"Bearer "+localStorage.getItem("token")
    })
    const formData = new FormData()
    formData.append("post_data",JSON.stringify(post_data))
    formData.append("image",image)
    return this.http.post<BaseResponse>(`${baseURL}post`,formData,{headers})
  }
  editPost(id:number, post_data:Post, image?:File) {
    const headers = new HttpHeaders({
      Authorization:"Bearer "+localStorage.getItem("token")
    })
    const formData = new FormData()
    formData.append("post_data",JSON.stringify(post_data))
    if(image) formData.append("image",image)
    return this.http.put<BaseResponse>(`${baseURL}post/${id}`,formData,{headers})
  }
  deletePost(id:number) {
    const headers = new HttpHeaders({
      Authorization:"Bearer "+localStorage.getItem("token")
    })
    return this.http.delete<BaseResponse>(`${baseURL}post/${id}`,{headers})
  }
}
