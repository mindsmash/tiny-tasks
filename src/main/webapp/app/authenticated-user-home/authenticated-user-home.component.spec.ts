import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedUserHomeComponent } from './authenticated-user-home.component';

describe('AuthenticatedUserHomeComponent', () => {
  let component: AuthenticatedUserHomeComponent;
  let fixture: ComponentFixture<AuthenticatedUserHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedUserHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
