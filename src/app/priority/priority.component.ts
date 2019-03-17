import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Priority } from '../model/priority.model';

@Component({
  selector: 'tiny-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {
  selectedOption: number;

  @Input()
  priority: number;
  @Output()
  priorityChanged = new EventEmitter<number>();

  public priorities: Array<Priority>;

  constructor(private taskService: TaskService) { 
    this.priorities = [{
      description: 'High',
      priority: 100
    },{
      description: 'Medium',
      priority: 50
    },{
      description: 'Low',
      priority: 0
    }];
  }

  ngOnInit() {
  }

  select(event: any){
    this.priorityChanged.emit(event.target.value);
  }
}
