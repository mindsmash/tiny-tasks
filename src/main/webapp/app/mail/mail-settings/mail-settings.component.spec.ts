import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MailSettingsComponent} from './mail-settings.component';
import {NotificationService} from '../service/notification.service';
import {NotificationSetting} from '../model/notification-setting';

describe('MailSettingsComponent', () => {
  let component: MailSettingsComponent;
  let fixture: ComponentFixture<MailSettingsComponent>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let modalService: jasmine.SpyObj<NgbModal>;

  beforeEach(waitForAsync(() => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['getNotificationSetting', 'updateNotificationSetting']);
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    TestBed.configureTestingModule({
      declarations: [MailSettingsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: 'NotificationService', useValue: notificationServiceSpy},
        {provide: NgbModal, useValue: modalServiceSpy}
      ]
    })
      .compileComponents();

    notificationService = TestBed.get('NotificationService') as jasmine.SpyObj<NotificationService>;
    modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with notification settings', () => {
    const mockSetting: NotificationSetting = {
      email: 'test@gmail.com',
      duration: 'EVERY_24H',
      active: true,
      onlyDueDate: false,
      dayBeforeDueDate: 2
    };

    notificationService.getNotificationSetting.and.returnValue(of(mockSetting));

    component.getNotificationSetting();

    expect(component.notificationSetting).toEqual(mockSetting);
    expect(component.emailForm.value).toEqual({
      email: 'test@gmail.com',
      duration: 'Every 24 Hours',
      notificationsEnabled: true,
      dueDateEnabled: false,
      dueDateDays: 2
    });
  });

  it('should open modal and populate form', () => {
    const mockSetting: NotificationSetting = {
      email: 'test@gmail.com',
      duration: 'EVERY_24H',
      active: true,
      onlyDueDate: false,
      dayBeforeDueDate: 2
    };

    notificationService.getNotificationSetting.and.returnValue(of(mockSetting));

    const content = {}; // Mock content
    component.openEmailSettingsPopUp({content});

    expect(modalService.open).toHaveBeenCalledWith(content, {size: 'xl', backdrop: 'static', centered: true});
    expect(component.notificationSetting).toEqual(mockSetting);
  });

  it('should update notification settings and close modal when form is valid', () => {
    // given
    const mockFormValue = {
      email: 'test@gmail.com',
      duration: 'Every 24 Hours',
      notificationsEnabled: true,
      dueDateEnabled: false,
      dueDateDays: 2
    };
    component.emailForm.setValue(mockFormValue);

    notificationService.updateNotificationSetting.and.returnValue(of(void 0));

    // when
    component.onSubmit();

    // then
    const expectedSetting: NotificationSetting = {
      email: 'test@gmail.com',
      duration: 'EVERY_24H',
      active: true,
      onlyDueDate: false,
      dayBeforeDueDate: 2
    };
    expect(notificationService.updateNotificationSetting).toHaveBeenCalledWith(
      jasmine.objectContaining({
        email: expectedSetting.email,
        duration: expectedSetting.duration,
        active: expectedSetting.active,
        onlyDueDate: expectedSetting.onlyDueDate,
        dayBeforeDueDate: expectedSetting.dayBeforeDueDate
      }));
    expect(modalService.dismissAll).toHaveBeenCalled();
  });

  it('should show alert when form is not valid', () => {
    // given
    const mockFormValue = {
      email: 'test@gmail.com',
      duration: 'EVERY_24H',
      notificationsEnabled: true,
      dueDateEnabled: false,
      dueDateDays: -1
    };
    component.emailForm.setValue(mockFormValue);

    spyOn(window, 'alert');

    // when
    component.onSubmit();

    // then
    expect(window.alert).toHaveBeenCalledWith('Please fill out the form correctly.');
  });

  it('should reset dueDateDays when dueDateEnabled is false', () => {
    component.ngAfterViewInit();

    component.emailForm.get('dueDateEnabled')?.setValue(false);

    expect(component.emailForm.get('dueDateDays')?.value).toBe(1);
  });
});
