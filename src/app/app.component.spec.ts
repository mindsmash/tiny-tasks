import { TestBed, async } from '@angular/core/testing';
import { MatButtonModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        AngularDateTimePickerModule,
        MatCardModule
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
