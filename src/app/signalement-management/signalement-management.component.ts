import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Report } from '../models/classes/report';
import { Filter } from '../models/classes/filter';
import { ReportService } from '../services/report/report.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-signalement-management',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signalement-management.component.html',
  styleUrl: './signalement-management.component.css'
})
export class SignalementManagementComponent {
  reports!:Report[]
  filter= new Filter()
  form!:FormGroup
  constructor(private reportService:ReportService, private messageService:MessageService, private fb:FormBuilder) {
      this.form = this.fb.group({
        name_substr:[null,]
      })
      this.form.valueChanges.pipe(debounceTime(1000)).subscribe((data)=>{
        this.filter.name_substr = data.name_substr
        this.loadReports()
      })
  }

ngOnInit() {
  this.loadReports()
}
  loadReports() {
    this.reportService.getReports(this.filter).subscribe({
      next:(res)=>{
        if(res.status === 200) {
          this.reports = res.list
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
