import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BASE_URL } from '../app.tokens';
import { LoginComponent } from './login.component';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LoginComponent, RouterTestingModule],
      providers: [
        {
          provide: BASE_URL,
          useValue: 'http://backend.tld',
        },
        {
          provider: 'UserService',
          useValue: userService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login when submit', () => {
    // given
    const userAuth = {
      id: 1,
      email: 'test@mail.com',
      jwtToken: 'token',
    };
    const userAuth$ = of(userAuth);
    userService.login.and.returnValue(userAuth$);

    // when
    component.onSubmit();
    // then
    expect(userService.login).toHaveBeenCalled();
  });
});
