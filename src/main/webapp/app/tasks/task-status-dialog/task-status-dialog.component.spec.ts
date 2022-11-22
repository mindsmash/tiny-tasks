import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TaskStatusDialogComponent } from './task-status-dialog.component';
import { Status } from '../status';


describe('TaskStatusDialogComponent', () => {
  let component: TaskStatusDialogComponent;
  let fixture: ComponentFixture<TaskStatusDialogComponent>;
  let matDialogRefMock: jasmine.SpyObj<MatDialogRef<TaskStatusDialogComponent>>;

  beforeEach(async () => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [TaskStatusDialogComponent],
      providers: [{provide: MatDialogRef, useValue: matDialogRefMock}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef close on choose method', () => {
    component.selectedStatus = Status.OPEN;
    component.choose();
    expect(matDialogRefMock.close).toHaveBeenCalledWith(Status.OPEN);
  })
});
