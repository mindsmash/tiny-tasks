/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  taskStatus?: TaskStatus;
}


export enum TaskStatus {
  'IN_PROGRESS', 'BLOCKED', 'DONE'
}
