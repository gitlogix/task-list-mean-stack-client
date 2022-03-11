import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { Task } from '../../../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

//  tasks : Task;
  tasks : any;
  title : string;
  isChange: boolean;
  editTask: any;

  constructor(private taskService: TaskService) {
        this.taskService.getTasks()
        .subscribe(tasks => {
          this.tasks = tasks;
        });
   }

  ngOnInit() {
    console.log('Hello from ngOnInit');
  }

  addTask(event) {
    event.preventDefault();
    if (this.title)
    {
      var newTask = {
        title: this.title,
        isDone : false
      }
  
      this.taskService.addTask(newTask)
      .subscribe(task => {
          this.tasks.push(task);
          this.title = '';
      });
    }
  }

  deleteTask(id){
    var taskie = this.tasks;
    this.taskService.deleteTask(id)
    .subscribe(task => {
      for (var i = 0; i < taskie.length; i++ ){
        if (taskie[i]._id == id)
        {
          taskie.splice(i, 1);
        }
      }
    });
    this.tasks = taskie;
  }

  updateTask(task) {
    var updatedTask = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    }

    this.taskService.updateTask(updatedTask)
    .subscribe(task => {
//      task.isDone = !task.isDone
    });
  }

  changeTask(id){
    this.taskService.changeTask(id)
    .subscribe(task => {
      this.editTask = task,
      this.isChange = !this.isChange;
    });
  }

  saveTask(task) {

    var taskie = this.tasks;
    var updatedTask = {
      _id: task._id,
      title: task.title,
      isDone: task.isDone
    }

    this.taskService.updateTask(updatedTask)
    .subscribe(task => {
      for (var i = 0; i < taskie.length; i++ ) {
        if (taskie[i]._id == updatedTask._id) {
          taskie[i].title = updatedTask.title;
        }
      }
      this.tasks = taskie;
      this.isChange = !this.isChange
    });

    
  }

}
