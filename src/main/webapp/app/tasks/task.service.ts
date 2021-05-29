import { Observable } from 'rxjs';

import { Task, TaskList } from 'app/tasks/task';

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface TaskService {

  /**
   * Set the list of initial tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  init?(): Observable<TaskList[]>;

  /**
   * Returns the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getAll(): Observable<Task[] | TaskList[]>;

  /**
   * Update the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
   updateAll?(tasksList: TaskList[]): Observable<TaskList[]>;

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
  delete(id: string, statusIndex?: number): Observable<void>;
}
