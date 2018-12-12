import { TaskState } from './task-state.enum'
export class Task {
    description: string = "Empty";
    state: TaskState = TaskState.TODO;
    dueDate: Date = new Date();
    constructor(description: string, state: TaskState, dueDate: Date) {
        this.description = description;
        this.state = state;
        this.dueDate = dueDate;
    }
}
