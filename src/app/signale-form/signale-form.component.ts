import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../services/report/report.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signale-form',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signale-form.component.html',
  styleUrl: './signale-form.component.css'
})
export class SignaleFormComponent {
  form!:FormGroup

  constructor(private fb:FormBuilder,private reportService:ReportService,private messageService:MessageService){
    this.form = this.fb.group({
      first_name:[null,[Validators.required]],
      last_name:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      phone:[null,[Validators.required]],
      description:[null,[Validators.required]]
    })
  }

  onsubmit() {
      if(this.form.invalid) {
        this.form.markAllAsTouched()
        return
      }
      const data = this.form.value
      this.reportService.addReport(data).subscribe({
        next:(res)=>{
          if(res.status === 201) {
            this.messageService.add({severity:"success",summary:"Success",detail:res.message})
            this.form.reset()
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
