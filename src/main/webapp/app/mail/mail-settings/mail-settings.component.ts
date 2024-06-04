import {Component, Inject, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../service/notification.service";
import {NotificationSetting} from "../model/notification-setting";
import {distinctUntilChanged} from "rxjs";
import {Duration} from "../enum/duration";

@Component({
  selector: 'tiny-mail-settings',
  templateUrl: './mail-settings.component.html',
  styleUrl: './mail-settings.component.scss',
})
export class MailSettingsComponent {

  notificationSetting: NotificationSetting = new NotificationSetting();
  durationEnum = Duration;
  durations: string[] = [];
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    duration: new FormControl('', Validators.required),
    notificationsEnabled: new FormControl(false),
    dueDateEnabled: new FormControl(false),
    dueDateDays: new FormControl(1)
  });

  constructor(private modalService: NgbModal, @Inject('NotificationService') private notificationService: NotificationService) {
    this.durations = Object.values(this.durationEnum);
  }

  getNotificationSetting() {
    this.notificationService.getNotificationSetting().subscribe(res => {
      this.notificationSetting = res
      this.populateForm();
    });
  }

  populateForm() {
    if (this.notificationSetting) {
      this.emailForm.patchValue({
        email: this.notificationSetting.email,
        duration: Duration[this.notificationSetting.duration as keyof typeof Duration],
        notificationsEnabled: this.notificationSetting.active,
        dueDateEnabled: this.notificationSetting.onlyDueDate,
        dueDateDays: this.notificationSetting.dayBeforeDueDate
      });
    }
  }

  openEmailSettingsPopUp({content}: { content: any }) {
    this.getNotificationSetting();
    this.modalService.open(content, {size: 'xl', backdrop: 'static', centered: true});
  }

  onSubmit(): void {
    if (this.emailForm.valid && this.emailForm.value.duration !== undefined &&
      (this.emailForm.value.dueDateDays === undefined || this.emailForm.value.dueDateDays === null || this.emailForm.value.dueDateDays > 0)) {
      this.notificationSetting.email = this.emailForm.value.email!;
      this.notificationSetting.duration = Object.keys(Duration)[Object.values(Duration).indexOf(this.emailForm.value.duration as unknown as Duration)];
      this.notificationSetting.active = this.emailForm.value.notificationsEnabled!;
      this.notificationSetting.onlyDueDate = this.emailForm.value.dueDateEnabled!;
      this.notificationSetting.dayBeforeDueDate = this.emailForm.value.dueDateDays!;
      this.notificationService.updateNotificationSetting(this.notificationSetting).subscribe();
      this.modalService.dismissAll();
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  ngAfterViewInit() {
    this.emailForm.get('dueDateEnabled')?.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((enabled: boolean | null) => {
        if (enabled === false) {
          this.emailForm.get('dueDateDays')?.setValue(1);
        }
      });
  }
}
