export class Task {
  completed: Boolean;
  editing: Boolean;
  value: string;
  priority: number;

  constructor(value: string, priority: number) {
    this.completed = false;
    this.editing = false;
    this.value = value.trim();
    this.priority = priority;
  }
}
