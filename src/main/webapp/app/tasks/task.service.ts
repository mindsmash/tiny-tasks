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
   * Marks the task of the given ID from the list of tasks to the completed state.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
   updateStatus(id: string, status: boolean): Observable<Task>;

  /**
   * Clears all the completed tasks from the list
   * 
   * @param completedTasks array of completed tasks to be removed
   * @returns an empty `Observable`
   */
    clearCompleted(completedTasks: Task[]): Observable<Task>;

}
