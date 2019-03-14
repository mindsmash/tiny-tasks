import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTaskComponent } from './dialog-add-task.component';
import { MatFormFieldModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from '../add-task/add-task.component';

describe('DialogAddTaskComponent', () => {
  let component: DialogAddTaskComponent;
  let fixture: ComponentFixture<DialogAddTaskComponent>;

  let fixtureAddTaskComponent: ComponentFixture<AddTaskComponent>;
  let addTaskComponent: AddTaskComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddTaskComponent],
      imports: [MatFormFieldModule, FormsModule, MatDialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTaskComponent);
    component = fixture.componentInstance;

    fixtureAddTaskComponent = TestBed.createComponent(AddTaskComponent);
    addTaskComponent = fixtureAddTaskComponent.componentInstance;

    fixtureAddTaskComponent.detectChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    addTaskComponent.openDialog();
    expect(component).toBeTruthy();
  });
});
