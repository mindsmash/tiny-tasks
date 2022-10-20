import { TaskState } from "src/main/webapp/app/enum/task-state.enum";

export interface Task {
  id: string;
  name: string;
  state?: TaskState;
}
