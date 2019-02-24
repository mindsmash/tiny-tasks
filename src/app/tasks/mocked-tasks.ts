export interface Task {
  description: string;
  status: string;
}

export const TASKS: Task[] = [
  { description: 'To do code review', status: 'TODO' },
  { description: 'To do something', status: 'TODO' },
  { description: 'To make task', status: 'TODO' },
  { description: 'To learn Angular', status: 'TODO' },
  { description: 'To learn Flutter', status: 'TODO' },
  { description: 'To work in Coyo', status: 'TODO' },
];
