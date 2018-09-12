import { Component } from '@angular/core';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<string> = [];

  add(task: string) {
    this.tasks.push(task);
  }

  remove(index: number) {
    this.tasks.splice(index, 1);
  }

  clear() {
    this.tasks.splice(0);
  }
}
