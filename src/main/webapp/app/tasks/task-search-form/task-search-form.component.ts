import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'tiny-task-search-form',
  templateUrl: './task-search-form.component.html'
})
export class TaskSearchFormComponent implements OnInit {

  searchInput = new FormControl('');

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit() {
    this.searchInput.valueChanges.subscribe(searchTerm => this.taskService.sendSearchTerm(searchTerm));
  }

}
