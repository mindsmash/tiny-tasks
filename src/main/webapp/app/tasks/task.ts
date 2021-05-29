/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
}

/**
 * task list model.
 */
export interface TaskList {
  id: string;
  name: string;
  data: Task[];
}
