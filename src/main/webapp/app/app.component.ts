import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface ITodos {
  id?: number;
  task: string;
  isCompleted?: boolean
}
@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private todos: ITodos[];
  private URL_ENDPOINT = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTodos().subscribe(todos => this.todos = todos);
  }

  // TODO refactor/ cleanup code and move it to service
  getTodos():Observable<ITodos[]> {
    return this.http
      .get<ITodos[]>(this.URL_ENDPOINT).pipe(
        tap(_ => console.log(_))
      )
  }

  addTodo(task):Observable<ITodos> {
    const todo: ITodos = {
      task
    };
    return this.http
      .post<ITodos>(this.URL_ENDPOINT, todo);
  }
  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(task: string): void {
    this.addTodo(task).subscribe(t =>
      this.todos.push(t)
    );
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.todos.splice(index, 1);
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.todos.splice(0);
  }
}
