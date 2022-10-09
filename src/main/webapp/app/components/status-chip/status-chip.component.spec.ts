import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Status } from '../../shared/status';

import { StatusChipComponent } from './status-chip.component';

describe('StatusChipComponent', () => {
  let component: StatusChipComponent;
  let fixture: ComponentFixture<StatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusChipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the chip text and class correctly depending on status input', () => {
    component.status = Status.NEW;
    component.ngOnInit();

    expect(component.chipClass).toEqual('new-chip');
    expect(component.chipText).toEqual('New');
  });

  it('should emit an openUpdateStatusDialog event when clicking the chip', () => {
    spyOn(component.openUpdateStatusDialog, 'emit');
    const chip = fixture.nativeElement.querySelector('.status-chip');
    chip.click();

    expect(component.openUpdateStatusDialog.emit).toHaveBeenCalled();
  });
});
