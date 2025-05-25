import { Component } from '@angular/core';
import { Post } from '../models/classes/post';
import { PostService } from '../services/post/post.service';
import { Filter } from '../models/classes/filter';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualites',
  imports: [
    CommonModule
  ],
  templateUrl: './actualites.component.html',
  styleUrl: './actualites.component.css'
})
export class ActualitesComponent {
  posts!:Post[]
  filter = new Filter()
  constructor(private postService:PostService,private messageService:MessageService) {}
  

  ngOnInit() {    
    this.loadPosts()
  }
  loadPosts() {
    this.postService.getPosts(this.filter).subscribe({
      next:(res)=>{
        if(res.status === 200) {
          this.posts = res.list
        }else {
           this.messageService.add({severity:"error",summary:"Error",detail:res.message})
        }
      },
      error:(error)=>{
        this.messageService.add({severity:"error",summary:"Error",detail:"Somthing went wrong."})
      }
    })
  }
}
