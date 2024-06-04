import {Observable} from "rxjs";
import {NotificationSetting} from "../model/notification-setting";

export interface NotificationService {
  getNotificationSetting(): Observable<NotificationSetting>;
  updateNotificationSetting(notificationSetting: NotificationSetting): Observable<void>;
}
