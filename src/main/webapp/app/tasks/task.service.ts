import {Observable} from 'rxjs';

import {Task} from './task';

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface TaskService {

  /**
   * Returns the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getAll(search?: string): Observable<Task[]>;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param name the task's name
   * @returns an `Observable` holding the created task
   */
  create(name: string): Observable<Task>;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param id the task's id
   * @param name task name
   * @param dueDate the task's due date
   * @returns an `Observable` holding the created task
   */
  update(id: string, name: string, dueDate: Date): Observable<void>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;
}
