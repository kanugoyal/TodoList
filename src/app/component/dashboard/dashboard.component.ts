import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

import { Observable } from 'rxjs';
import {tap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService ) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
    
  }

  getAllTask() {
    this.crudService.getAllTask().pipe(
      tap((res) => {
        this.taskArr = res;
      }),
      catchError((err) => {
        alert("Unable to get the list of tasks");
        return [];
      })
    ).subscribe();
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).pipe(
      tap((res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      }),
      catchError((err) => {
        alert(err);
        return [];
      })
    ).subscribe();
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).pipe(
      tap((res) => {
        this.ngOnInit();
      }),
      catchError((err) => {
        alert("Failed to update task");
        return [];
      })
    ).subscribe();
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).pipe(
      tap((res) => {
        this.ngOnInit();
      }),
      catchError((err) => {
        alert("Failed to delete task");
        return [];
      })
    ).subscribe();
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
    
  }

}
