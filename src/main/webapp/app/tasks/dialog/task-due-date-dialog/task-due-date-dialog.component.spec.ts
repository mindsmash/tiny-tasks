import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDueDateDialogComponent } from './task-due-date-dialog.component';

describe('TaskDueDateDialogComponent', () => {
  let component: TaskDueDateDialogComponent;
  let fixture: ComponentFixture<TaskDueDateDialogComponent>;
 
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ TaskDueDateDialogComponent],
      imports: [ MatDialogModule],
providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(TaskDueDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
