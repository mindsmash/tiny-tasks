import { CategoryEnum } from '../enums/category.enum';
import { TaskStatusEnum } from '../enums/task.status.enum';

export class Task {
  id: String = '';
  name: String = '';
  dueDate: Date = new Date();
  category: CategoryEnum = CategoryEnum.UNKNOWN;
  status: TaskStatusEnum = TaskStatusEnum.PROCESS;
  description: String = '';

  constructor(id: String, name: String, dueDate: Date, category: CategoryEnum, status: TaskStatusEnum, description: String) {
    this.id = id;
    this.name = name;
    this.dueDate = dueDate;
    this.category = category;
    this.status = status;
    this.description = description;
  }

  clearFields() {
    this.id = '';
    this.name = '';
    this.dueDate = new Date();
    this.category = CategoryEnum.UNKNOWN;
    this.status = TaskStatusEnum.PROCESS;
    this.description = '';
  }
}
