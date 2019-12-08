import {Observable} from 'rxjs';

import {Task} from 'app/tasks/task';

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
   * Mark the task as done
   *
   * @param id the ID of the task to be updated
   * @returns an empty `Observable`
   */
  markAsDone(id: string): Observable<void>;

  /**
   * Delete all done tasks
   *
   * @returns an empty `Observable`
   */
  deleteAllDone(): Observable<void>;
}
