import {TestBed} from '@angular/core/testing';

import {DefaultTaskService} from './default-task.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BASE_URL} from 'app/app.tokens';

describe('DefaultTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {provide: BASE_URL, useValue: 'http://backend.tld'},
      DefaultTaskService
    ]
  }));

  it('should be created', () => {
    const service: DefaultTaskService = TestBed.get(DefaultTaskService);
    expect(service).toBeTruthy();
  });
});
