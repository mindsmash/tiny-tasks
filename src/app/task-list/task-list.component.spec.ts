import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import {Task} from "../task";
import {TaskListItemComponent} from "../task-list-item/task-list-item.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListComponent, TaskListItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    // component.tasks = [
    //   new Task({ id: 1, text: 'Test', complete: false })
    // ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove', () => {
    expect(component.tasks.length > 0);
    component.onRemoveTask(new Task({ id: 1, text: 'Test', complete: false }));
    expect(component.tasks.length == 0)
  });
});
