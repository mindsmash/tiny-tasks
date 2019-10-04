import { Observable } from 'rxjs';

import { HttpResponse } from '@angular/common/http';
import { Task } from './task';

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
   * @param imageFile the image file
   * @returns an `Observable` holding the created task
   */
  create(name: string, imageFile?: File): Observable<Task>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;

  /**
   * Download a image from a task with the given ID from the list of tasks.
   *
   * @param id the ID of the task
   * @returns a blob object with image `Blob`
   */
  downloadImage(id: String): Observable<HttpResponse<Blob>>;
}
