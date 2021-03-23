import { Task } from "./task";

export function sortTasksByStatus(tasks: Task[]) {
  return tasks.sort((task1, task2) => {
    return task1.done === task2.done ? 0 : task1.done ? 1 : -1;
  });
}
