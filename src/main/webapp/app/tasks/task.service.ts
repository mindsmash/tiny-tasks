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
   * Returns the list of tasks not done.
   *
   * @returns an `Observable` holding the list of tasks not done
   */
  getTasksNotDone(): Observable<Task[]>;

  /**
   * Returns the list of tasks done.
   *
   * @returns an `Observable` holding the list of tasks done
   */
  getTasksDone(): Observable<Task[]>;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param name the task's name
   * @returns an `Observable` holding the created task
   */
  create(name: string): Observable<Task>;

  /**
   * Update a task in the list of tasks.
   *
   * @param task task to be updated
   * @returns an empty `Observable`
   */
  update(task: Task): Observable<void>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;

  /**
   * Removes all tasks from the list of tasks.
   *
   * @returns an empty `Observable`
   */
  deleteAll(): Observable<void>;
}
