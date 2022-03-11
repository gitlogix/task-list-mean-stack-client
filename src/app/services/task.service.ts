import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
    console.log('Task Service is running');
   }

   getTasks() {
     return (this.httpClient.get("http://localhost:3300/api/tasks"));
   }

   addTask(newTask) {
 //    console.log(newTask);
      var header = new HttpHeaders()
      .append('Content-Type', 'application/json');  // No headers.append
      return this.httpClient.post("http://localhost:3300/api/task", JSON.stringify(newTask), {headers : header});
   } 
   
   deleteTask(id) {
//      console.log(id);
      return this.httpClient.delete("http://localhost:3300/api/task/"+id);
   }

   updateTask(task){
     var header = new HttpHeaders()
     .append('Content-Type', 'application/json');
    return this.httpClient.put("http://localhost:3300/api/task/"+task._id, JSON.stringify(task), {headers: header});
   }

   changeTask(id){
    return (this.httpClient.get("http://localhost:3300/api/task/"+id));
   }
}
