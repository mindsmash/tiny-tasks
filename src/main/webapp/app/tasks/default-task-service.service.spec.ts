import {TestBed} from '@angular/core/testing';

import {DefaultTaskServiceService} from './default-task-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BASE_URL} from 'app/app.tokens';

describe('DefaultTaskServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {provide: BASE_URL, useValue: 'http://backend.tld'},
      DefaultTaskServiceService
    ]
  }));

  it('should be created', () => {
    const service: DefaultTaskServiceService = TestBed.get(DefaultTaskServiceService);
    expect(service).toBeTruthy();
  });
});
