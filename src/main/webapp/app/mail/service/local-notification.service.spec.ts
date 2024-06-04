import { TestBed } from '@angular/core/testing';

import { LocalNotificationService } from './local-notification.service';

describe('LocalNotificationService', () => {
  let service: LocalNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
