import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Post } from '../models/classes/post';
import { Filter } from '../models/classes/filter';
import { PostService } from '../services/post/post.service';
import { MessageService } from 'primeng/api';
import * as bootstrap from 'bootstrap'
import { ActualiteFormComponent } from '../actualite-form/actualite-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-actualities-management',
  imports: [
    CommonModule,
    ActualiteFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './actualities-management.component.html',
  styleUrl: './actualities-management.component.css'
})
export class ActualitiesManagementComponent {
  posts!: Post[]
  filter = new Filter()
  showDialog: boolean = false
  selectedPost: Post | undefined;
  selectedPostId!: number;
  deleteModal!: bootstrap.Modal
  form!: FormGroup
  constructor(
    private postService: PostService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name_substr: [null],
    })
    this.form.valueChanges.pipe(debounceTime(1000)).subscribe((data) => {
      this.filter.name_substr = data.name_substr
      this.loadPosts()
    })
  }

  ngOnInit() {
    this.loadPosts()
  }
  loadPosts() {
    this.postService.getPosts(this.filter).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.posts = res.list
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message })
        }
      },
      error: (error) => {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Somthing went wrong." })
      }
    })
  }

  onEdit(post: Post) {
    this.selectedPost = post
    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show()
  }

  handlePostSaved(modalId: string) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
        modalEl.addEventListener('hidden.bs.modal', () => {
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
          document.body.style.paddingRight = '';
          document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
          this.loadPosts();
        }, { once: true });
      }
    }
  }
  onDelete(id: number) {
    this.selectedPostId = id;
    const modalEl = document.getElementById('confirmDeleteModal');
    if (modalEl) {
      this.deleteModal = new bootstrap.Modal(modalEl);
      this.deleteModal.show()
    }
  }
  confirmDelete() {
    this.postService.deletePost(this.selectedPostId).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.loadPosts()
          this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
          this.deleteModal.hide()
        } else {
          this.messageService.add({ severity: "error", summary: "Error", detail: res.message })
        }
      },
      error: (error) => {
        this.messageService.add({ severity: "error", summary: "Error", detail: "Somthing went wrong. Please try again." })
      }
    })
  }
}
