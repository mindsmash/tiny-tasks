import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusFormComponent } from 'app/tasks/status-form/status-form.component';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let statusFormComponent: StatusFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },
      { provide: MAT_DIALOG_DATA, useValue: { component: statusFormComponent } }
    ],
      imports: [
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
