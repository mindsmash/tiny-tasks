/**
 * A tiny task.
 */

export interface ICreateTask {
  name: string;
  date?: string;
}

export interface Task extends ICreateTask {
  id: string;
}
