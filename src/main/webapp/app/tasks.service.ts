import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  TASKS_URL = 'http://localhost:8080/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks() {
    return this.httpClient.get(this.TASKS_URL);
  }

  createTask(name: String) {
    return this.httpClient.post(this.TASKS_URL, {
      name: name
    });
  }

  deleteTask(id: Number) {
    return this.httpClient.delete(this.TASKS_URL + '/' + id);
  }

  deleteAllTasks() {
    return this.httpClient.delete(this.TASKS_URL);
  }
}
