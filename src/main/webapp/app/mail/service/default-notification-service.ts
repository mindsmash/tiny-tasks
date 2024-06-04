import {Inject, Injectable} from "@angular/core";
import {NotificationService} from "./notification.service";
import {Observable} from "rxjs";
import {NotificationSetting} from "../model/notification-setting";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../app.tokens";

@Injectable()
export class DefaultNotificationService implements NotificationService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }
  getNotificationSetting(): Observable<NotificationSetting> {
    return this.http.get<NotificationSetting>(this.baseUrl + '/notification');
  }

  updateNotificationSetting(notificationSetting: NotificationSetting): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/notification', notificationSetting)
  }

}
