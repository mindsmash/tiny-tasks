import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from 'app/app.tokens';
import { StorageService } from '../storage/storage.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUaW55VGFza1Rva2VuIiwiZXhwIjoxNjE0NzA5NDMxLCJ1dWlkIjoiYzIwOTk2MmQtYTJjNi00NTk0LWFmZTItM2UxYTQ3Y2I2MjU4IiwidXNlcm5hbWUiOiJib3JpcyJ9.RAzkp46MBzfulqpYobxzc8BcSdjAyobP1EWtmDn54rZYcMsbQvYzBGYWwdSdkfrBR4dUEeDQjmHfItxVkxJ8hw';
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    storageService = jasmine.createSpyObj('storageService', ['exists', 'save', 'remove', 'get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BASE_URL, useValue: 'http://backend.tld'
        },
        {
          provide: 'StorageService',
          useValue: {},
        },
        AuthService,
        HttpClient,
      ]
    })
    .overrideProvider(StorageService, {useValue: storageService});

    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterAll(() => httpTestingController.verify());

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should call login', () => {
    const expectedBody = {
      username: 'usr', userpw: '1234'
    };

    // when
    authService.login(expectedBody, 'http://backend.tld/users/login').subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/users/login');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(expectedBody);
    expect(req.request.responseType).toEqual('json');

    // finally
    req.flush({});
  });

  it('should remove auth token from localStorage on logout', () => {
    authService.logout();
    expect(storageService.remove).toHaveBeenCalledWith('auth');
  });

  it('should get token', () => {
    const expectedValue = '12345';
    storageService.get.and.returnValue(expectedValue);
    const value = authService.getToken();

    expect(value).toEqual(expectedValue);
    expect(storageService.get).toHaveBeenCalledWith('auth');
  });

  it('should get uuid value from token', () => {
    const expectedValue = 'c209962d-a2c6-4594-afe2-3e1a47cb6258';
    authService.tokenExists = () => (true);
    authService.setToken(token);

    const value = authService.getTokenValue('uuid');
    expect(value).toEqual(expectedValue);
  });

  it('should check if token exists', () => {
    const value = authService.tokenExists();

    expect(storageService.get).toHaveBeenCalledWith('auth');
    expect(value).toBe(false);
  });

  it('should check if token is epxired', () => {
    const expectedValue = true;
    authService.tokenExists = () => (true);
    authService.setToken(token);

    const value = authService.isTokenExpired();
    expect(value).toEqual(expectedValue);
  });

  it('should set token', () => {
    storageService.get.and.returnValue('123456');
    authService.setToken(token);
    const exists = authService.tokenExists();

    expect(exists).toEqual(true);
    expect(storageService.save).toHaveBeenCalledWith('auth', token);
  });

});
