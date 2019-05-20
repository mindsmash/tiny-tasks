/**
 * A tiny task.
 */
import { Category } from './category';
export interface Task {
  id: string;
  name: string;
  category: Category;
}
