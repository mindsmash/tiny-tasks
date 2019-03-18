import { Component, OnInit, Input } from '@angular/core';
import { TaskStatusEnum } from "src/app/enums/taskStatusEnum";

@Component({
  selector: 'status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.scss']
})
export class StatusLabelComponent implements OnInit {

  @Input() status: TaskStatusEnum;
  @Input() count = undefined;
  statusColor: string;
  constructor() {
  }

  ngOnInit() {
    this.statusColor = StatusLabelComponent.getColor(this.status);
  }

  public static getColor(status: TaskStatusEnum) {
    switch (status) {
      case TaskStatusEnum.PROCESS.valueOf(): return 'yellow'; break;
      case TaskStatusEnum.DONE.valueOf(): return 'green'; break;
      case TaskStatusEnum.FAIL.valueOf(): return 'red'; break;
    }
  }

}
