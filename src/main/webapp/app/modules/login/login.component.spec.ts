import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BASE_URL } from 'app/app.tokens';
import { AuthService } from 'app/services';
import { of } from 'rxjs';

import { FormField, LoginComponent, Source } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    authService = jasmine.createSpyObj('authService', [
      'hasValidToken',
      'getToken',
      'getTokenValue',
      'tokenExists',
      'isTokenExpired',
      'login',
      'logout',
    ]);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(<Routes>[]),
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: BASE_URL, useValue: 'http://backend.tld'
        },
        {
          provide: 'AuthService',
          useValue: {},
        },
      ]
    }).overrideTemplate(LoginComponent, '')
      .overrideProvider(AuthService, {useValue: authService})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login function on authService', () => {
    const expectedValue = {[FormField.UserName]: 'john', [FormField.UserPassword]: '12345'};
    authService.login.and.returnValue(of());
    component.loginForm.setValue(expectedValue);

    component.source = Source.Register;

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(expectedValue, 'http://backend.tld/users');
  });

  it('should throw error for username field', () => {
    const value = component.hasError(FormField.UserName);

    expect(value).toBe(true);
  });

  it('should not throw error for username field', () => {
    component.loginForm.setValue({[FormField.UserName]: 'john', [FormField.UserPassword]: '12345'});
    const value = component.hasError(FormField.UserName);
    expect(value).toBe(false);
  });

  it('should return error message', () => {
    const expectedValue = 'You must enter a value';
    const value = component.getErrorMessage(FormField.UserName);
    expect(value).toEqual(expectedValue);
  });
});
