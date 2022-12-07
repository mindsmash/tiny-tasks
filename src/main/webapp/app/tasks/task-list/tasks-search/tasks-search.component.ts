import {ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TaskService} from "../../task.service";

@Component({
  selector: 'tiny-tasks-search',
  templateUrl: './tasks-search.component.html',
  styleUrls: ['./tasks-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksSearchComponent implements OnInit {

  @Output() searched: EventEmitter<string> = new EventEmitter();

  searchForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  ngOnInit(): void {
  }

  resetSearch() {
    this.searched.emit('');
    this.searchForm.reset();
  }

  onSearchSubmit(): void {
    this.searched.emit(this.searchForm.value.name);
  }

}
