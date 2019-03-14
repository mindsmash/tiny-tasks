import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBarComponent } from './app-bar.component';
import { MatToolbarModule, MatIconModule, MatMenuModule } from '@angular/material';

describe('AppBarComponent', () => {
  let component: AppBarComponent;
  let fixture: ComponentFixture<AppBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppBarComponent],
      imports: [MatToolbarModule, MatIconModule, MatMenuModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
