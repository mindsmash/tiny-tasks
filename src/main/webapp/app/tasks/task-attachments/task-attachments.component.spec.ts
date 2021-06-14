import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAttachmentsComponent } from './task-attachments.component';

describe('TaskAttachmentsComponent', () => {
  let component: TaskAttachmentsComponent;
  let fixture: ComponentFixture<TaskAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAttachmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
