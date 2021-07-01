export enum TaskStatus {
  Active,
  Done
}
/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}
