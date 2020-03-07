import {Task} from '../models/task';

export interface User {
  userId: string;
  userName: string;
  password: string;
  tasks: Task[];
}