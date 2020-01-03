import {Observable} from 'rxjs';

import {Task} from 'app/tasks/task';
import {HttpResponse} from "@angular/common/http";

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
   * @returns an `Observable` holding the created task
   */
  create(name: string, file?: File): Observable<Task>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;

  /**
   * Download file attached to task.
   *
   * @param fileName the fileName of file attached
   * @returns a blob object with image `Blob`
   */
  downloadFile(fileName: String): Observable<HttpResponse<Blob>>;
}
