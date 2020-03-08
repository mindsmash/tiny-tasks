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
   * changes status of the task with the given ID and status from the list of tasks.
   *
   * @param id the ID of the task to be changed
   * @param checked the status of the task to be changed
   * @returns an empty `Observable`
   */
  update(id:string, checked:boolean):Observable<void>;

   /**
   * deletes all task with the status of false.
   *
   * @param id the ID of the task to be changed
   * @param checked the status of the task to be changed
   * @returns an empty `Observable`
   */
  deleteDone():Observable<void>;
}
