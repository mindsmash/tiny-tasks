import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../model/task.model';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'tiny-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchActive: boolean;
  tasks: Array<Task>;

  @Input()
  query: string;
  @Output()
  filteredList = new EventEmitter<Array<Task>>();
  

  constructor(
    private taskService : TaskService
  ) { 
    this.searchActive = false;
  }

  ngOnInit() {
  }

  /**
   * Complete search on given query
   */
  search(): void{
    this.tasks = this.taskService.getAll();
    if(!this.searchActive){
      if(this.query.length > 0){
        this.filteredList.emit(this.tasks.filter(
          item => item.value.toLowerCase().indexOf(this.query.toLowerCase()) > -1
        ));
      }
      this.searchActive = true;
    } else {
      this.filteredList.emit(undefined);
      this.searchActive = false;
    } 
  }
}
