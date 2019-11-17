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
   * @returns an `Observable` holding the created task
   */
  create(name: string): Observable<Task>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;

  /**
   * Changes the properties of a task with the given ID.
   *
   * @param id the ID of the task to be changed
   * @param data the Data-Object for overriden the properties of a task
   * @returns an empty `Observable`
   */
  patch(id: string, data: object): Observable<void>;

  /**
   * Removes multiple tasks.
   *
   * @returns an empty `Observable`
   */
  deleteMultiple(tasks: Task[]): Observable<void>;
}
