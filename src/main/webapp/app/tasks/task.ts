/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  due_date?: Date;
  isDone?: boolean;
  status?: TaskStatus;
}

export enum TaskStatus {
  New = 'New',
  Active = 'Active',
  Done = 'Done',
  Blocked = 'Blocked'
}
