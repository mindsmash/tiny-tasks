import { Observable } from 'rxjs'

import { Task } from 'app/tasks/task'

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface TaskService {
  /**
   * Returns the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getAll(): Observable<Task[]>

  /**
   * Adds a new task to the list of tasks.
   *
   * @param name the task's name
   * @returns an `Observable` holding the created task
   */
  create(name: string): Observable<Task>

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>

  /**
   * Mark the task as done.
   *
   * @param id the ID of which is done
   * @returns an empty `Observable`
   */
  setIsDone(status: string): Observable<void>

  /**
   * Delete the done tasks.
   *
   * @param id the ID of which is done
   * @returns an empty `Observable`
   */
  deleteDoneTasks(id: string): Observable<void>
}

/*    /**
   * Mark the task with the given ID as done.
   *
   * @param task  which is done
   * @returns an empty `Observable`
   
setIsDone(task: Task): Observable<Task>;

*/
