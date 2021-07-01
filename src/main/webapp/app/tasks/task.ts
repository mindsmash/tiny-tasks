/**
 * Task lifecycle statuses
 */
export enum TaskStatus {
  Todo,
  Blocked,
  InProgress,
  Done,
  Cancelled
}

/**
 * Task statuses which are considered as completed
 */
export const FINISHED_TASK_STATUSES = [TaskStatus.Done, TaskStatus.Cancelled];
/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}
