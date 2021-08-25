/**
 * A tiny task.
 */

 export enum TaskStatus {
  New = 'New',
  InProgress= 'InProgress',
  Blocked = 'Blocked',
  Done = 'Done'
}
export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}
