import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from '../app.tokens';
import { UserService } from './user.service';

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BASE_URL,
          useValue: 'http://backend.tld',
        },
        UserService,
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  afterAll(() => httpTestingController.verify());

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should login user', () => {
    // when
    userService.login('test@mail.com', 'testPass').subscribe();

    // then
    const req = httpTestingController.expectOne(
      (request) => request.url === 'http://backend.tld/users/login'
    );
    
    expect(req.request.method).toEqual('POST');
    // finally
    req.flush({});
  });
});
