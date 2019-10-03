import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from 'app/tasks/task';

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface TaskService {

  /**
   * Returns the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getAll(): Observable<Task[]>;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param name the task's name
   * @param image the task's attached image
   * @returns an `Observable` holding the created task
   */
  create(name: string, image: File): Observable<Task>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;

  /**
   * Retrieves the attach related to a task
   *
   * @param id the ID of the task
   * @returns an `Observable` holding the attach
   */
  getAttach(id: string): Observable<HttpResponse<Blob>>;
}
