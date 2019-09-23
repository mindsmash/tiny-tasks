import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { Task } from '../task';

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent implements OnInit, OnChanges {

  @Input() tasks: Task[];
  @Output() filtered: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  _taskFilter: string;
  filteredTasks: Task[];

  constructor() {
    this._taskFilter = '';
    this.filteredTasks = this.tasks;
   }

  ngOnInit() {
    this._taskFilter = '';
  }

  ngOnChanges(changes: SimpleChanges){
    this._taskFilter = '';
  }

  get taskFilter(): string {
    return this._taskFilter;
  }

  set taskFilter(value: string) {
    this._taskFilter = value;
    this.filteredTasks = this.taskFilter ? this.handleFilter(this.taskFilter) : this.tasks;
    this.filtered.emit(this.filteredTasks);
  }

  handleFilter(filterBy: string): Task[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.filteredTasks = this.tasks.filter( (task: Task) => task.name.toLocaleLowerCase().indexOf(this.taskFilter) !== -1);
  }

}
