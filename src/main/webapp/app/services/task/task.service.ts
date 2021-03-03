import { Observable, Subject } from 'rxjs';

import { Task } from 'app/interfaces/task';

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface TaskService {

  /**
   * Returns the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getAll(userId: string): Observable<Task[]>;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param name the task's name
   * @param creator the task's creator (uuid)
   * @returns an `Observable` holding the created task
   */
  create(name: string, creator: string): Observable<Task>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;

  /**
   * Forces reload of tasks
   */
  reloadTasks$: Subject<void>;
}
