import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Status } from '../../shared/status';

import { StatusDialogComponent } from './status-dialog.component';

describe('StatusDialogComponent', () => {
  let component: StatusDialogComponent;
  let fixture: ComponentFixture<StatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusDialogComponent],
      imports: [MatDialogModule, MatRadioModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: (result?: any) => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: '0', name: 'Task', status: Status.NEW },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title correctly', () => {
    const dialogContentTitle =
      fixture.nativeElement.querySelector('.mat-dialog-title');
    expect(dialogContentTitle.innerText).toEqual('Change status for task Task');
  });

  it('should have the initial status selected', () => {
    const newStatusRadioButton =
      fixture.nativeElement.querySelectorAll('.mat-radio-button')[0];

    expect(newStatusRadioButton).toHaveClass('mat-radio-checked');
  });

  it('should change status when clicking on an unselected option', () => {
    const doneStatusRadioButton =
      fixture.nativeElement.querySelectorAll('.mat-radio-button')[3];

    component.changeStatus(
      new MatRadioChange(doneStatusRadioButton, Status.DONE)
    );

    expect(component.data.status).toEqual(Status.DONE);
  });
});
