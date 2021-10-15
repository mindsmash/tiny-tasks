/**
 * A tiny task.
 */
export type TaskStatus = 'ReadyForDev' | 'InProgress' | 'Suspended' | 'DevDone';
export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}
