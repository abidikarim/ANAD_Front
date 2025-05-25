import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../models/classes/post';
import { PostService } from '../services/post/post.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { BaseResponse } from '../models/classes/baseResponse';

@Component({
  selector: 'app-actualite-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './actualite-form.component.html',
  styleUrl: './actualite-form.component.css'
})
export class ActualiteFormComponent {
  form!: FormGroup
  @Input() postData?: Post
  @Output() postSaved = new EventEmitter<string>()
  selectedFile?: File
  isEditMode = false;
  isFileValid = true;
  loading = false
  constructor(private fb: FormBuilder, private postService: PostService, private messageService: MessageService) {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    if (this.postData) {
      this.isEditMode = true
      this.form.patchValue({
        title: this.postData.title,
        description: this.postData.description
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postData'] && this.postData) {
      this.isEditMode = true;
      this.form.patchValue({
        title: this.postData.title,
        description: this.postData.description
      });
    }
  }

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.isFileValid = true;
    } else {
      this.selectedFile = undefined;
      this.isFileValid = false;
    }
  }

  onSubmit() {
    if (this.form.invalid || (!this.isEditMode && !this.selectedFile)) {
      this.isFileValid = false
      this.form.markAllAsTouched()
      return
    }

    this.isFileValid = true
    this.loading = true
    const data = this.form.value

    if (this.isEditMode) {
      if (this.postData) {
        this.postService.editPost(this.postData.id, data, this.selectedFile).subscribe({
          next: (res: BaseResponse) => {
            this.loading = false
            if (res.status === 200) {
              this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
              this.postSaved.emit("editModal")
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
    } else {
      if (this.selectedFile) {
        this.postService.addPost(data, this.selectedFile).subscribe({
          next: (res: BaseResponse) => {
            this.loading = false
            if (res.status === 201) {
              this.messageService.add({ severity: "success", summary: "Success", detail: res.message })
              this.postSaved.emit("addModal")
            } else {
              this.messageService.add({ severity: "error", summary: "Error", detail: res.message })
            }
          },
          error: (error) => {
            this.loading = false
            this.messageService.add({ severity: "error", summary: "Error", detail: "Somthing went wrong. Please try agian." })
          }
        })
      }
    }
  }
}
