import { Component } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Alert } from 'selenium-webdriver';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<PeriodicElement> = ELEMENT_DATA;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(name: string,position: number,weight: number, symbol: Date ): void {
    var ntask : PeriodicElement = 
    {active:true,position: position, name: name, weight:weight};
    this.tasks.push(ntask);
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.tasks.splice(index, 1);
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
  }
  
}
export interface PeriodicElement {
  active: boolean
  name: string;
  position: number;
  weight: number;

  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {active:true,position: 1, name: 'Hydrogen', weight: 1.0079 },
  {active:true,position: 2, name: 'Helium', weight: 4.0026 },
  {active:true,position: 3, name: 'Lithium', weight: 6.941},
  {active:true,position: 4, name: 'Beryllium', weight: 9.0122}
  
];