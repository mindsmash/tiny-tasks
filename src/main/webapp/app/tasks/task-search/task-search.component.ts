import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'tiny-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent implements OnInit {

  @Output() searchEvent=new EventEmitter();
  taskForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });
  constructor() { }

  ngOnInit() {
  }

  searchTask(query){
    this.searchEvent.emit(query);
  }

  clear(){
    this.taskForm.reset();
    this.searchEvent.emit(null);
  }
}
