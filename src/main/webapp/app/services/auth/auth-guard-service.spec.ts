import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { BASE_URL } from "app/app.tokens";
import { AuthGuardService } from "./auth-guard.service";
import { AuthService } from "./auth.service";

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('authService', ['hasValidToken'], ['onUserLogout']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BASE_URL, useValue: 'http://backend.tld'
        },
        {
          provide: 'AuthService',
          useValue: {},
        },
        AuthGuardService,
        HttpClient,
      ]
    })
    .overrideProvider(AuthService, {useValue: authService});

    authGuardService = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('canActivate should call authService.hasValidToken', () => {
    authService.hasValidToken.and.returnValue(false);

    authGuardService.canActivate();

    expect(authService.hasValidToken).toHaveBeenCalled();
  });

});
