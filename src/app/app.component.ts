import { Component, Injectable } from '@angular/core';
import { TaskService } from './service/task.service';
import { Task } from './model/task.model';


@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private taskService : TaskService
  ){}
  filteredList: Array<Task>;
  priority: number;
  order: boolean = false;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(task: string): void {
    //dont allow empty
    if(task.length !== 0){
      //dont allow duplicates
      let duplicate = this.taskService.getAll().filter(
        item => item.value.toLowerCase().indexOf(task.toLowerCase()) > -1
      );
      if(!(duplicate.length > 0)){
        this.taskService.addTask(task, this.priority);
      }
    }
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param task the index of the task to be removed
   */
  remove(task: Task): void {
    this.taskService.removeTask(task);
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.taskService.clearTasks();
  }

  /**
   * Completes a task
   */
  complete(task: Task):void{
    this.taskService.setCompleted(task);
  }

  /**
   * Edits a task
   */
  activateEdit(task: Task):void{
    task.editing = true;
  }

  /**
   * Complete editing
   */
  stopEditing(task: Task, editedValue: string){
    task.value = editedValue;
    task.editing = false;
  }

  /**
   * Cancel editing
   */
  cancelEditing(task: Task){
    task.editing = false;
  }

  /**
   * Update task
   */
  updateTask(task: Task, newValue: string){
    newValue = newValue.trim();
    task.editing = false;

    if(newValue.length === 0){
      return this.taskService.removeTask(task);
    }
    this.taskService.update(task, newValue);
  }

  /**
   * Sort by priority
   */
  sortByPriority(){
    this.taskService.sort(this.order);
    this.order = !this.order;
  }

  /**
   * On filter performed
   */
  onFiltered(filteredList: Array<Task>){
    if(filteredList){
      this.taskService.tasks = filteredList;
      this.filteredList = filteredList;
    } else {
      this.taskService.tasks = this.taskService.getAll();
      this.filteredList = new Array<Task>();
    }
  }
  /**
   * On priority set
   */
  onPrioritySet(priorityChanged: number){
    this.priority = priorityChanged;
  }
}